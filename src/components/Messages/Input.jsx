import React, { useEffect, useState } from "react";
import Attach from "./img/attach.png";
import {
  arrayUnion,
  doc,
  getDoc, updateDoc
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useAuthStore from "../../store/authStore";
import useChatStore from "../../store/chatStore";
import { Button, Textarea } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import { maxFileSizeInBytes } from "../../assets/constants";

const Input = ({ MessageCss }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useAuthStore((state) => state.user);
  const data = useChatStore((state) => state);
  const showToast = useShowToast();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    } else {
      setPreviewURL("");
    }

    // Clean up URL.createObjectURL
    return () => URL.revokeObjectURL(previewURL);
  }, [file]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!text.trim() && !file) return;
    setIsLoading(true); // Set loading state
    try {
      let messageText = text;
      let fileType = "";
      setText("");
      if (file) {
        fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : '';
        const storageRef = ref(storage, `ChatsMedia/${uuid()}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            // Handle Error
            console.error("Upload error: ", error);
            setIsLoading(false); // Reset loading state on error
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(firestore, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: messageText,
                  type: fileType,
                  senderId: currentUser.uid,
                  date: Date.now(),
                  img: downloadURL,
                  read: false, // Unread message
                }),
              });
            });
            setIsLoading(false); // Reset loading state after successful update
          }
        );
      } else {
        await updateDoc(doc(firestore, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: messageText,
            senderId: currentUser.uid,
            date: Date.now(),
            read: false, // Unread message
          }),
        });
        setIsLoading(false); // Reset loading state after successful update
      }

      await updateDoc(doc(firestore, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text: messageText,
          type: fileType,
          read: true,
        },
        [data.chatId + ".date"]: Date.now(),
      });

      await updateDoc(doc(firestore, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text: messageText,
          type: fileType,
          read: false, // Unread for the other user
        },
        [data.chatId + ".date"]: Date.now(),
      });

      // Update unread count for the recipient
      const recipientId = data.user.uid;
      const recipientChatRef = doc(firestore, "userChats", recipientId);

      const recipientChatDoc = await getDoc(recipientChatRef);
      if (recipientChatDoc.exists()) {
        const chatData = recipientChatDoc.data();
        const chatInfo = chatData[data.chatId] || {};
        if (!chatInfo?.lastMessage?.read) {
          const newUnreadCount = (chatInfo.unreadCount || 0) + 1;
          await updateDoc(recipientChatRef, {
            [`${data.chatId}.unreadCount`]: newUnreadCount,
            [`${data.chatId}.lastMessage`]: {
              text: messageText,
              type: fileType,
              date: Date.now(),
              read: false,
            },
          });
        }
      }

      setFile(null);
      setIsLoading(false); // Reset loading state after successful update

    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false); // Reset loading state on error
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0].size > maxFileSizeInBytes) {
      showToast("Error", "File size must be less than 5MB", "error");
      setFile(null);
      return;
    } else if (e.target.files[0].type.startsWith("image/") || e.target.files[0].type.startsWith("video/")) {
      setFile(e.target.files[0]);
    } else {
      showToast("", "Please select an image or video file", "error");
      setFile(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };
  return (
    <div className={MessageCss.input}>
      <Textarea
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKey}
        sx={{ color: 'black', scrollbarWidth: 'none', p: '5px', '::placeholder': { color: 'lightgrey' }, border: '1px solid lightgrey', }}
        maxLength={400}
        rows={1}
        resize={'none'}
      />
      <div className={MessageCss.previewContainer}>
        {file && (
          <div className={MessageCss.previewWrapper}>
            {file.type.startsWith('image/') ? (
              <img src={previewURL} alt="preview" className={MessageCss.previewImage} />
            ) : (
              <video src={previewURL} className={MessageCss.previewVideoInput} />
            )}
            <button className={MessageCss.removeButton} onClick={handleRemoveFile}>X</button>
          </div>
        )}
      </div>
      <div className={MessageCss.send}>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleFileChange}
          disabled={isLoading} // Disable file input when loading
        />
        <label htmlFor="file" style={{ width: '25px' }}>
          <img src={Attach} alt="" />
        </label>
        <Button
          className={MessageCss.sendButton}
          onClick={handleSend}
          isLoading={isLoading} // Show loading spinner
          size="sm"
          borderRadius={4}
          p={1}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Input;

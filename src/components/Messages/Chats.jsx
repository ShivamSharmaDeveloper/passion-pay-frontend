import { deleteDoc, deleteField, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore, storage } from "../../firebase/firebase";
import useChatStore from "../../store/chatStore";
import useAuthStore from "../../store/authStore";
import { Avatar, Badge, Button, useDisclosure } from "@chakra-ui/react";
import { deleteObject, ref } from "firebase/storage";
import useShowToast from "../../hooks/useShowToast";
import DeletePostModal from "../Profile/DeletePostModal";
import { MdDelete } from "react-icons/md";

const Chats = ({ MessageCss }) => {
  const [chats, setChats] = useState([]);
  const deleteModal = useDisclosure(); // Hook for DeletePostModal
  const [isDeleting, setIsDeleting] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const currentUser = useAuthStore((state) => state.user);
  const { changeUser, setEmptyUser, user } = useChatStore(state => state);
  const showToast = useShowToast();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(firestore, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = async (u) => {
    changeUser(currentUser, u);
  };

  const deleteImageFromStorage = async (imageUrl) => {
    const storageRef = ref(storage, imageUrl);

    try {
      await deleteObject(storageRef);
      // console.log(`Deleted image: ${imageUrl}`);
    } catch (error) {
      console.error(`Failed to delete image: ${imageUrl}`, error);
    }
  };

  const handleOpenDialog = (chatId, chatUser) => {
    setChatId(chatId);
    setChatUser(chatUser);
    deleteModal.onOpen();
  }


  const handleDelete = async () => {
    deleteModal.onClose();
    setIsDeleting(true);
    const chatDocRef = doc(firestore, "chats", chatId);

    try {
      const chatDoc = await getDoc(chatDocRef);
      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        const messages = chatData.messages || [];

        const imageUrls = messages
          .filter((message) => message.img)
          .map((message) => message.img);

        for (const imageUrl of imageUrls) {
          await deleteImageFromStorage(imageUrl);
        }

        await deleteDoc(chatDocRef);

        await updateDoc(doc(firestore, "userChats", currentUser.uid), {
          [chatId]: deleteField(),
        });

        await updateDoc(doc(firestore, "userChats", chatUser.uid), {
          [chatId]: deleteField(),
        });
        setEmptyUser();
        setIsDeleting(false);
        setChatId(null);
        setChatUser(null);
        showToast("", "Chat deleted.", "success");
        // console.log(`Chat ${chatId} with ${chatUser.username} deleted.`);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className={MessageCss.chats}>
        {chats && Object.keys(chats).length !== 0 && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(([id, chat]) => (
          <div
            className={`${MessageCss.userChat} ${user?.uid === chat?.userInfo?.uid ? MessageCss.selected : ''}`}
            key={id}
            onClick={() => handleSelect(chat.userInfo)}
          >
            <div style={{ position: "relative" }}>
              <Avatar src={chat?.userInfo?.profilePicURL} name={chat?.userInfo?.username} sx={{ width: "40px", height: '40px' }} />
              {chat?.lastMessage && !chat?.lastMessage?.read && chat?.unreadCount !== 0 && (
                <Badge
                  variant="solid"
                  // colorScheme="red"
                  bg={'#e53e3ef5'}
                  borderRadius="full"
                  px={2}
                  position="absolute"
                  top="-5px"
                  right="-5px"
                >
                  {chat?.unreadCount > 99 ? '99+' : chat?.unreadCount || 0} {/* Display the unread count */}
                </Badge>
              )}
            </div>
            {/* <Avatar src={chat?.userInfo?.profilePicURL} name={chat?.userInfo?.username} sx={{ width: "40px", height: '40px' }} /> */}
            {/* <img src={chat.userInfo.profilePicURL} alt="" /> */}
            <div className={MessageCss.userChatInfo}>
              <div>
                <span>{chat?.userInfo?.username}</span>
                <p>{chat.lastMessage?.type === "image" ? "Sent you a image" : chat.lastMessage?.type === "video" ? "Sent you a video" : chat.lastMessage?.text}</p>
              </div>
              <Button
                size={"xs"}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the select function
                  handleOpenDialog(id, chat?.userInfo);
                }}  // Open DeletePostModal
                bg={"transparent"}
                _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                borderRadius={4}
                p={1}
                isLoading={isDeleting}
              >
                <MdDelete size={20} cursor='pointer' />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {deleteModal.isOpen && <DeletePostModal  // Render the delete modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onDelete={handleDelete}
        message={'Are you sure you want to delete this chat?'}
        title={'Delete Chat'}
      />
      }
    </>
  );
};

export default Chats;

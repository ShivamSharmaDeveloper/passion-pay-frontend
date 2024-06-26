// import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import Message from "./Message";
import useChatStore from "../../store/chatStore";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import useAuthStore from "../../store/authStore";

const Messages = ({ MessageCss }) => {
  const [messages, setMessages] = useState([]);
  const data = useChatStore((state) => state);
  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const unSub = onSnapshot(doc(firestore, "chats", data.chatId), async (docs) => {
      if (docs.exists()) {
        setMessages(docs.data().messages);
        // Update unread messages count
        const chatData = docs.data();
        const messages = chatData.messages || [];

        const updatedMessages = messages.map((message) => ({
          ...message,
          read: true,
        }));

        await updateDoc(docs.ref, { messages: updatedMessages });
      
        try {
          await updateDoc(doc(firestore, "userChats", currentUser.uid), {
            [`${data.chatId}.unreadCount`]: 0,
            [`${data.chatId}.lastMessage.read`]: true,
          });
          // console.log("Update successful");
        } catch (error) {
          console.error("Error updating document:", error);
        }

      } else {
        setMessages([]);
        data.setEmptyUser();
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);


  return (
    <div className={MessageCss.messages}>
      {messages.map((m) => (
        <Message message={m} key={m.id} MessageCss={MessageCss} />
      ))}
    </div>
  );
};

export default Messages;

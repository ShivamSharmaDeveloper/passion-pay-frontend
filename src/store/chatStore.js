import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { firestore } from "../firebase/firebase";

const useChatStore = create((set) => {

    return {
        chatId: "null",
        user: {},
        messageNotifications: [],
        addNotification: (notification) => set((state) => ({
            messageNotifications: state.messageNotifications ? notification : [...state.messageNotifications, notification],
        })),
        clearNotifications: async () => {
            set({ messageNotifications: [] }); // Clear the local state after marking notifications as read
        },
        setEmptyUser: () => set({ user: {}, chatId: "null" }),
        changeUser: async (currentUser, selectedUser) => {
            const combinedId =
                currentUser.uid > selectedUser.uid
                    ? currentUser.uid + selectedUser.uid
                    : selectedUser.uid + currentUser.uid;

            // Firestore reference
            const chatDocRef = doc(firestore, "chats", combinedId);
            const chatDoc = await getDoc(chatDocRef);

            // Set the state to the selected user and chatId
            set({
                currentUser,
                user: selectedUser,
                chatId: combinedId,
            });
            // Update unread messages count
            if (chatDoc.exists()) {
                const chatData = chatDoc.data();
                const messages = chatData.messages || [];

                const updatedMessages = messages.map((message) => ({
                    ...message,
                    read: true,
                }));

                await updateDoc(chatDocRef, { messages: updatedMessages });

                await updateDoc(doc(firestore, "userChats", currentUser.uid), {
                    [`${combinedId}.unreadCount`]: 0,
                    [`${combinedId}.lastMessage.read`]: true,
                });
            }
        },

    };
});

export const fetchMessageNotifications = (userId) => {

    onSnapshot(doc(firestore, "userChats", userId), (doc) => {
        useChatStore.getState().addNotification(doc.data());
    });
};

export default useChatStore;

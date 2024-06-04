import { create } from 'zustand';
import { collection, query, where, onSnapshot, writeBatch, doc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useNotificationStore = create((set) => ({
    notifications: [],
    addNotification: (notification) => set((state) => ({
        notifications: state.notifications ? notification : [...state.notifications, notification],
    })),
    clearNotifications: async () => {
        await useNotificationStore.getState().markRead(); // Call markRead first
        set({ notifications: [] }); // Clear the local state after marking notifications as read
    },
    markRead: async () => {
        // Update Firestore
        const { notifications } = useNotificationStore.getState();
        // Create a batch to update notifications in Firestore
        const batch = writeBatch(firestore);
        notifications.forEach((notification) => {
            if (!notification.read) {
                const notificationRef = doc(firestore, 'notifications', notification.id);
                batch.update(notificationRef, { read: true });
            }
        });

        // Commit the batch update
        await batch.commit();
        set(state => {
            // Update the local state
            const updatedNotifications = state.notifications.map(notification => ({
                ...notification,
                read: true,
            }));
            return { notifications: updatedNotifications };
        });
    },
}));

export const fetchNotifications = (userId) => {
    const q = query(
        collection(firestore, "notifications"),
        where("adminId", "==", userId)
    );

    onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs.data());
        const notifications = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        useNotificationStore.getState().addNotification(notifications);
    });
};

export default useNotificationStore;

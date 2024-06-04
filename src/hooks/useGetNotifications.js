import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, startAfter, limit, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';

const useGetNotifications = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [lastNotification, setLastNotification] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const authUser = useAuthStore((state) => state.user);
    
    const fetchNotifications = async (lastDoc = null) => {
        setIsLoading(true);
        try {
            const q = query(
                collection(firestore, 'notifications'),
                where("adminId", "==", authUser.uid),
                orderBy('createdAt', 'desc'),
                lastDoc ? startAfter(lastDoc) : limit(10)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const newNotifications = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                if (notifications.length === 0) {
                    setNotifications(newNotifications);
                    setLastNotification(querySnapshot.docs[querySnapshot.docs.length - 1]);
                } else {
                    setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
                    setLastNotification(querySnapshot.docs[querySnapshot.docs.length - 1]);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchMoreNotifications = () => {
        if (hasMore && lastNotification) {
            fetchNotifications(lastNotification);
        }
    };

    return { isLoading, notifications, fetchMoreNotifications, hasMore };
};

export default useGetNotifications;

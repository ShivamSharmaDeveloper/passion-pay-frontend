import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useLikePost = (post) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const [likes, setLikes] = useState(post?.likes?.length);
	const [isLiked, setIsLiked] = useState(post?.likes?.includes(authUser?.uid));
	const [notificationDocRef, setNotificationDocRef] = useState(null);
	const showToast = useShowToast();

	const handleLikePost = async () => {
		if (isUpdating) return;
		if (!authUser) return showToast("Error", "You must be logged in to like a post", "error");
		setIsUpdating(true);

		try {
			setIsLiked(!isLiked);
			isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
			const postRef = doc(firestore, "posts", post.id);
			await updateDoc(postRef, {
				likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
			});
			// Add notification
			if (authUser.uid !== post.createdBy) {
				if (!isLiked) {
					const notificationRef = collection(firestore, "notifications");
					const docRef = await addDoc(notificationRef, {
						adminId: post.createdBy, // The user who posted the image
						userId: authUser.uid,
						type: "like",
						message: `liked your post.`,
						postId: post.id,
						read: false,
						createdAt: Date.now()
					});
					setNotificationDocRef(docRef);
				} else {
					const notificationsRef = collection(firestore, 'notifications');
					const notificationsQuery = query(
						notificationsRef,
						where('postId', '==', post?.id),
						where('userId', '==', authUser?.uid),
						where('type', '==', 'like')
					);
					const notificationsSnapshot = await getDocs(notificationsQuery);

					// Remove notification
					if (!notificationsSnapshot.empty) {
						const batch = writeBatch(firestore);
						notificationsSnapshot.forEach((doc) => {
							batch.delete(doc.ref);
						});
						await batch.commit();
					}
				}
			}
			const userRef = doc(firestore, "users", authUser.uid);
			await updateDoc(userRef, {
				likedPosts: isLiked ? arrayRemove(post.id) : arrayUnion(post.id),
			});
		} catch (error) {
			setIsLiked(isLiked);
			isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
			showToast("Error", error.message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;

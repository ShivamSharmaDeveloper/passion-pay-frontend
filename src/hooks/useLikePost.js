import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
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
			const postRef = doc(firestore, "posts", post.id);
			setIsLiked(!isLiked);
			isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
			await updateDoc(postRef, {
				likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
			});
			// Add notification
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
				// Remove notification
				if (notificationDocRef) {
					await deleteDoc(notificationDocRef);
					setNotificationDocRef(null); // Clear the doc ref from state
				}
			}
		} catch (error) {
			setIsLiked(isLiked);
			isLiked ? setLikes(likes + 1) : setLikes(likes - 1);
			showToast("Error", error.message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;

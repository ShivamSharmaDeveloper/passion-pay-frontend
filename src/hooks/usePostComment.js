import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const usePostComment = () => {
	const [isCommenting, setIsCommenting] = useState(false);
	const showToast = useShowToast();
	const authUser = useAuthStore((state) => state.user);
	const addComment = usePostStore((state) => state.addComment);

	const handlePostComment = async (post, comment, setCommentOpen) => {
		if (isCommenting) return;
		if (!authUser) return showToast("Error", "You must be logged in to comment", "error");
		setIsCommenting(true);
		const newComment = {
			comment,
			createdAt: Date.now(),
			createdBy: authUser.uid,
			postId : post.id,
		};
		try {
			await updateDoc(doc(firestore, "posts", post.id), {
				comments: arrayUnion(newComment),
			});
			addComment(post.id, newComment);
			const notificationRef = collection(firestore, "notifications");
			await addDoc(notificationRef, {
				adminId: post.createdBy, // The user who posted the image
				userId: authUser.uid,
				type: "comment",
				message: `commented on your post: ${comment}`,
				postId: post.id,
				read: false,
				createdAt: Date.now()
			});
			setCommentOpen && setCommentOpen(false);
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsCommenting(false);
		}
	};

	return { isCommenting, handlePostComment };
};

export default usePostComment;

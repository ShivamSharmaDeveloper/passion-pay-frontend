import { useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSinglePost = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();

    const getPost = async (postId) => {
        if (!postId) return;
        setIsLoading(true);
        setPosts([]);

        try {
            const postRef = doc(firestore, "posts", postId);
            const postDoc = await getDoc(postRef);

            if (postDoc.exists()) {
                setPosts({ ...postDoc.data(), id: postDoc.id });
                return true;
            } else {
                showToast("", "Oops! Post not found", "error");
                setPosts([]);
                return false;
            }
        } catch (error) {
            showToast("", error.message, "error");
            setPosts([]);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, posts, getPost };
};

export default useGetSinglePost

import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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
            } else {
                showToast("Error", "Post not found", "error");
                setPosts([]);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
            setPosts([]);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, posts, getPost };
};

export default useGetSinglePost

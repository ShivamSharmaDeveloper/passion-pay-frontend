import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetLikedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();
    const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {
        const getLikedPosts = async () => {
            if (!userProfile) return;
            setIsLoading(true);
            setPosts([]);

            try {
                const q = query(
                    collection(firestore, "posts"),
                    where("likes", "array-contains", userProfile.uid)
                );
                const querySnapshot = await getDocs(q);

                const likedPosts = [];
                querySnapshot.forEach((doc) => {
                    likedPosts.push({ ...doc.data(), id: doc.id });
                });

                likedPosts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(likedPosts);
            } catch (error) {
                showToast("", error.message, "error");
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        getLikedPosts();
    }, [setPosts, userProfile, showToast]);

    return { isLoading, posts };
};

export default useGetLikedPosts;

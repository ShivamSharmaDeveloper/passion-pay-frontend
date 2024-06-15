import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where, orderBy, startAfter, limit } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const [lastVisible, setLastVisible] = useState(null);
	const [hasMore, setHasMore] = useState(true);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const { setUserProfile } = useUserProfileStore();
	const pageSize = 10; // Number of posts to load per page

	const getFeedPosts = async (lastDoc) => {
		!lastDoc && setIsLoading(true);
		if (authUser?.following?.length === 0) {
			setIsLoading(false);
			setPosts([]);
			return;
		}

		const q = lastDoc
			? query(
				collection(firestore, "posts"),
				where("createdBy", "in", authUser.following),
				orderBy("createdAt", "desc"),
				startAfter(lastDoc),
				limit(pageSize)
			)
			: query(
				collection(firestore, "posts"),
				where("createdBy", "in", authUser.following),
				orderBy("createdAt", "desc"),
				limit(pageSize)
			);

		try {
			// debugger;
			console.log(q)
			const querySnapshot = await getDocs(q);
			const feedPosts = [];

			querySnapshot.forEach((doc) => {
				feedPosts.push({ id: doc.id, ...doc.data() });
			});

			setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

			// If less than pageSize posts were fetched, it means there are no more posts
			if (querySnapshot.docs.length < pageSize) {
				setHasMore(false);
			}
			return feedPosts;
		} catch (error) {
			console.log(error)
			showToast("Error", error.message, "error");
			return [];
		} finally {
			setIsLoading(false);
		}
	};

	const fetchInitialPosts = async () => {
		const initialPosts = await getFeedPosts(null);
		setPosts(initialPosts);
	};

	const fetchMorePosts = async () => {
		const morePosts = await getFeedPosts(lastVisible);
		setPosts([...posts, ...morePosts]);
	};

	useEffect(() => {
		if (authUser) fetchInitialPosts();
	}, [authUser, showToast, setPosts, setUserProfile]);

	return { isLoading, posts, fetchMorePosts, hasMore };
};

export default useGetFeedPosts;

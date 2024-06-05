import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { getMorePosts, getPosts } from "../services/postService";

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

		try {
			const { feedPosts, lastVisible: newLastVisible } = lastDoc
				? await getMorePosts(authUser, lastDoc)
				: await getPosts(authUser);

			setLastVisible(newLastVisible);

			// If less than pageSize posts were fetched, it means there are no more posts
			if (feedPosts.length < pageSize) {
				setHasMore(false);
			}

			return feedPosts;
		} catch (error) {
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
		setPosts(morePosts);
	};

	useEffect(() => {
		if (authUser) fetchInitialPosts();
	}, [authUser, showToast, setPosts, setUserProfile]);

	return { isLoading, posts, fetchMorePosts, hasMore };
};

export default useGetFeedPosts;

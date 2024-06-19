import { create } from "zustand";

const useUserProfileStore = create((set) => ({
	userProfile: null,
	colorMode: "dark",
	setUserProfile: (userProfile) => set({ userProfile }),
	// this is used to update the number of posts in the profile page
	addPost: (post) =>
		set((state) => ({
			userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts] },
		})),
	deletePost: (postId) =>
		set((state) => ({
			userProfile: {
				...state.userProfile,
				posts: state.userProfile.posts.filter((id) => id !== postId),
			},
		})),
	setColorMode: (color) => set({colorMode: color}),
}));

export default useUserProfileStore;

import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

	const showToast = useShowToast();

	const editProfile = async (inputs, selectedFile) => {
		if (isUpdating || !authUser) return;
		// Define validation regular expressions
		const usernameRegex = /^[a-zA-Z0-9_]+$/;
		const fullNameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/; // Full name validation
		// Validate full name
		if (!fullNameRegex.test(inputs.fullName)) {
			showToast("", "Name can only contain letters, no special characters and not start with space or end", "error");
			return;
		}
		// Validate username
		if (!usernameRegex.test(inputs.username)) {
			showToast("", "Username can only contain letters, numbers, and underscores", "error");
			return;
		}
		setIsUpdating(true);
		const usersRef = collection(firestore, "users");

		const q = query(usersRef, where("username", "==", inputs.username));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			showToast("", "Username already exists", "error");
			setIsUpdating(false);
			return;
		}

		const storageRef = ref(storage, `profilePics/${authUser.uid}`);
		const userDocRef = doc(firestore, "users", authUser.uid);

		let URL = "";
		try {
			if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
			}

			const updatedUser = {
				...authUser,
				fullName: inputs.fullName || authUser.fullName,
				username: inputs.username || authUser.username,
				bio: inputs.bio || authUser.bio,
				profilePicURL: URL || authUser.profilePicURL,
			};

			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			showToast("Success", "Profile updated successfully", "success");
		} catch (error) {
			showToast("", error.message, "error");
		}
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;

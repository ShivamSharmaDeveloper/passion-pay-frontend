import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
	const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);

	const signup = async (inputs, isPrivacyAccepted, isTermsAccepted) => {
		// Define validation regular expressions
		const usernameRegex = /^[a-zA-Z0-9_]+$/;
		const passwordMinLength = 6;
		const passwordMaxLength = 16;
		const fullNameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/; // Full name validation

		if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
			showToast("", "Please fill all the fields", "error");
			return;
		}
		// Validate username
		if (!usernameRegex.test(inputs.username)) {
			showToast("", "Username can only contain letters, numbers, and underscores", "error");
			return;
		}
		const usersRef = collection(firestore, "users");

		const q = query(usersRef, where("username", "==", inputs.username));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			showToast("", "Username already exists", "error");
			return;
		}
		// Validate full name
		if (!fullNameRegex.test(inputs.fullName)) {
			showToast("", "Name can only contain letters, no special characters and not start with space or end", "error");
			return;
		}
		// Validate password length
		if (inputs.password.length < passwordMinLength || inputs.password.length > passwordMaxLength) {
			showToast("", `Password must be between ${passwordMinLength} and ${passwordMaxLength} characters long`, "error");
			return;
		}
		if (!isPrivacyAccepted || !isTermsAccepted) {
			showToast("", "Please Accept Privacy & Policy and Terms & Conditions both!", "error");
			return;
		}

		try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser && error) {
				showToast("", error.code === "auth/email-already-in-use" ? "Email is already registered please login" : error.message, "error");
				return;
			}
			if (newUser) {
				const userDoc = {
					uid: newUser.user.uid,
					email: inputs.email,
					username: inputs.username,
					fullName: inputs.fullName,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
					privateAccount: false,
					followingRequest: [],
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				await setDoc(doc(firestore, "userChats", newUser.user.uid), {});
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			// showToast("", error.message, "error");
		}
	};

	return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;

import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { doLogout } from "../services/authService";
import useChatStore from "../store/chatStore";

const useLogout = () => {
	const [signOut, isLoggingOut, error] = useSignOut(auth);
	const showToast = useShowToast();
	const logoutUser = useAuthStore((state) => state.logout);
	const { setEmptyUser } = useChatStore(state => state);

	const handleLogout = async () => {
		try {
			await signOut();
			await doLogout();
			localStorage.removeItem("user-info");
			setEmptyUser();
			logoutUser();
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { handleLogout, isLoggingOut, error };
};

export default useLogout;

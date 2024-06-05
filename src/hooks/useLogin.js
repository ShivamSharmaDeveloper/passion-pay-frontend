import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { getLoginStatus, loggedin } from "../services/authService";

const useLogin = () => {
	const showToast = useShowToast();
	const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
	const loginUser = useAuthStore((state) => state.login);

	const login = async (inputs) => {
		if (!inputs.email || !inputs.password) {
			return showToast("Error", "Please fill all the fields", "error");
		}
		try {
			const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
			let dataToSend = {
				email: inputs.email,
				password : inputs.password,
			}
			if(userCred){
				let res = await loggedin(dataToSend);
				// console.log(res, "response")
				if (res && res.success) {
					// let verifyLogin = getLoginStatus();
					// console.log(verifyLogin)
					// if(verifyLogin){
						localStorage.setItem("user-info", JSON.stringify(res));
						loginUser(res);
					// }
					// const docRef = doc(firestore, "users", userCred.user.uid);
					// const docSnap = await getDoc(docRef);
				} else {
					showToast("Error", res.response?.data?.message || "Login failed", "error");
				}
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { loading, error, login };
};

export default useLogin;

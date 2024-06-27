import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

const useForgetPassword = () => {
    const showToast = useShowToast();
    const [loading, setLoading] = useState(false);
    const [sendPasswordResetEmail, , error] = useSendPasswordResetEmail(auth);
    const forgetPass = async (inputs, setInputs) => {
        setLoading(true);
        if (!inputs.email) {
            setLoading(false);
            return showToast("", "Please fill all the fields", "error");
        }
        try {
            const usersRef = collection(firestore, "users");

            const q = query(usersRef, where("email", "==", inputs.email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userCred = await sendPasswordResetEmail(inputs.email, { url: `${window.location.origin}/auth` });
                if (userCred) {
                    setInputs({
                        email: "",
                    })
                    showToast("", "Email sent, please check your email.", "success");
                }
            } else {
                showToast("", "Email not found", "error");
            }
            setLoading(false);
        } catch (error) {
            showToast("", error.message, "error");
            setLoading(false);
        }
    };

    return { loading, error, forgetPass };
};

export default useForgetPassword;

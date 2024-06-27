import useShowToast from "./useShowToast";
import { auth } from "../firebase/firebase";
import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
    const showToast = useShowToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const resetPass = async (oobCode, inputs) => {
        setLoading(true);
        console.log(oobCode)
        if (!inputs.password) {
            setLoading(false);
            return showToast("", "Please fill all the fields.", "error");
        }
        if (inputs.password.length < 6 || inputs.password.length > 16) {
            setLoading(false);
            return showToast("", "Password must be between 6 to 16 characters.", "error");
        }
        try {
            confirmPasswordReset(auth, oobCode, inputs.password);
            showToast("", "Password has been changed, you can login now.", "success");
            navigate('/auth');
            setLoading(false);
        } catch (error) {
            showToast("", error.message, "error");
            setLoading(false);
        }
    };

    return { loading, resetPass };
};

export default useResetPassword;

import { Alert, AlertIcon, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { loading, error, login } = useLogin();
	let errorMessage = "Something went wrong. Please try again.";
	if (error) {
		if (error.code === "auth/invalid-login-credentials") {
			errorMessage = "Wrong email and password.";
		} else if (error.code === "auth/invalid-email") {
			errorMessage = "Invalid email address.";
		} else if (error.code === "auth/network-request-failed") {
			errorMessage = "Network error. Please check your internet connection.";
		}
	}

	const handleForgetPassword = () => {
		navigate('/forget-password')
	}

	return (
		<>
			<Input
				placeholder='Email'
				fontSize={14}
				type='email'
				size={"sm"}
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>
			<Input
				placeholder='Password'
				fontSize={14}
				size={"sm"}
				type='password'
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
			/>
			{error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{errorMessage}
				</Alert>
			)}
			<Button
				w={"full"}
				colorScheme='blue'
				size={"sm"}
				fontSize={14}
				isLoading={loading}
				onClick={() => login(inputs)}
			>
				Log in
			</Button>
			<Text sx={{ cursor: 'pointer' }} onClick={handleForgetPassword}>Forget Password?</Text>
		</>
	);
};

export default Login;

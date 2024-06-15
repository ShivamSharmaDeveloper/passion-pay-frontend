import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const { loading, error, signup } = useSignUpWithEmailAndPassword();
	let errorMessage = "Something went wrong. Please try again.";
	if (error) {
		if (error.code === "auth/email-already-in-use") {
			errorMessage = "Email is already registered. Please log in.";
		} else if (error.code === "auth/invalid-email") {
			errorMessage = "Invalid email address.";
		} else if (error.code === "auth/weak-password") {
			errorMessage = "Password should be at least 6 characters.";
		} else if (error.code === "auth/network-request-failed") {
			errorMessage = "Network error. Please check your internet connection.";
		}
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
				placeholder='Username'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs.username}
				onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
			/>
			<Input
				placeholder='Full Name'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs.fullName}
				onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
			/>
			<InputGroup>
				<Input
					placeholder='Password'
					fontSize={14}
					type={showPassword ? "text" : "password"}
					value={inputs.password}
					size={"sm"}
					onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
				/>
				<InputRightElement h='full'>
					<Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? <ViewIcon /> : <ViewOffIcon />}
					</Button>
				</InputRightElement>
			</InputGroup>

			{error && error.code !== "auth/email-already-in-use" && (
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
				onClick={() => signup(inputs)}
			>
				Sign Up
			</Button>
		</>
	);
};

export default Signup;

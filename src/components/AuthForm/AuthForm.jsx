import {
	Box,
	Flex,
	Image,
	Text,
	VStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

// Content for Privacy and Policy
const privacyPolicyContent = `
Effective Date: 16th June 2024

1. Introduction

Welcome to Passion Pay. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines our practices concerning the collection, use, and sharing of your information.

2. Age Requirement

By accessing or using Passion Pay, you agree that you are at least 18 years old. If you are under 18, you are not permitted to use this platform.

3. Information We Collect

Personal Information: We collect personal information that you voluntarily provide to us when registering, such as your name, email address, and payment information.
Content: We collect the content you upload, including photos, videos, comments, and messages.
Usage Data: We collect information about your interactions with the platform, including your IP address, browser type, and activity logs.

4. How We Use Your Information

To Provide Services: We use your information to operate and maintain your account and provide you with the services you have requested.
To Improve Our Platform: We analyze usage data to improve the functionality and user experience of our platform.
To Communicate with You: We may use your information to send you updates, newsletters, and other communications.

5. Sharing Your Information

With Service Providers: We may share your information with third-party service providers who assist us in operating the platform and providing our services.
Legal Compliance: We may disclose your information to comply with legal obligations or in response to valid legal requests.

6. Content Responsibility

Passion Pay is a platform for users to share content freely. Users are solely responsible for the content they upload. Passion Pay does not endorse, verify, or assume any responsibility for any content posted by users. You agree to use the platform at your own risk.

7. Your Rights

Access and Update: You have the right to access and update your personal information at any time through your account settings.
Delete Account: You may delete your account and personal information by contacting our support team.

8. Security

We implement appropriate security measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.

9. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.

10. Contact Us

If you have any questions about this Privacy Policy, please contact us at ourpassionpays@gmail.com.
  `;

// Content for Terms and Conditions
const termsConditionsContent = `
Effective Date: 16th June 2024

1. Introduction

Welcome to Passion Pay. By using our services, you agree to be bound by these terms and conditions. Please read them carefully.

2. Use of Services

You agree to use our services in accordance with all applicable laws and regulations. You are responsible for maintaining the confidentiality of your account information and for any activities that occur under your account.

3. Prohibited Activities

You are not allowed to use our platform for any illegal activities or to upload content that is offensive, defamatory, or infringes on the rights of others.

4. Intellectual Property

All content provided on our platform is protected by copyright and other intellectual property laws. You may not use any content without obtaining the necessary permissions.

5. Limitation of Liability

We are not responsible for any damages or losses resulting from your use of our platform. Our liability is limited to the maximum extent permitted by law.

6. Changes to These Terms

We may update these terms and conditions from time to time. We will notify you of any changes by posting the new terms on our website.

7. Contact Us

If you have any questions about these terms, please contact us at ourpassionpays@gmail.com.
  `;

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
	const [isTermsAccepted, setIsTermsAccepted] = useState(false);

	const handleModalOpen = (title, content) => {
		setModalTitle(title);
		setModalContent(content === "privacy" ? privacyPolicyContent : termsConditionsContent);
		onOpen();
	};

	const handleAccept = () => {
		if (modalTitle === 'Privacy & Policy'){
			setIsPrivacyAccepted(true);
			onClose();
		} else if (modalTitle === 'Terms & Conditions'){
			setIsTermsAccepted(true);
			onClose();
		}
	}
	

	return (
		<>
			<Box border={"1px solid gray"} borderRadius={4} padding={5}>
				<VStack spacing={4}>
					<Text fontSize={"40px"} fontFamily={'"Satisfy", cursive'}>
						PassionPay
					</Text>
					{/* <Image src='/logo.png' h={20} cursor={"pointer"} alt='Instagram' /> */}

					{isLogin ? <Login /> : <Signup isPrivacyAccepted={isPrivacyAccepted} isTermsAccepted={isTermsAccepted} />}

					{/* ---------------- OR -------------- */}
					<Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
						<Box flex={2} h={"1px"} bg={"gray.400"} />
						<Text mx={1} color={"white"}>
							OR
						</Text>
						<Box flex={2} h={"1px"} bg={"gray.400"} />
					</Flex>

					<GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />

					{/* Privacy and Terms Links */}
					<Box textAlign="center">
						{"App's "}
						<Text
							as="span"
							color="blue.500"
							cursor="pointer"
							onClick={() =>
								handleModalOpen(
									"Privacy & Policy",
									"privacy"
								)
							}
						>
							Privacy & Policy
						</Text>
						{" and "}
						<Text
							as="span"
							color="blue.500"
							cursor="pointer"
							onClick={() =>
								handleModalOpen(
									"Terms & Conditions",
									"terms"
								)
							}
						>
							Terms & Conditions
						</Text>
					</Box>
				</VStack>
			</Box>

			<Box border={"1px solid gray"} borderRadius={4} padding={5}>
				<Flex alignItems={"center"} justifyContent={"center"}>
					<Box mx={2} fontSize={14}>
						{isLogin ? "Don't have an account?" : "Already have an account?"}
					</Box>
					<Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
						{isLogin ? "Sign up" : "Log in"}
					</Box>
				</Flex>
			</Box>

			{/* Modal */}
			<Modal isOpen={isOpen} onClose={onClose} size="lg" closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{modalTitle}</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						overflowY="auto"
						whiteSpace="pre-wrap"
						fontFamily="monospace"
						fontSize='14px'
						sx={{
							"&::-webkit-scrollbar": {
								width: "0px"
							}
						}}
					>
						<Text>{modalContent}</Text>
					</ModalBody>
					<ModalFooter>
						{isLogin ? (
							<Button colorScheme="blue" onClick={onClose}>
								Close
							</Button>
						) : (
							<Button colorScheme="blue" onClick={handleAccept}>
								Accept
							</Button>
						)}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthForm;

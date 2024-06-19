import { Box, Button, Flex, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = ({ colorMode }) => {
	const { isLoading, suggestedUsers } = useGetSuggestedUsers();
	const { isOpen, onOpen, onClose } = useDisclosure();

	// optional: render loading skeleton
	if (isLoading) return null;

	return (
		<VStack py={8} px={6} gap={4}>
			<SuggestedHeader colorMode={colorMode} />

			{suggestedUsers.length !== 0 && (
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
					<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
						Suggested for you
					</Text>
					<Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"} onClick={onOpen}>
						See All
					</Text>
				</Flex>
			)}

			{suggestedUsers.slice(0, 3).map((user) => (
				<SuggestedUser user={user} key={user.id} colorMode={colorMode} />
			))}

			<Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
				© 2024 Built By{" "}
				<Link href='https://github.com/ShivamSharmaDeveloper' target='_blank' color='blue.500' fontSize={14}>
					Shivam Sharma
				</Link>
			</Box>
			{/* Modal for showing all suggested users */}
			<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Suggested Users</ModalHeader>
					<ModalCloseButton />
					<ModalBody maxH={'350px'} overflow={'auto'} sx={{scrollbarWidth: 'none'}} >
						{suggestedUsers.map((user) => (
							<Box key={user.id} mb={4}>
								<SuggestedUser user={user} />
							</Box>
						))}
					</ModalBody>
					<Button colorScheme="blue" onClick={onClose} m={4}>
						Close
					</Button>
				</ModalContent>
			</Modal>
		</VStack>
	);
};

export default SuggestedUsers;

import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	GridItem,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../Comment/Caption";
import VideoPlayer from "../FeedPosts/VideoPlayer";
import DeletePostModal from "./DeletePostModal";  // Import the modal

const ProfilePost = ({ post }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const deleteModal = useDisclosure(); // Hook for DeletePostModal
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const deletePost = usePostStore((state) => state.deletePost);
	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

	const handleDeletePost = async () => {
		if (isDeleting) return;
		setIsDeleting(true);
		try {
			const imageRef = ref(storage, `posts/${post.id}`);
			await deleteObject(imageRef);
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", post.id));

			// Update the user's document
			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
				likedPosts: arrayRemove(post.id),
				savedPosts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostsCount(post.id);
			showToast("Success", "Post deleted successfully", "success");
			deleteModal.onClose(); // Close the delete modal after successful deletion
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<GridItem
				display={'flex'}
				alignItems={'center'}
				cursor={"pointer"}
				borderRadius={4}
				overflow={"hidden"}
				border={"1px solid"}
				borderColor={"whiteAlpha.300"}
				position={"relative"}
				aspectRatio={2 / 1}
				onClick={onOpen}
			>
				<Flex
					opacity={0}
					_hover={{ opacity: 1 }}
					position={"absolute"}
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg={"blackAlpha.700"}
					transition={"all 0.3s ease"}
					zIndex={1}
					justifyContent={"center"}
				>
					<Flex alignItems={"center"} justifyContent={"center"} gap={50}>
						<Flex>
							<AiFillHeart size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.likes.length}
							</Text>
						</Flex>

						<Flex>
							<FaComment size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.comments.length}
							</Text>
						</Flex>
					</Flex>
				</Flex>
				{post.type === 'video' ?
					<VideoPlayer video={post.imageURL} maxH={'100%'} /> :
					<Image src={post.imageURL} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />}
			</GridItem>

			<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton filter={'invert(0)'} />
					<ModalBody bg={"black"} pb={5}>
						<Flex
							gap='4'
							w={{ base: "90%", sm: "70%", md: "full" }}
							mx={"auto"}
							maxH={"120vh"}
							minH={"50vh"}
							flexWrap={'wrap'}
							flexDir={{ base: "column", md: "row" }}
						>
							<Flex
								borderRadius={4}
								overflow={"hidden"}
								border={"1px solid"}
								borderColor={"whiteAlpha.300"}
								flex={1.5}
								justifyContent={"center"}
								alignItems={"center"}
								maxW={"80vw"}
								minW={"30vw"}
								maxH={{ base: '50vh', md: "full" }}
							>
								{post.type === 'video' ?
									<VideoPlayer video={post.imageURL} maxH={'70vh'} /> : (
										<Box
											position="relative"
											width="100%"
											height="500px"
											maxWidth="600px"
											display="flex"
											justifyContent="center"
											alignItems="center"
										>
											{/* Blurred Background */}
											<Box
												position="absolute"
												top={0}
												left={0}
												width="100%"
												height="100%"
												backgroundImage={`url(${post.imageURL})`}
												backgroundSize="cover"
												backgroundPosition="center"
												filter="blur(20px)"
												zIndex={0}
											/>
											{/* Foreground Image */}
											<Image
												src={post.imageURL}
												alt="FEED POST IMG"
												position="relative"
												zIndex={1}
												maxHeight="70vh"
												// maxWidth="100%"
												objectFit="contain"
											/>
										</Box>
									)
									// <Image src={post.imageURL} alt='profile post' maxH={'70vh'} />
								}
							</Flex>
							<Flex flex={1} flexDir={"column"} px={{ md: 10, base: 4 }} display={{ base: "flex", md: "flex" }}>
								<Flex alignItems={"center"} justifyContent={"space-between"}>
									<Flex alignItems={"center"} gap={4}>
										<Avatar src={userProfile.profilePicURL} size={"sm"} />
										<Text fontWeight={"bold"} fontSize={12}>
											{userProfile.username}
										</Text>
									</Flex>

									{authUser?.uid === userProfile.uid && (
										<Button
											size={"sm"}
											colorScheme="red"
											onClick={deleteModal.onOpen}  // Open DeletePostModal
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={4}
											p={1}
											isLoading={isDeleting}
										>
											<MdDelete size={20} cursor='pointer' />
										</Button>
									)}
								</Flex>
								{post.caption && <Caption post={post} />}
								<Divider my={4} bg={"gray.500"} />

								<VStack
									alignItems={"flex-start"}
									overflowY={"auto"}
									maxH={{ md: "45vh", base: '25vh' }}
									sx={{ scrollbarWidth: 'none' }}
									spacing={3}
								>
									{post.comments.map((comment) => (
										<Comment
											key={comment.id}
											comment={comment}
										/>
									))}
								</VStack>
								{post.comments.length !== 0 && <Divider my={4} bg={"gray.8000"} />}

								<PostFooter isProfilePage={true} post={post} />
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>

			{deleteModal.isOpen && <DeletePostModal  // Render the delete modal
				isOpen={deleteModal.isOpen}
				onClose={deleteModal.onClose}
				onDelete={handleDeletePost}
			/>}
		</>
	);
};

export default ProfilePost;

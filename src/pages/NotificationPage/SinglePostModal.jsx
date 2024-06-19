import { Avatar, Box, Button, Divider, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md';
import Caption from '../../components/Comment/Caption';
import Comment from '../../components/Comment/Comment';
import PostFooter from '../../components/FeedPosts/PostFooter';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import usePostStore from '../../store/postStore';
import useUserProfileStore from '../../store/userProfileStore';
import useShowToast from '../../hooks/useShowToast';
import VideoPlayer from '../../components/FeedPosts/VideoPlayer';
import { firestore, storage } from '../../firebase/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import DeletePostModal from '../../components/Profile/DeletePostModal';

const SinglePostModal = ({ authUser, posts, notification, isOpen, onClose }) => {
    const { userProfile, isLoading } = useGetUserProfileById(notification?.adminId);
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteModal = useDisclosure(); // Hook for DeletePostModal
    const deletePost = usePostStore((state) => state.deletePost);
    const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
    const colorMode = useUserProfileStore((state) => state.colorMode);
    const isDarkMode = colorMode === 'dark';
    const showToast = useShowToast();
    const handleDeletePost = async () => {
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            const imageRef = ref(storage, `posts/${posts.id}`);
            await deleteObject(imageRef);
            const userRef = doc(firestore, "users", authUser.uid);
            await deleteDoc(doc(firestore, "posts", posts.id));

            // Update the user's document
            await updateDoc(userRef, {
                posts: arrayRemove(posts.id),
                likedPosts: arrayRemove(posts.id),
                savedPosts: arrayRemove(posts.id),
            });

            deletePost(posts.id);
            decrementPostsCount(posts.id);
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
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody bg={isDarkMode ? "black" : "white"} pb={5}>
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
                                {posts.type === 'video' ?
                                    <VideoPlayer video={posts.imageURL} maxH={'70vh'} /> :
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
                                            backgroundImage={`url(${posts.imageURL})`}
                                            backgroundSize="cover"
                                            backgroundPosition="center"
                                            filter="blur(20px)"
                                            zIndex={0}
                                        />
                                        {/* Foreground Image */}
                                        <Image src={posts.imageURL} alt='profile post' position="relative"
                                            zIndex={1}
                                            maxHeight="70vh"
                                            // maxWidth="100%"
                                            objectFit="contain" />
                                    </Box>
                                }
                            </Flex>
                            <Flex flex={1} flexDir={"column"} px={{ md: 10, base: 4 }} display={{ base: "flex", md: "flex" }}>
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <Flex alignItems={"center"} gap={4}>
                                        <Avatar src={userProfile?.profilePicURL} size={"sm"} />
                                        <Text fontWeight={"bold"} fontSize={12}>
                                            {userProfile?.username}
                                        </Text>
                                    </Flex>

                                    {authUser?.uid === userProfile?.uid && (
                                        <Button
                                            size={"sm"}
                                            bg={"transparent"}
                                            _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                                            borderRadius={4}
                                            p={1}
                                            onClick={deleteModal.onOpen}
                                            isLoading={isDeleting}
                                        >
                                            <MdDelete size={20} cursor='pointer' />
                                        </Button>
                                    )}
                                </Flex>
                                {posts.caption && <Caption post={posts} />}
                                <Divider my={4} bg={"gray.500"} />

                                <VStack w='full' alignItems={"start"} maxH={{ md: "45vh", base: '25vh' }} sx={{ scrollbarWidth: 'none' }} overflowY={"auto"}>
                                    {/* CAPTION */}
                                    {/* {post.caption && <Caption post={post} showUser={true} />} */}
                                    {/* COMMENTS */}
                                    {posts?.comments?.map((comment) => (
                                        <Comment key={comment.id} comment={comment} />
                                    ))}
                                </VStack>
                                {posts?.comments?.length !== 0 && <Divider my={4} bg={"gray.8000"} />}

                                <PostFooter isProfilePage={true} post={posts} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {
                deleteModal.isOpen && <DeletePostModal  // Render the delete modal
                    isOpen={deleteModal.isOpen}
                    onClose={deleteModal.onClose}
                    onDelete={handleDeletePost}
                />
            }
        </>
    )
}

export default SinglePostModal

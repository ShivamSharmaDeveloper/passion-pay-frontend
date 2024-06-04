import { Avatar, Button, Divider, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md';
import Caption from '../../components/Comment/Caption';
import Comment from '../../components/Comment/Comment';
import PostFooter from '../../components/FeedPosts/PostFooter';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import usePostStore from '../../store/postStore';
import useUserProfileStore from '../../store/userProfileStore';
import useShowToast from '../../hooks/useShowToast';

const SinglePostModal = ({authUser, posts, notification, isOpen, onClose}) => {
    const { userProfile, isLoading } = useGetUserProfileById(notification?.adminId);
    const [isDeleting, setIsDeleting] = useState(false);
    const deletePost = usePostStore((state) => state.deletePost);
    const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
    const showToast = useShowToast();
    const handleDeletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        if (isDeleting) return;

        try {
            // const imageRef = ref(storage, `posts/${post.id}`);
            // await deleteObject(imageRef);
            // const userRef = doc(firestore, "users", authUser.uid);
            // await deleteDoc(doc(firestore, "posts", post.id));

            // await updateDoc(userRef, {
            //     posts: arrayRemove(post.id),
            // });

            // deletePost(post.id);
            // decrementPostsCount(post.id);
            // showToast("Success", "Post deleted successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsDeleting(false);
        }
    };
  return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
          <ModalOverlay />
          <ModalContent>
              <ModalCloseButton />
              <ModalBody bg={"black"} pb={5}>
                  <Flex
                      gap='4'
                      w={{ base: "90%", sm: "70%", md: "full" }}
                      mx={"auto"}
                      maxH={"120vh"}
                      minH={"50vh"}
                      flexWrap={'wrap'}
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
                      >
                          <Image src={posts.imageURL} alt='profile post' maxH={'70vh'} />
                      </Flex>
                      <Flex flex={1} flexDir={"column"} px={10} display={{ base: "flex", md: "flex" }}>
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
                                      onClick={handleDeletePost}
                                      isLoading={isDeleting}
                                  >
                                      <MdDelete size={20} cursor='pointer' />
                                  </Button>
                              )}
                          </Flex>
                          {posts.caption && <Caption post={posts} />}
                          <Divider my={4} bg={"gray.500"} />

                          <VStack w='full' alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
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
  )
}

export default SinglePostModal

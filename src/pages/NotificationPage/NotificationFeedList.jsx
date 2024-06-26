import { Avatar, Button, Divider, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Skeleton, SkeletonCircle, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { timeAgo } from '../../utils/timeAgo';
import useAuthStore from '../../store/authStore';
import usePostStore from '../../store/postStore';
import { useState } from 'react';
import useUserProfileStore from '../../store/userProfileStore';
import { deleteObject, ref } from 'firebase/storage';
import { firestore, storage } from '../../firebase/firebase';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import useShowToast from '../../hooks/useShowToast';
import { MdDelete } from 'react-icons/md';
import Caption from '../../components/Comment/Caption';
import Comment from '../../components/Comment/Comment';
import PostFooter from '../../components/FeedPosts/PostFooter';
import useGetSinglePost from '../../hooks/useGetSinglePost';
import SinglePostModal from './SinglePostModal';

const NotificationFeedList = ({ notification }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { userProfile, isLoading } = useGetUserProfileById(notification?.userId);
    const authUser = useAuthStore((state) => state.user);
    const { posts, getPost } = useGetSinglePost();
    
    if (isLoading) return <NotificationSkeleton />
    const handleNotificationClick = async (id) => {
        const havePost = await getPost(id);
        if (havePost){
            onOpen();
        }
    }
    // console.log(posts)
    return (
        <>
            <Flex gap={4} key={notification.id} cursor={'pointer'} py={3} onClick={() => handleNotificationClick(notification?.postId)}>
                <Link to={`/${userProfile?.username}`}>
                    <Avatar src={userProfile?.profilePicURL} size={"sm"} />
                </Link>
                <Flex direction={"column"}>
                    <Flex gap={2} alignItems={"center"}>
                        <Link to={`/${userProfile?.username}`}>
                            <Text fontWeight={"bold"} fontSize={12}>
                                {userProfile?.username}
                            </Text>
                        </Link>
                        <Text fontSize={14}>{notification.message}</Text>
                    </Flex>
                    <Text fontSize={12} color={"gray"}>
                        {timeAgo(notification.createdAt)}
                    </Text>
                </Flex>
            </Flex>
            {isOpen && <SinglePostModal isOpen={isOpen} onClose={onClose} authUser={authUser} posts={posts} notification={notification} />}
        </>
    )
}

export default NotificationFeedList

const NotificationSkeleton = () => {
    return (
        <>
            {[0, 1, 2].map((_, idx) => (
                <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                    <Flex gap="2">
                        <SkeletonCircle h={10} w='10' />
                        <VStack gap={2} alignItems={"flex-start"}>
                            <Skeleton height={2} w={"200px"} />
                            <Skeleton height={2} width={50} />
                        </VStack>
                    </Flex>
                </VStack>
            ))
            }
        </>
    );
};

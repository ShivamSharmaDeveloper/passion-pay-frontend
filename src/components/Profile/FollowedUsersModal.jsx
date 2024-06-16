import { useState, useEffect } from "react";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
} from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import fetchFollowedUsers from "../../hooks/usefetchFollowedUsers"; // Adjust path accordingly
import useFollowUser from "../../hooks/useFollowUser";
import FollowUserList from "./followUserList";

const FollowedUsersModal = ({ isOpen, onClose, showing, userProfile, visitingAnotherProfileAndAuth }) => {
    const [followedUsers, setFollowedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);

    useEffect(() => {
        if (visitingAnotherProfileAndAuth){
            if (isOpen && userProfile) {
                setIsLoading(true);
                let followType = showing === "followers" ? "following" : "followers";
                fetchFollowedUsers(userProfile.uid, followType).then((users) => {
                    setFollowedUsers(users);
                    setIsLoading(false);
                });
            }
        }else{
            if (isOpen && authUser) {
                setIsLoading(true);
                let followType = showing === "followers" ? "following" : "followers";
                fetchFollowedUsers(authUser.uid, followType).then((users) => {
                    setFollowedUsers(users);
                    setIsLoading(false);
                });
            }
        }
    }, [isOpen, authUser, showing]);
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                <ModalHeader>{showing === "following" ? 'Following' : 'Followers'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {isLoading ? (
                        <Flex justifyContent="center">
                            <Spinner size="lg" />
                        </Flex>
                    ) : (
                        <Flex direction="column" gap={2} sx={{maxHeight: '380px', overflow: 'auto', scrollbarWidth: 'none'}}>
                            {followedUsers.length > 0 ? (
                                followedUsers.map((user) => (
                                    <FollowUserList user={user} authUser={authUser} key={user.id} visitingAnotherProfileAndAuth={visitingAnotherProfileAndAuth} />
                                ))
                            ) : (
                                <Box>No followed users found.</Box>
                            )}
                        </Flex>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default FollowedUsersModal;

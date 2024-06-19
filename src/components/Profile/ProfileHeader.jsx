import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import FollowedUsersModal from "./FollowedUsersModal";
import { useState } from "react";
import { EditIcon, SettingsIcon } from "@chakra-ui/icons";
import ProfileMenu from "../Sidebar/ProfileMenu";

const ProfileHeader = ({ isDarkMode }) => {
	const { userProfile } = useUserProfileStore();
	const [showing, setShowing] = useState("following");  // 'followers' or 'following'
	const authUser = useAuthStore((state) => state.user);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const isTabletOrBelow = useBreakpointValue({ base: true, md: false });
	// State to manage the modal for following users
	const { isOpen: isFollowingModalOpen, onOpen: openFollowingModal, onClose: closeFollowingModal } = useDisclosure();

	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

	return (
		<Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
			{visitingOwnProfileAndAuth && isTabletOrBelow &&
				<ProfileMenu />
			}
			<AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
				<Avatar src={userProfile.profilePicURL} alt='As a programmer logo' />
			</AvatarGroup>

			<VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
				<Flex
					gap={4}
					direction={{ base: "column", sm: "row" }}
					justifyContent={{ base: "center", sm: "flex-start" }}
					alignItems={"center"}
					w={"full"}
				>
					<Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.username}</Text>
					{visitingOwnProfileAndAuth && (
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={isDarkMode ? "white" : "blue.500"}
								leftIcon={<EditIcon />}
								color={isDarkMode ? "black" : "white"}
								_hover={{ bg: isDarkMode ? "whiteAlpha.800" : "blue.600" }}
								size={{ base: "xs", md: "sm" }}
								onClick={onOpen}
							>
								Edit Profile
							</Button>
						</Flex>
					)}
					{visitingAnotherProfileAndAuth && (
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"blue.500"}
								color={"white"}
								_hover={{ bg: "blue.600" }}
								size={{ base: "xs", md: "sm" }}
								onClick={handleFollowUser}
								isLoading={isUpdating}
							>
								{isFollowing ? "Unfollow" : "Follow"}
							</Button>
						</Flex>
					)}
				</Flex>

				<Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{userProfile.posts.length}
						</Text>
						Posts
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }} onClick={() => { setShowing("followers"); openFollowingModal(); }} cursor={'pointer'}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{userProfile.followers.length}
						</Text>
						Followers
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }} onClick={() => { setShowing("following"); openFollowingModal(); }} cursor={'pointer'}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{userProfile.following.length}
						</Text>
						Following
					</Text>
				</Flex>
				<Flex alignItems={"center"} gap={4}>
					<Text fontSize={"sm"} fontWeight={"bold"}>
						{userProfile.fullName}
					</Text>
				</Flex>
				<Text fontSize={"sm"}>{userProfile.bio}</Text>
			</VStack>
			{isOpen && <EditProfile isOpen={isOpen} onClose={onClose}isDarkMode={isDarkMode} />}
			{isFollowingModalOpen && <FollowedUsersModal isOpen={isFollowingModalOpen} onClose={closeFollowingModal} showing={showing} userProfile={userProfile} visitingAnotherProfileAndAuth={visitingAnotherProfileAndAuth} isDarkMode={isDarkMode} />}
		</Flex>
	);
};

export default ProfileHeader;

import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import useUserProfileStore from "../../store/userProfileStore";
import { useState } from "react";
import SavedPosts from "../../components/Profile/SavedPosts";
import LikedPosts from "../../components/Profile/LikedPosts";

const ProfilePage = () => {
	const { username } = useParams();
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);
	const colorMode = useUserProfileStore((state) => state.colorMode);
	let isDarkMode = colorMode === 'dark';
	const [activeTab, setActiveTab] = useState('posts'); // State for active tab
	const userNotFound = !isLoading && !userProfile;
	if (userNotFound) return <UserNotFound />;

	return (
		<Container maxW='container.lg' py={5}>
			<Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"}>
				{!isLoading && userProfile && <ProfileHeader isDarkMode={isDarkMode} />}
				{isLoading && <ProfileHeaderSkeleton />}
			</Flex>
			<Flex
				px={{ base: 2, sm: 4 }}
				maxW={"full"}
				mx={"auto"}
				borderTop={"1px solid"}
				borderColor={isDarkMode ? "whiteAlpha.300" : "inherit"}
				direction={"column"}
			>
				<ProfileTabs isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} />
				{activeTab === 'posts' && <ProfilePosts isDarkMode={isDarkMode} />}
				{activeTab === 'saved' && <SavedPosts isDarkMode={isDarkMode} />}
				{activeTab === 'likes' && <LikedPosts isDarkMode={isDarkMode} />}
			</Flex>
		</Container>
	);
};

export default ProfilePage;

// skeleton for profile header
const ProfileHeaderSkeleton = () => {
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='24' />

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='12px' width='150px' />
				<Skeleton height='12px' width='100px' />
			</VStack>
		</Flex>
	);
};

const UserNotFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={250}>
			<Text fontSize={"2xl"}>User Not Found or Broke Down☠️!</Text>
			<Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
				Go home
			</Link>
		</Flex>
	);
};

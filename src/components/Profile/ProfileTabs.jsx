import { Box, Flex, Text } from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";

const ProfileTabs = ({ isDarkMode, activeTab, setActiveTab }) => {
	const tabs = [
		{ name: 'posts', icon: BsGrid3X3, label: 'Posts' },
		{ name: 'saved', icon: BsBookmark, label: 'Saved' },
		{ name: 'likes', icon: BsSuitHeart, label: 'Likes' },
	];
	return (
		<Flex
			w={"full"}
			justifyContent={"center"}
			gap={{ base: 4, sm: 10 }}
			textTransform={"uppercase"}
			fontWeight={"bold"}
		>
			{tabs.map((tab) => (
				<Flex
					key={tab.name}
					borderTop={activeTab === tab.name ? "1px solid #3182ce" : "none"}
					alignItems={"center"}
					p='3'
					gap={1}
					cursor={"pointer"}
					onClick={() => setActiveTab(tab.name)}
					// borderBottom={activeTab === tab.name ? "2px solid" : "none"}
					color={activeTab === tab.name ? "blue.500" : "inherit"}
				>
					<Box fontSize={20}>
						<tab.icon />
					</Box>
					<Text fontSize={12} display={{ base: "none", sm: "block" }}>
						{tab.label}
					</Text>
				</Flex>
			))}
		</Flex>
	);
};

export default ProfileTabs;

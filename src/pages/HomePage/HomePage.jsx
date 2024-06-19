import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import useUserProfileStore from "../../store/userProfileStore";

const HomePage = () => {
	const colorMode = useUserProfileStore((state) => state.colorMode);
	return (
		<Container maxW={"container.lg"}>
			<Flex gap={20}>
				<Box flex={2} py={{md: 10, base: 0}}>
					<FeedPosts colorMode={colorMode} />
				</Box>
				<Box flex={3} mr={10} display={{ base: "none", lg: "block" }} maxW={"300px"}>
					<SuggestedUsers colorMode={colorMode} />
				</Box>
			</Flex>
		</Container>
	);
};

export default HomePage;

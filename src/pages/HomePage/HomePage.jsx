import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
	return (
		<Container maxW={"container.lg"}>
			<Flex gap={20}>
				<Box flex={2} py={{md: 10, base: 0}}>
					<FeedPosts />
				</Box>
				<Box flex={3} mr={10} display={{ base: "none", lg: "block" }} maxW={"300px"}>
					<SuggestedUsers />
				</Box>
			</Flex>
		</Container>
	);
};

export default HomePage;

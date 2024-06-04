import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import InfiniteScroll from "react-infinite-scroll-component";

const FeedPosts = () => {
	const { isLoading, posts, fetchMorePosts, hasMore } = useGetFeedPosts();

	return (
		<Container maxW={"container.sm"} py={10} px={2}>
			{isLoading && (
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
						<Flex gap="2">
							<SkeletonCircle size="10" />
							<VStack gap={2} alignItems={"flex-start"}>
								<Skeleton height="10px" w={"200px"} />
								<Skeleton height="10px" w={"200px"} />
							</VStack>
						</Flex>
						<Skeleton w={"full"}>
							<Box h={"400px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))
			)}

			{!isLoading && posts.length > 0 && (
				<InfiniteScroll
					dataLength={posts?.length}
					next={fetchMorePosts}
					hasMore={hasMore}
					loader={
						<VStack gap={4} alignItems={"flex-start"} mb={10}>
							<Flex gap="2">
								<SkeletonCircle size="10" />
								<VStack gap={2} alignItems={"flex-start"}>
									<Skeleton height="10px" w={"200px"} />
									<Skeleton height="10px" w={"200px"} />
								</VStack>
							</Flex>
							<Skeleton w={"full"}>
								<Box h={"400px"}>contents wrapped</Box>
							</Skeleton>
						</VStack>
					}
				>
					{posts?.map((post) => (
						<FeedPost key={post.id} post={post} />
					))}
				</InfiniteScroll>
			)}

			{!isLoading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"}>
						Dayuum. Looks like you don&apos;t have any friends.
					</Text>
					<Text color={"red.400"}>Search or invite some!!</Text>
				</>
			)}
		</Container>
	);
};

export default FeedPosts;

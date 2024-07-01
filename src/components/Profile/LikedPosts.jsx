import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import useGetLikedPosts from "../../hooks/useGetLikedPosts"; // Adjust hook as necessary
import ProfilePost from "./ProfilePost";
import { Grid, Skeleton, VStack, Box } from "@chakra-ui/react";

const LikedPosts = ({ isDarkMode }) => {
    // const { isLoading, posts } = useGetLikedPosts();

    // const noLikedPosts = !isLoading && posts.length === 0;
    const noLikedPosts = true;
    if (noLikedPosts) return <NoPostsFound />;

    return (
        <Grid
            templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
            }}
            gap={1}
            columnGap={1}
        >
            {/* {isLoading &&
                [0, 1, 2].map((_, idx) => (
                    <VStack key={idx} alignItems={"flex-start"} gap={4}>
                        <Skeleton w={"full"}>
                            <Box h='300px'>contents wrapped</Box>
                        </Skeleton>
                    </VStack>
                ))} */}

            {/* {!isLoading && (
                <>
                    {posts.map((post) => (
                        <ProfilePost post={post} key={post.id} isDarkMode={isDarkMode} />
                    ))}
                </>
            )} */}
        </Grid>
    );
};

export default LikedPosts;

const NoPostsFound = () => {
    return (
        <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
            {/* <Text fontSize={"2xl"}>No Liked Posts Found🤔</Text> */}
            <Text fontSize={"2xl"}>This feature comming soon🧩</Text>
        </Flex>
    );
};

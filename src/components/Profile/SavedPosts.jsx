import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import useGetSavedPosts from "../../hooks/useGetSavedPosts";
import ProfilePost from "./ProfilePost";
import { Grid, Skeleton, VStack, Box } from "@chakra-ui/react";

const SavedPosts = ({ isDarkMode }) => {
    // const { isLoading, savedPosts } = useGetSavedPosts(); // Adjust hook as necessary

    // const noSavedPosts = !isLoading && savedPosts.length === 0;
    const noSavedPosts = true;
    if (noSavedPosts) return <NoPostsFound />;

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
                    {savedPosts.map((post) => (
                        <ProfilePost post={post} key={post.id} isDarkMode={isDarkMode} />
                    ))}
                </>
            )} */}
        </Grid>
    );
};

export default SavedPosts;

const NoPostsFound = () => {
    return (
        <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
            {/* <Text fontSize={"2xl"}>No Saved Posts Found🤔</Text> */}
            <Text fontSize={"2xl"}>This feature comming soon🚀</Text>
        </Flex>
    );
};

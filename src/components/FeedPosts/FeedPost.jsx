import { Box, Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import VideoPlayer from "./VideoPlayer";

const FeedPost = ({ post, colorMode }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);
	const isTabletOrBelow = useBreakpointValue({ base: true, md: false });

	return (
		<>
			<PostHeader post={post} creatorProfile={userProfile} colorMode={colorMode} />
			<Box my={2} borderRadius={4} overflow={"hidden"} display={'flex'} justifyContent={'center'} alignItems={'center'}>
				{post.type === 'video' ?
					<VideoPlayer video={post.imageURL} maxH={isTabletOrBelow ? '330px' : '400px'} />
					: (<Box
						position="relative"
						width="100%"
						height={isTabletOrBelow ? '330px' : '400px'}
						maxWidth="600px"
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						{/* Blurred Background */}
						<Box
							position="absolute"
							top={0}
							left={0}
							width="100%"
							height="100%"
							backgroundImage={`url(${post.imageURL})`}
							backgroundSize="cover"
							backgroundPosition="center"
							filter="blur(20px)"
							zIndex={0}
						/>
						{/* Foreground Image */}
						<Image
							src={post.imageURL}
							alt="FEED POST IMG"
							position="relative"
							zIndex={1}
							maxHeight={isTabletOrBelow ? '330px' : '400px'}
							maxWidth="100%"
							objectFit="contain"
						/>
					</Box>)
				}
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</>
	);
};

export default FeedPost;

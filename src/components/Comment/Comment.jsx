import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const Comment = ({ comment }) => {
	const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);

	if (isLoading) return <CommentSkeleton />;
	return (
		<Flex gap={4} key={comment.id}>
			<Link to={`/${userProfile.username}`}>
				<Avatar src={userProfile.profilePicURL} size={"sm"} />
			</Link>
			{/* <Flex direction={"column"} minWidth={'270px'} maxWidth={'270px'}> */}
			<Flex direction={"column"}>
				<Flex gap={2} alignItems={"center"}>
					<Link to={`/${userProfile.username}`}>
						<Text fontWeight={"bold"} fontSize={12}>
							{userProfile.username}
						</Text>
					</Link>
					<Text fontSize={14}>{comment.comment}</Text>
				</Flex>
				<Text fontSize={12} color={"gray"}>
					{timeAgo(comment.createdAt)}
				</Text>
			</Flex>
			{/* <Flex direction={"column"} alignItems={'flex-end'}>
				<Box cursor={"pointer"} sx={{ alignItems: 'center', gap: '5px' }} onClick={() => setIsLiked(!isLiked)}>
					{!isLiked ? <NotificationsLogo style={{ height: '12px', width: '12px' }} /> : <UnlikeLogo style={{ height: '12px', width: '12px' }} />}
				</Box>
				<Text fontSize={12} color={"gray"}>
					1
				</Text>
			</Flex> */}
		</Flex>
	);
};

export default Comment;

const CommentSkeleton = () => {
	return (
		<Flex gap={4} w={"full"} alignItems={"center"}>
			<SkeletonCircle h={10} w='10' />
			<Flex gap={1} flexDir={"column"}>
				<Skeleton height={2} width={100} />
				<Skeleton height={2} width={50} />
			</Flex>
		</Flex>
	);
};

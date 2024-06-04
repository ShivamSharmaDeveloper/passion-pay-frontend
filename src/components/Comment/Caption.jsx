import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import useUserProfileStore from "../../store/userProfileStore";

const Caption = ({ post, showUser }) => {
	const userProfile = useUserProfileStore((state) => state.userProfile);

	return (
		<Flex gap={4} pt={showUser ? 0 : 2}>
			{showUser && <Link to={`/${userProfile.username}`}>
				<Avatar src={userProfile.profilePicURL} size={"sm"} />
			</Link>}
			<Flex direction={"column"}>
				<Flex gap={2} alignItems={"center"}>
					{showUser && <Link to={`/${userProfile.username}`}>
						<Text fontWeight={"bold"} fontSize={12}>
							{userProfile.username}
						</Text>
					</Link>}
					<Text fontSize={14}>{post.caption}</Text>
				</Flex>
				{showUser && <Text fontSize={12} color={"gray"}>
					{timeAgo(post.createdAt)}
				</Text>}
			</Flex>
		</Flex>
	);
};

export default Caption;

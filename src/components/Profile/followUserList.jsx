import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useFollowUser from '../../hooks/useFollowUser';

const FollowUserList = ({user, authUser}) => {
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user?.uid);

  return (
      <Flex key={user.id} alignItems={'center'} justifyContent={'space-between'}>
          <Flex p={2} alignItems="center" gap={4}>
              <Avatar src={user.profilePicURL} alt={user.username} />
              <Text>{user.username}</Text>
          </Flex>
          {authUser?.uid !== user?.uid && <Button
              fontSize={13}
              bg={"transparent"}
              p={0}
              h={"max-content"}
              fontWeight={"medium"}
              color={"blue.400"}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              onClick={handleFollowUser}
              isLoading={isUpdating}
          >
              {isFollowing ? "Unfollow" : "Follow"}
          </Button>}
      </Flex>
  )
}

export default FollowUserList

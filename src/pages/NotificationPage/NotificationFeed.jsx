import { Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import useGetNotifications from '../../hooks/useGetNotifications';
import InfiniteScroll from 'react-infinite-scroll-component';
import NotificationFeedList from './NotificationFeedList';

const NotificationFeed = () => {
    const { isLoading, notifications, fetchMoreNotifications, hasMore } = useGetNotifications();

    return (
        <Container maxW={"container.sm"} py={10} px={2}>
            {isLoading && (
                [0, 1, 2, 3, 4, 5, 6].map((_, idx) => (
                    <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                        <Flex gap="2">
                            <SkeletonCircle h={10} w='10' />
                            <VStack gap={2} alignItems={"flex-start"}>
                                <Skeleton height={2} w={"200px"} />
                                <Skeleton height={2} width={50} />
                            </VStack>
                        </Flex>
                    </VStack>
                ))
            )}

            {!isLoading && notifications.length > 0 && (
                <InfiniteScroll
                    dataLength={notifications.length}
                    next={fetchMoreNotifications}
                    hasMore={hasMore}
                    loader={
                        <VStack gap={4} alignItems={"flex-start"} mb={10}>
                            <Flex gap="2">
                                <SkeletonCircle size="10" />
                                <VStack gap={2} alignItems={"flex-start"}>
                                    <Skeleton height={2} w={"200px"} />
                                    <Skeleton height={2} width={50} />
                                </VStack>
                            </Flex>
                        </VStack>
                    }
                >
                    {notifications.map((notification) => (
                        <NotificationFeedList notification={notification} key={notification}/>
                    ))}
                </InfiniteScroll>
            )}

            {!isLoading && notifications.length === 0 && (
                <>
                    <Text fontSize={"md"} color={"red.400"}>
                        Dayuum. Looks like you don&apos;t have any notifications.
                    </Text>
                </>
            )}
        </Container>
    );
}

export default NotificationFeed

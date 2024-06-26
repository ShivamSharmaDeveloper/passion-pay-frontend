import { Badge, Box, Flex, Tooltip } from "@chakra-ui/react";
import { MessagesLogo } from "../../assets/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useChatStore, { fetchMessageNotifications } from "../../store/chatStore";

const Messages = ({ authUser, colorMode }) => {
    const navigate = useNavigate();
    const { messageNotifications, clearNotifications } = useChatStore();
    const [totalUnreadCount, setTotalUnreadCount] = useState(0);
    const handleClick = () => {
        navigate('/direct');
    };
    useEffect(() => {
        if (authUser) {
            fetchMessageNotifications(authUser.uid);
        }
    }, [authUser]);
    
    useEffect(() => {
        if (messageNotifications && typeof messageNotifications === 'object') {
            // Convert object to array
            const notificationsArray = Object.values(messageNotifications);

            // Calculate total unread count
            const totalUnread = notificationsArray.reduce((total, notification) => {
                return total + (notification.unreadCount || 0);
            }, 0);

            setTotalUnreadCount(totalUnread);
        }
    }, [messageNotifications]);


    return (
        <Tooltip
            hasArrow
            label={"Messages"}
            placement='right'
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Flex
                alignItems={"center"}
                gap={4}
                _hover={{ bg: colorMode === 'dark' ? "whiteAlpha.400" : "#E2E8F0" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={handleClick}
            >
                <Box position={"relative"} sx={{ filter: colorMode === 'dark' ? 'invert(0) !important' : 'invert(1) !important' }}>
                    {totalUnreadCount > 0 && (
                        <Badge
                            variant='solid'
                            sx={{ backgroundColor: '#D2042D', padding: '0px 5px' }}
                            borderRadius="full"
                            position="absolute"
                            top="-1"
                            right="-2"
                            filter={'invert(1) !important'}
                        >
                            {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
                        </Badge>
                    )}
                    <MessagesLogo />
                </Box>
                <Box display={{ base: "none", md: "block" }}>Messages</Box>
            </Flex>
        </Tooltip>
    );
};

export default Messages;

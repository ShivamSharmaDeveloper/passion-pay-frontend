import { Badge, Box, Flex, Tooltip } from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/constants";
import { useEffect } from "react";
import useNotificationStore, { fetchNotifications } from "../../store/notificationStore";
import { useNavigate } from "react-router-dom";

const Notifications = ({ authUser }) => {
	const navigate = useNavigate();
	const { notifications, clearNotifications } = useNotificationStore();

	console.log(notifications, 'notifi')
	useEffect(() => {
		if (authUser) {
			fetchNotifications(authUser.uid);
		}
	}, [authUser]);
	const handleClick = () => {
		navigate('/notification');
		clearNotifications();
	};
	return (
		<Tooltip
			hasArrow
			label={"Notifications"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Flex
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
				onClick={handleClick}
			>
				<Box position={"relative"}>
					{notifications && notifications.some(notification => !notification.read) && (
						<Badge
							variant='solid'
							sx={{ backgroundColor: '#D2042D', padding: '0px 5px'}}
							borderRadius="full"
							position="absolute"
							top="-1"
							right="-2"
						>
							{notifications.filter(notification => !notification.read).length}
						</Badge>
					)}
					<NotificationsLogo />
				</Box>
				<Box display={{ base: "none", md: "block" }}>Notifications</Box>
			</Flex>
		</Tooltip>
	);
};

export default Notifications;

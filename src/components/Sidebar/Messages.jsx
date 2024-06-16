import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { MessagesLogo } from "../../assets/constants";
import { useNavigate } from "react-router-dom";

const Messages = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate('/direct');
    };
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
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={handleClick}
            >
                <MessagesLogo />
                <Box display={{ base: "none", md: "block" }}>Messages</Box>
            </Flex>
        </Tooltip>
    );
};

export default Messages;

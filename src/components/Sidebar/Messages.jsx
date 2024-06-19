import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { MessagesLogo } from "../../assets/constants";
import { useNavigate } from "react-router-dom";

const Messages = ({ colorMode }) => {
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
                _hover={{ bg: colorMode === 'dark' ? "whiteAlpha.400" : "#E2E8F0" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
                onClick={handleClick}
            >
                <Box sx={{ filter: colorMode === 'dark' ? 'invert(0) !important' : 'invert(1) !important' }}>
                    <MessagesLogo />
                </Box>
                <Box display={{ base: "none", md: "block" }}>Messages</Box>
            </Flex>
        </Tooltip>
    );
};

export default Messages;

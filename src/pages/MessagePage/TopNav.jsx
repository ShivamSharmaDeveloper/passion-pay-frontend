// src/components/TopNav.jsx
import { Box, Avatar, Button, Text, Flex } from "@chakra-ui/react";

const TopNav = () => {
    return (
        <Box
            bg="primary"
            color="white"
            p={4}
            borderBottom="1px solid"
            borderColor="secondary"
        >
            <Flex justify="space-between" align="center">
                <Text fontSize="xl">Lama Chat</Text>
                {/* <Flex align="center">
                    <Avatar name="John Norton" src="https://via.placeholder.com/50" />
                    <Text ml={2}>John Norton</Text>
                    <Button ml={4} size="sm" variant="outline">
                        Logout
                    </Button>
                </Flex> */}
            </Flex>
        </Box>
    );
};

export default TopNav;

import { Box, Avatar, Text, VStack, Heading, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { linkedUsers } from "../../services/messageService";

const SideNav = ({ onUserSelect }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await linkedUsers();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleUserClick = (user) => {
        onUserSelect(user.userName);
        navigate("/chat");
    };

    return (
        <Box w={{ base: "50%", md: "300px" }} bg="primary" color="white" p={4} borderRight="1px solid" borderColor="secondary" overflowY="auto">
            <Heading size="lg" mb={4}>Messages</Heading>
            <Input placeholder="Find a user" mb={4} />
            <VStack spacing={4} align="stretch">
                {users.map((user, index) => (
                    <Box
                        key={index}
                        p={2}
                        bg="secondary"
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        cursor="pointer"
                        _hover={{ bg: "tertiary" }}
                        onClick={() => handleUserClick(user)}
                    >
                        <Avatar name={user.name} src={user.img} />
                        <Box ml={3}>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm">{user.status}</Text>
                        </Box>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default SideNav;

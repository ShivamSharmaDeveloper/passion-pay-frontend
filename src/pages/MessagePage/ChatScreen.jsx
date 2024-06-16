import React, { useState, useEffect } from "react";
import {
    Box,
    Avatar,
    Text,
    VStack,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    Button,
    List,
    ListItem
} from "@chakra-ui/react";
import axios from "axios";

const ChatScreen = ({ messages, onStartConversation }) => {
    return (
        <>
            {messages.length === 0 ? (
                <div>
                    <p>Start a conversation with a friend</p>
                    <Button onClick={onStartConversation}>Add</Button>
                </div>
            ) : (
                <Box flex={1} bg="tertiary" p={4} overflowY="auto" sx={{ scrollbarWidth: 'none' }}>
                    <VStack spacing={4} align="stretch">
                        {messages.map((message, index) => (
                            <HStack
                                key={index}
                                alignSelf={message.isSender ? "flex-end" : "flex-start"}
                                bg="white"
                                borderRadius="md"
                                p={3}
                                shadow="sm"
                            >
                                {!message.isSender && <Avatar src={message.img} />}
                                <Box>
                                    <Text color="gray.500">{message.text}</Text>
                                    <Text fontSize="sm" color="gray.500">
                                        <Text as="span">{message.time}</Text>
                                    </Text>
                                </Box>
                                {message.isSender && <Avatar src={message.img} />}
                            </HStack>
                        ))}
                    </VStack>
                </Box>
            )}
        </>
    );
};

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchMessages();  // Fetch messages when component mounts
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/message/getMessages/bEIaG1w9DJEdY3Ig3dle`, { withCredentials: true });
            setMessages(response.data.messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleStartConversation = () => {
        setIsModalOpen(true);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/message/search', {
                params: { query: searchQuery },
                withCredentials: true
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleSelectUser = async (userId) => {
        try {
            await axios.post('http://localhost:5000/api/message/sendMessage', { userId }, { withCredentials: true });
            setIsModalOpen(false);
            fetchMessages();  // Optionally refetch messages or navigate to the conversation
        } catch (error) {
            console.error("Error starting conversation:", error);
        }
    };

    return (
        <div>
            <ChatScreen messages={messages} onStartConversation={handleStartConversation} />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Start a conversation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Search users"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button onClick={handleSearch}>Search</Button>
                        <List>
                            {searchResults.map((user) => (
                                <ListItem key={user.id} onClick={() => handleSelectUser(user.id)}>
                                    <Avatar src={user.avatar} />
                                    <span>{user.userName}</span>
                                </ListItem>
                            ))}
                        </List>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ChatApp;
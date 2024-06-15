import { Box, Avatar, Text, Flex, VStack, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const ChatMessages = ({ chat }) => {
    const messagesEndRef = useRef(null);

    // Scroll to bottom when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    return (
        <VStack
            align="stretch"
            spacing={4}
            p={4}
            bg={useColorModeValue("gray.50", "gray.800")}
            height="100%"
            overflowY="auto"
        >
            {chat.messages.map((message, index) => (
                <MessageItem key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
        </VStack>
    );
};

const MessageItem = ({ message }) => {
    const isOwnMessage = message.sender === "currentUser"; // Example check
    const messageBg = useColorModeValue("gray.100", isOwnMessage ? "blue.500" : "gray.700");
    const textColor = useColorModeValue(isOwnMessage ? "white" : "black", "white");

    return (
        <Flex
            justify={isOwnMessage ? "flex-end" : "flex-start"}
            align="center"
        >
            {!isOwnMessage && (
                <Avatar
                    src={message.avatar}
                    name={message.sender}
                    size="sm"
                    mr={4}
                />
            )}
            <Box
                bg={messageBg}
                color={textColor}
                p={4}
                borderRadius="md"
                maxW="70%"
            >
                <Text>{message.content}</Text>
                <Text fontSize="xs" mt={1} color="gray.500">
                    {message.timestamp}
                </Text>
            </Box>
        </Flex>
    );
};

export default ChatMessages;

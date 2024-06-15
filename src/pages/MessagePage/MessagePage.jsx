import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { Box, Flex } from '@chakra-ui/react';
import TopNav from './TopNav';
import SideNav from './SideNav';
import ChatScreen from './ChatScreen';
import InputBox from './InputBox';
import useAuthStore from '../../store/authStore';
import { getMessages, sendMessage, linkedUsers } from "../../services/messageService";
import ChatApp from './ChatScreen';

const socket = io("http://localhost:4000/");

function MessagesPage() {
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedUser) {
                const data = await getMessages(selectedUser);
                setMessages(data.messages);
            }
        };

        fetchMessages();
    }, [selectedUser]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socket.off("message");
    }, []);

    const handleSendMessage = async (text) => {
        if (1) {
            await sendMessage("yash", text);
            socket.emit("sendMessage", { text, to: selectedUser });
        }
    };

    return (
        <Flex direction="column" height="100vh">
            <Flex flex={1}>
                <SideNav onUserSelect={setSelectedUser} />
                <Box flex={1} display="flex" flexDirection="column" maxHeight="100vh">
                    <TopNav />
                    <ChatApp messages={messages} />
                    <InputBox onSendMessage={handleSendMessage} />
                </Box>
            </Flex>
        </Flex>
    );
}

export default MessagesPage;

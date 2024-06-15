import { Box, Input, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const InputBox = ({ onSendMessage }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text);
            setText("");
        }
    };

    return (
        <Box bg="inherit" p={4} borderTop="1px solid" borderColor="secondary">
            <Flex>
                <Input
                    placeholder="Type something..."
                    flex={1}
                    mr={2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button colorScheme="blue" onClick={handleSend}>Send</Button>
            </Flex>
        </Box>
    );
};

export default InputBox;

import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
// import Sidebar from '../../components/Sidebar/Sidebar'
import Chat from '../../components/Messages/Chat'
import Sidebar from '../../components/Messages/Sidebar'
import MessageCss from './Message.module.css';

const MessageLayout = () => {
    return (
        <Container maxW={"container.lg"}>
            <Box className={MessageCss.home}>
                <Box className={MessageCss.container}>
                    <Sidebar MessageCss={MessageCss} />
                    <Chat MessageCss={MessageCss} />
                </Box>
            </Box>
        </Container>
    )
}

export default MessageLayout

import { Alert, AlertIcon, Box, Button, Container, Flex, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useForgetPassword from '../../hooks/useForgetPassword';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
    });
    const { loading, error, forgetPass } = useForgetPassword();
    let errorMessage = "Something went wrong. Please try again.";
    if (error) {
        if (error.code === "auth/invalid-login-credentials") {
            errorMessage = "Wrong email and password.";
        } else if (error.code === "auth/invalid-email") {
            errorMessage = "Invalid email address.";
        } else if (error.code === "auth/network-request-failed") {
            errorMessage = "Network error. Please check your internet connection.";
        }
    }

    const handleLogin = () => {
        navigate('/auth');
    }


    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"flex-start"} px={4}>
            <Container maxW={"container.md"} padding={0}>
                <Flex justifyContent={"center"} alignItems={"center"} gap={10} my={3}>
                    <VStack spacing={4} align={"stretch"} maxW={'300px'} width={'300px'}>
                        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                            <VStack spacing={4}>
                                <Text fontSize={"28px"} fontWeight={500} color={'red.400'}>
                                    Forget Password
                                </Text>
                                <Input
                                    placeholder='Email'
                                    fontSize={14}
                                    my={5}
                                    type='email'
                                    size={"sm"}
                                    value={inputs.email}
                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                />
                                {error && (
                                    <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                                        <AlertIcon fontSize={12} />
                                        {errorMessage}
                                    </Alert>
                                )}
                                <Button
                                    w={"full"}
                                    colorScheme='blue'
                                    size={"sm"}
                                    fontSize={14}
                                    isLoading={loading}
                                    onClick={() => forgetPass(inputs, setInputs)}
                                >
                                    Send
                                </Button>
                                <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                                    <Box flex={2} h={"1px"} bg={"gray.400"} />
                                    <Text mx={1}>
                                        OR
                                    </Text>
                                    <Box flex={2} h={"1px"} bg={"gray.400"} />
                                </Flex>
                                <Box onClick={handleLogin} color={"blue.500"} cursor={"pointer"}>
                                    {"Log in"}
                                </Box>
                            </VStack>
                        </Box>
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    )
}

export default ForgetPassword

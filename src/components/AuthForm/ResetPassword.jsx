import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useResetPassword from '../../hooks/useResetPassword';

const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
}

const ResetPassword = () => {
    const [inputs, setInputs] = useState({
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, resetPass } = useResetPassword();
    const query = useQuery()

    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"flex-start"} px={4}>
            <Container maxW={"container.md"} padding={0}>
                <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                    <VStack spacing={4} align={"stretch"} maxW={'300px'} width={'300px'}>
                        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                            <VStack spacing={4}>
                                <Text fontSize={"28px"} fontWeight={500} color={'red.400'}>
                                    Reset Password
                                </Text>
                                <InputGroup my={5}>
                                    <Input
                                        placeholder='New Password'
                                        fontSize={14}
                                        type={showPassword ? "text" : "password"}
                                        value={inputs.password}
                                        size={"sm"}
                                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    />
                                    <InputRightElement h='full'>
                                        <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <Button
                                    w={"full"}
                                    colorScheme='blue'
                                    size={"sm"}
                                    fontSize={14}
                                    isLoading={loading}
                                    onClick={() => resetPass(query.get('oobCode'), inputs)}
                                >
                                    Reset password
                                </Button>
                            </VStack>
                        </Box>
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    )
}

export default ResetPassword

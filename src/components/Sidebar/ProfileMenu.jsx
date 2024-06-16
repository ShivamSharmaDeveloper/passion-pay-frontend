import React from 'react';
import { Menu, MenuButton, MenuItem, MenuList, Avatar, Box, IconButton, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon, SettingsIcon } from '@chakra-ui/icons';
import { BiLogOut } from 'react-icons/bi';
import useAuthStore from '../../store/authStore';
import useLogout from '../../hooks/useLogout';

const ProfileMenu = () => {
    const authUser = useAuthStore((state) => state.user);
    const { colorMode, toggleColorMode } = useColorMode();
    const { handleLogout } = useLogout();

    return (
        <Menu>
            <MenuButton as={Button} name='Settings' cursor="pointer" position='absolute' top={5} right={3} bg={"white"} leftIcon={<SettingsIcon />} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }}>Settings</MenuButton>
            <MenuList minW="auto">
                <MenuItem as={RouterLink} to={`/${authUser?.username}`}>
                    <Avatar size={"sm"} src={authUser?.profilePicURL || ""} />
                    <Box ml={2}>Profile</Box>
                </MenuItem>
                {/* <MenuItem onClick={toggleColorMode}>
                    <IconButton
                        aria-label="Toggle theme"
                        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                        size="sm"
                        mr={2}
                    />
                    {colorMode === 'dark' ? 'Light' : 'Dark'}
                </MenuItem> */}
                <MenuItem onClick={handleLogout}>
                    <BiLogOut size={22} />
                    <Box ml={2}>Logout</Box>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ProfileMenu;

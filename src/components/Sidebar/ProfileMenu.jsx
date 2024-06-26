import React, { useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuList, Box, IconButton, Button } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon, SettingsIcon } from '@chakra-ui/icons';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
import useUserProfileStore from '../../store/userProfileStore';

const ProfileMenu = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { handleLogout } = useLogout();
    const setColorMode = useUserProfileStore((state) => state.setColorMode);

    useEffect(() => {
        setColorMode(colorMode);
    }, [toggleColorMode])
    return (
        <Menu>
            <MenuButton as={Button} name='Settings' cursor="pointer" position='absolute' top={5} right={3} bg={colorMode === 'dark' ? "white" : "blue.500"} leftIcon={<SettingsIcon />} color={colorMode === 'dark' ? "black" : "white"} _hover={{ bg: colorMode === 'dark' ? "whiteAlpha.800" : "blue.600" }} size={{ base: "xs", md: "sm" }}>Settings</MenuButton>
            <MenuList minW="auto">
                {/* <MenuItem as={RouterLink} to={`/${authUser?.username}`}>
                    <Avatar size={"sm"} src={authUser?.profilePicURL || ""} />
                    <Box ml={2}>Profile</Box>
                </MenuItem> */}
                <MenuItem onClick={toggleColorMode}>
                    <IconButton
                        aria-label="Toggle theme"
                        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                        size="sm"
                        mr={2}
                    />
                    {colorMode === 'dark' ? 'Light' : 'Dark'}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <BiLogOut size={22} />
                    <Box ml={2}>Logout</Box>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ProfileMenu;

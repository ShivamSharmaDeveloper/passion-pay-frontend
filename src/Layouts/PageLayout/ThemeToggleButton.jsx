import React, { useEffect } from 'react';
import { useColorMode, Button, IconButton, Text } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import useUserProfileStore from '../../store/userProfileStore';

const ThemeToggleButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const setColorMode = useUserProfileStore((state) => state.setColorMode);

    useEffect(() => {
      setColorMode(colorMode);
    }, [toggleColorMode])
    

    return (
        <Button onClick={toggleColorMode} display="flex" alignItems="center" gap={2} _hover={{ bg: isDarkMode ? 'whiteAlpha.200' : '#E2E8F0'}}>
            <IconButton
                aria-label="Toggle theme"
                icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
                size="sm"
            />
            <Text>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
        </Button>
    );
};

export default ThemeToggleButton;

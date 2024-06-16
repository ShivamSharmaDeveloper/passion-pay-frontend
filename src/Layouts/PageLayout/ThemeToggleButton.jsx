import React from 'react';
import { useColorMode, Button, IconButton, Text, Flex } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggleButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

    return (
        <Button onClick={toggleColorMode} display="flex" alignItems="center" gap={2}>
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

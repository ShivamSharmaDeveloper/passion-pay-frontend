import { Box, Button, Flex, Link, Text, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";
import ThemeToggleButton from "../../Layouts/PageLayout/ThemeToggleButton";
import useUserProfileStore from "../../store/userProfileStore";

const Sidebar = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	const isTabletOrBelow = useBreakpointValue({ base: true, md: false });
	const colorMode = useUserProfileStore((state) => state.colorMode);
	return (
		<Box
			// height={"100vh"}
			// borderRight={"1px solid"}
			// borderColor={"whiteAlpha.300"}
			// py={8}
			// position={"sticky"}
			// top={0}
			// left={0}
			// px={{ base: 2, md: 4 }}
			display="flex"
			flexDir={{ base: "row", md: "column" }}
			alignItems="center"
			justifyContent={{ base: "space-around", md: "flex-start" }}
			gap={{ base: 4, md: 10 }}
			position={{ base: "sticky", md: "fixed" }}
			width={{ md: '221px', base: 'full' }}
			// w="full"
			h={{ base: "100%", md: "full" }}
			boxShadow={colorMode === 'dark' ? 'none' : 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}
			py={{ base: 2, md: 8 }}
			px={{ base: 2, md: 4 }}
			bg={colorMode === 'dark' ? "gray.800" : isTabletOrBelow ? "blue.200" : "white.800"}
			borderTop={{ base: "1px solid", md: "none" }}
			borderRight={{ base: "none", md: "1px solid" }}
			borderColor="whiteAlpha.300"
		>
			{/* <Flex direction={"column"} gap={10} w='full' height={"full"}> */}
			<Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor='pointer' textDecoration={'none !important'} textAlign={'center'}>
				{/* <InstagramLogo /> */}
				<Text fontSize={'40px'} fontFamily={'"Satisfy", cursive'}>PassionPay</Text>
				{/* <Image src='/logo.png' h={75} cursor={"pointer"} alt='Instagram' /> */}
			</Link>
			{/* <Link
					to={"/"}
					as={RouterLink}
					p={2}
					display={{ base: "none", md: "none" }}
					borderRadius={6}
					_hover={{
						bg: "whiteAlpha.200",
					}}
					w={10}
					cursor='pointer'
				>
					<InstagramMobileLogo />
				</Link> */}
			{/* <Flex direction={"column"} gap={5} cursor={"pointer"}> */}
			<Flex direction={{ base: "row", md: "column" }} justifyContent={'center'} pl={'5px'} gap={{ md: 5, base: 3 }} cursor={"pointer"} w="full">
				<SidebarItems colorMode={colorMode} />
			</Flex>
			{/* {isTabletOrBelow && <ProfileMenu />} */}
			{!isTabletOrBelow && (
				<Flex flexDir={'column'} mt={{ md: "auto", base: 'none' }} gap={4}>
					<ThemeToggleButton />
					{/* LOGOUT */}
					<Tooltip
						hasArrow
						label={"Logout"}
						placement='right'
						ml={1}
						openDelay={500}
						display={{ base: "none", md: "none" }}
					>
						<Flex
							onClick={handleLogout}
							alignItems={"center"}
							gap={4}
							_hover={{ bg: "whiteAlpha.400" }}
							borderRadius={6}
							p={2}
							w={{ base: 10, md: "full" }}
							display={{ base: 'block', md: "flex" }}
							justifyContent={{ base: "center", md: "flex-start" }}
						>
							<BiLogOut size={25} />
							<Button
								display={{ base: "none", md: "block" }}
								variant={"ghost"}
								_hover={{ bg: "transparent" }}
								isLoading={isLoggingOut}
							>
								Logout
							</Button>
						</Flex>
					</Tooltip>
				</Flex>)}
			{/* </Flex> */}
		</Box>
	);
};

export default Sidebar;

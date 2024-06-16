import { Box, Button, Flex, Image, Link, Text, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants";

import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";
import ThemeToggleButton from "../../Layouts/PageLayout/ThemeToggleButton";
import ProfileMenu from "./ProfileMenu";

const Sidebar = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	const isTabletOrBelow = useBreakpointValue({ base: true, md: false });
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
			py={{ base: 2, md: 8 }}
			px={{ base: 2, md: 4 }}
			bg="gray.800"
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
			<Flex direction={{ base: "row", md: "column" }} justifyContent={'center'} gap={{ md: 5, base: 3 }} cursor={"pointer"} w="full">
				<SidebarItems />
			</Flex>
			{/* {isTabletOrBelow && <ProfileMenu />} */}
			{!isTabletOrBelow && (
				<>
					{/* <ThemeToggleButton /> */}
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
							mt={{ md: "auto", base: 'none' }}
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
				</>)}
			{/* </Flex> */}
		</Box>
	);
};

export default Sidebar;

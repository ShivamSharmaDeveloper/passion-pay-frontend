import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<Container maxW={"container.lg"} my={4}>
			<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
				<Text fontSize={'40px'} fontFamily={'"Satisfy", cursive'}>PassionPay</Text>
				<Flex gap={4}>
					<Link to='/auth'>
						<Button colorScheme={"blue"} size={"sm"}>
							Login
						</Button>
					</Link>
					<Link to='/auth'>
						<Button variant={"outline"} size={"sm"}>
							Signup
						</Button>
					</Link>
				</Flex>
			</Flex>
		</Container>
	);
};

export default Navbar;

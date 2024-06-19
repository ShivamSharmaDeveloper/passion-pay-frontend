import useAuthStore from "../../store/authStore";
import CreatePost from "./CreatePost";
import Home from "./Home";
import Messages from "./Messages";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = ({ colorMode }) => {
	const authUser = useAuthStore((state) => state.user);
	return (
		<>
			<Home colorMode={colorMode} />
			<Search colorMode={colorMode} />
			{/* <Messages colorMode={colorMode} /> */}
			<Notifications authUser={authUser} colorMode={colorMode} />
			<CreatePost colorMode={colorMode} />
			<ProfileLink colorMode={colorMode} />
		</>
	);
};

export default SidebarItems;

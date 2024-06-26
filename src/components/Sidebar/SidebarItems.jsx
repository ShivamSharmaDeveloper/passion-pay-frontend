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
			<CreatePost colorMode={colorMode} />
			{/* <Messages colorMode={colorMode} authUser={authUser} /> */}
			<Notifications authUser={authUser} colorMode={colorMode} />
			<ProfileLink colorMode={colorMode} />
		</>
	);
};

export default SidebarItems;

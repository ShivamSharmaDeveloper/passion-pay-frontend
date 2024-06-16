import useAuthStore from "../../store/authStore";
import CreatePost from "./CreatePost";
import Home from "./Home";
import Messages from "./Messages";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = () => {
	const authUser = useAuthStore((state) => state.user);
	return (
		<>
			<Home />
			<Search />
			{/* <Messages /> */}
			<Notifications authUser={authUser} />
			<CreatePost />
			<ProfileLink />
		</>
	);
};

export default SidebarItems;

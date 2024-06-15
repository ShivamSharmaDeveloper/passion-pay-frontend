import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import MessagesPage from "./pages/MessagePage/MessagePage";
import { getLoginStatus } from "./services/authService";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";

const App = () => {
	const [authUser] = useAuthState(auth);
	// const { isValid, isValidAuth } = useAuthStore((state) => state);

	// useEffect(() => {
	// 	const checkLoginStatus = async () => {
	// 		const status = await getLoginStatus();
	// 		isValid(status?.status);
	// 	};

	// 	if (authUser) {
	// 		checkLoginStatus();
	// 	} else {
	// 		isValid(false);
	// 	}
	// }, [authUser, isValidAuth]);

	return (
		<PageLayout>
			<Routes>
				{/* <Route path='/' element={authUser && isValidAuth ? <HomePage /> : <Navigate to='/auth' />} />
				<Route path='/auth' element={!authUser || !isValidAuth ? <AuthPage /> : <Navigate to='/' />} /> */}
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
				<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
				<Route path='/:username' element={<ProfilePage />} />
				<Route path='/notification' element={<NotificationPage />} />
				<Route path="/direct" element={<MessagesPage />} />
			</Routes>
		</PageLayout>
	);
}

export default App;

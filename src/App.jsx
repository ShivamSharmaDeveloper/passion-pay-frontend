import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import MessageLayout from "./pages/MessagePage/MessageLayout";
import ForgetPassword from "./components/AuthForm/ForgetPassword";
import ResetPassword from "./components/AuthForm/ResetPassword";

const App = () => {
	const [authUser] = useAuthState(auth);

	return (
		<PageLayout>
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
				<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
				<Route path="/forget-password" element={!authUser ? <ForgetPassword /> : <Navigate to='/' />} />
				<Route path="/reset-password" element={!authUser ? <ResetPassword /> : <Navigate to='/' />} />
				<Route path='/:username' element={authUser ? <ProfilePage /> : <Navigate to='/auth' />} />
				<Route path='/notification' element={authUser ? <NotificationPage /> : <Navigate to='/auth' />} />
				{/* <Route path="/direct" element={authUser ? <MessageLayout /> : <Navigate to='/auth' />} /> */}
			</Routes>
		</PageLayout>
	);
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header, Footer } from "./components";
import { About, Community, Home, Socials, Car, Login, Registration, ProfileEdit, Rent } from "./pages";
import { Profile } from "./pages/Profile/Profile";
// import { Home, FullPost, Registration, AddPost, Login } from "./pages";
// import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
	// const dispatch = useDispatch();
	// const isAuth = useSelector(selectIsAuth);

	// React.useEffect(() => {
	//   dispatch(fetchAuthMe());
	// }, []);

	return (
		<>
			<Header></Header>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/About" element={<About />}></Route>
				<Route path="/Community" element={<Community />}></Route>
				<Route path="/socials" element={<Socials />}></Route>
				<Route path="/car" element={<Car />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/registration" element={<Registration />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
				<Route path="/profile/edit" element={<ProfileEdit />}></Route>
				<Route path="/rent" element={<Rent />}></Route>
				{/* <Route path="/posts/:id" element={<FullPost />}></Route>
				<Route path="/posts/:id/edit" element={<AddPost />}></Route>
				<Route path="/add-post" element={<AddPost />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Registration />}></Route> */}
			</Routes>
			<Footer></Footer>
		</>
	);
}

export default App;

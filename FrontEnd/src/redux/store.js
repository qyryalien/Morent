import { configureStore } from "@reduxjs/toolkit";
import carList from "./slices/carList";
import carFullInfo from "./slices/carFullInfo";
import AuthReducer from "./slices/auth";
import RegistrationReducer from "./slices/register";

export default configureStore({
	reducer: {
		carssList: carList,
		carInfo: carFullInfo,
		auth: AuthReducer,
		register: RegistrationReducer,
	},
});

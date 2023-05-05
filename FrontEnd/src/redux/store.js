import { configureStore } from "@reduxjs/toolkit";
import carList from "./slices/carList";
import carFullInfo from "./slices/carFullInfo";

export default configureStore({
	reducer: {
		carssList: carList,
		carInfo: carFullInfo,
	},
});

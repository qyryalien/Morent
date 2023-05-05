import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAllCars = createAsyncThunk("carList/fetchAllCars", async () => {
	const { data } = await axios.get("/api/");
	// проверять код ошибки try{} catch()

	return data;
});

const postsSlice = createSlice({
	name: "carList",
	initialState: {
		listOfCars: [],
		renderList: [],
		currentCarID: 0,
		status: null,
	},
	reducers: {
		setRenderList: (state, action) => {
			state.renderList = action.payload;
		},
		setCurrentCarID: (state, action) => {
			state.currentCarID = action.payload;
		},
	},
	extraReducers: {
		[fetchAllCars.pending]: (state, action) => {
			state.status = "Loading";
		},
		[fetchAllCars.fulfilled]: (state, action) => {
			state.listOfCars = action.payload;
			state.status = "OK";
		},
		[fetchAllCars.rejected]: (state, action) => {
			state.status = action.error;
		},
	},
});
export const { setRenderList, setCurrentCarID } = postsSlice.actions;
export default postsSlice.reducer;

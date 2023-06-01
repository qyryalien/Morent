import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfigs/axiosBaseSettings";

export const fetchProfileData = createAsyncThunk("userInfo/fetchProfileData", async () => {
	{
		// const { data } = await axios.get("/api/profile/");
		// axios
		// 	.get("/api/profile/")
		// 	.then(function (response) {
		// 		console.log("response log", response);
		// 		return response;
		// 	})
		// 	.catch(function (error) {
		// 		console.log("error log", error);
		// 		if (error.response.status === 401) {
		// 			window.localStorage.removeItem("token");
		// 		}
		// 	});
		// return data;
		// {},
		// {
		//     headers: { authorization: `token ${window.localStorage.getItem("token")}` },
		// }
	}
	try {
		const { data } = await axios.get("/api/profile/");
		console.log("response in fetchProfileData get api/profile ", data);
		return data;
	} catch (error) {
		// const response = await axios.post("/api/login/");
		console.log("Errorrrs in catch block fn fetchProfileData", error);
		return 0;
	}
});

export const updateUserProfile = createAsyncThunk("userInfo/updateUserProfile", async (info) => {
	axios
		.patch("http://127.0.0.1:8000/api/profile/", { ...info })
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});

	// try {
	// 	const { data } = await axios.patch("/api/profile/", { ...info });
	// 	console.log("response in patch api/profile ", data);
	// 	return data;
	// } catch (error) {
	// 	// const response = await axios.post("/api/login/");
	// 	console.log("Errorrrs in catch block fn updateUserProfile", error);
	// 	return 0;
	// }
});

export const userGetOrders = createAsyncThunk("userInfo/userGetOrders", async () => {
	try {
		const { data } = await axios.get("/api/profile/orders");
		console.log("response in userGetOrders get api/profile ", data);
		return data;
	} catch (error) {
		// const response = await axios.post("/api/login/");
		console.log("Errorrrs in catch block fn userGetOrders", error);
		return 0;
	}
});

const userProfileData = createSlice({
	name: "userInfo",
	initialState: {
		userInfo: null,
		userOrderList: [],
		status: null,
	},
	extraReducers: {
		[fetchProfileData.pending]: (state, action) => {
			state.status = "loading";
			state.userInfo = null;
		},
		[fetchProfileData.fulfilled]: (state, action) => {
			state.status = "loaded";
			state.userInfo = action.payload;
		},
		[fetchProfileData.rejected]: (state) => {
			state.status = "error";
			state.userInfo = null;
		},
		[userGetOrders.pending]: (state, action) => {
			state.status = "loading";
		},
		[userGetOrders.fulfilled]: (state, action) => {
			state.status = "loaded";
			state.userOrderList = action.payload;
		},
		[userGetOrders.rejected]: (state) => {
			state.status = "error";
			state.userOrderList = null;
		},
	},
});

export default userProfileData.reducer;

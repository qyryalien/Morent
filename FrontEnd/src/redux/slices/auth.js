import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
	const data = await axios.post("/api/login/", params);
	return data;
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		data: null,
		status: "loading",
	},
	extraReducers: {
		[fetchAuth.pending]: (state, action) => {
			state.status = "loading";
			state.data = null;
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.data = action.payload.data;
			state.status = "loaded";
		},
		[fetchAuth.rejected]: (state) => {
			state.data = null;
			state.status = "error";
		},
	},
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export default authSlice.reducer;

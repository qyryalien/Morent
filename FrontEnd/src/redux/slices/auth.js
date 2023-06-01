import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../../axiosConfigs/axiosAuthSettings";
// import axios from "axios";
export async function userIsAuth() {
	// вызывается post запрос на /api/login/ для проверки на 401 ошибку. Если 401 верн false (типо не авторизован)
	// ошибок нет, в трай вернуть true
	try {
		const response = await axios.post(
			"/api/login/",
			{
				username: window.localStorage.getItem("username") || "-",
				password: window.localStorage.getItem("password") || "-",
			},
			{
				headers: { authorization: `token ${window.localStorage.getItem("token")}` },
			}
		);
		return true;
	} catch (error) {
		// const response = await axios.post("/api/login/");
		console.log("Errorrrs in catch block fn userIsAuth");
		return false;
	}
}

export async function login(params) {
	// вызывается post запрос на /api/login/ для проверки на 401 ошибку. Если 401 верн false (типо не авторизован)
	// ошибок нет, в трай вернуть true
	try {
		const response = await axios.post("/api/login/", params);
		return response;
	} catch (error) {
		const response = await axios.post("/api/login/", params);
		return response;
	}
}

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
	try {
		const data = await axios.post("/api/login/", params);
		return data;
	} catch (error) {
		const data = await axios.post("/api/login/", params);
		return data;
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		data: null,
		status: "loading",
		curentAuthSession: null,
	},
	reducers: {},
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

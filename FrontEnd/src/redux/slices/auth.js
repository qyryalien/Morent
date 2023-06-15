import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../../axiosConfigs/axiosAuthSettings";
// import axios from "axios";
export const userIsAuth = createAsyncThunk("auth/userIsAuth", async () => {
	// вызывается post запрос на /api/login/ для проверки на 401 ошибку. Если 401 верн false (типо не авторизован)
	// ошибок нет, в трай вернуть true
	try {
		const response = await axios.post(
			"/api/login/",
			{
				access: window.localStorage.getItem("access"),
			},
			{
				headers: { authorization: `Bearer ${window.localStorage.getItem("access")}` },
			}
		);
		return true;
	} catch (error) {
		// const response = await axios.post("/api/login/");
		console.log("Errorrrs in catch block fn userIsAuth");
		return false;
	}
});

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

// делает авторизацию,
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
	reducers: {
		// tryLogin(state, action) {},
		setCurentAuthSession(state, action) {
			console.log("change Auth session");
			state.curentAuthSession = action.payload;
		},
	},
	extraReducers: {
		[fetchAuth.pending]: (state, action) => {
			state.status = "loading";
			state.data = null;
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.data = action.payload.data;
			state.curentAuthSession = true;
			state.status = "loaded";
		},
		[fetchAuth.rejected]: (state) => {
			state.data = null;
			state.status = "error";
		},

		[userIsAuth.pending]: (state) => {
			state.curentAuthSession = null;
		},
		[userIsAuth.fulfilled]: (state, action) => {
			// console.log("action in userIsAuth.fulfilled auth.js ", action);
			state.curentAuthSession = action.payload;
		},
		[userIsAuth.rejected]: (state) => {
			state.curentAuthSession = null;
		},
	},
});

// export const selectIsAuth = (state) => Boolean();
export const { setCurentAuthSession } = authSlice.actions;
export default authSlice.reducer;

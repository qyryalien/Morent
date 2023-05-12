import axios from "axios";

const instance = axios.create({
	baseURL: "http://127.0.0.1:8000",
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem("token");
	console.log("AXIOS SETTINGS");
	return config;
});

export default instance;

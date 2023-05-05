import axios from "axios";

const instance = axios.create({
	baseURL: "127.0.0.1:8000",
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem("token");
	return config;
});

export default instance;

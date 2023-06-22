import axios from "axios";

const instance = axios.create({
	baseURL: "https://morent-kv7s.onrender.com",
});

instance.interceptors.request.use((config) => {
	if (window.localStorage.getItem("access")) {
		config.headers.Authorization = `Bearer ${window.localStorage.getItem("access")}`;
		// config.headers.Authorization = window.localStorage.getItem("token");
	}
	return config;
});

export default instance;

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

// Automatically attach token to protected routes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Let Axios/browser automatically set the correct
        // Content-Type for FormData requests.
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
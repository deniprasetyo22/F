import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Jika error 401 dan belum mencoba refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // await Store.dispatch(refreshToken()).unwrap();
                // Token baru sudah di-set sebagai cookie oleh server
                return API(originalRequest);
            } catch (refreshError) {
                await Store.dispatch(logout());
                throw refreshError;
            }
        }

        return Promise.reject(error);
    }
);


export default API;

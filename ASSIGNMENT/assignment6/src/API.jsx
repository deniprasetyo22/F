import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Tangani error 401 (Unauthorized)
//         if (error.response && error.response.status === 401) {
//             localStorage.removeItem('user');
//             // Redirect ke halaman login
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshToken();
                return API(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);





export default API;
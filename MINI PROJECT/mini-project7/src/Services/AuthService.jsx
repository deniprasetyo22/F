import API from "../API";


const register = async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
};

const login = async (userData) => {
    const response = await API.post("/auth/login", userData);
    if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = async () => {
    await API.post('/auth/logout');
    localStorage.removeItem('user');
};

const AuthService = {
    register,
    login,
    logout
}

export default AuthService
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../Services/AuthService";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user,
    isLoading: false,
    isSuccess: false,
    isAuthenticated: false,
    isError: false,
    message: ''
};

//Register User
export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            return await AuthService.register(userData);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            return await AuthService.login(userData);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Logout user
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            return await AuthService.logout();
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false; state.isSuccess = false;
            state.isError = false; state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Register cases
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Login cases      
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isAuthenticated = false;
                state.message = action.payload;
                state.user = null;
            })
            // Logout cases
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
    },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;

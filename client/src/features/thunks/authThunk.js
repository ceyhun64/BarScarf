import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, passwordEmail, updatePassword } from "../services/authService";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await login(email, password);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async ({ name, email, password }, thunkAPI) => {
        try {
            const response = await register(name, email, password);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const passwordEmailThunk = createAsyncThunk(
    "auth/emailPassword",
    async ({ email }, thunkAPI) => {
        try {
            const response = await passwordEmail(email);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updatePasswordThunk = createAsyncThunk(
    "auth/updatePassword",
    async ({ token, password, newPassword, againNewPassword }, thunkAPI) => {
        try {
            const response = await updatePassword(token, password, newPassword, againNewPassword);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
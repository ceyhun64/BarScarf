import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getUsers,
    getUserById,
    getUserByName,
    updateUser,
    deleteUser,
} from "../services/userService";

export const getUserByIdThunk = createAsyncThunk(
    "user/createUser",
    async (id) => {
        try {
            const response = await getUserById(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const getUserByNameThunk = createAsyncThunk(
    "user/getUserByName",
    async (name) => {
        try {
            const response = await getUserByName(name);
            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const getUsersThunk = createAsyncThunk(
    "user/getUsers",
    async () => {
        try {
            const response = await getUsers();
            return response.users;
        } catch (error) {
            throw error;
        }
    }
);

export const updateUserThunk = createAsyncThunk(
    "user/updateUser",
    async ({ id, updatedData }) => {
        try {
            const response = await updateUser(id, updatedData);
            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteUserThunk = createAsyncThunk(
    "user/deleteUser",
    async (id) => {
        try {
            const response = await deleteUser(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
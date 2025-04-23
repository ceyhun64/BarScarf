import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyUserDetails, createUserDetails, updateUserDetails, deleteUserDetails, getUserDetailsById } from "../services/userDetailsService";

export const getMyUserDetailsThunk = createAsyncThunk(
    "userDetails/getMyUserDetails",
    async () => {
        const response = await getMyUserDetails();
        return response;
    }
);
export const getUserDetailsByIdThunk = createAsyncThunk(
    "userDetails/getUserDetailsById",
    async (id) => {
        const response = await getUserDetailsById(id);
        return response;
    }
);
export const createUserDetailsThunk = createAsyncThunk(
    "userDetails/createUserDetails",
    async (userDetailsData) => {
        const response = await createUserDetails(userDetailsData);
        return response;
    }
);
export const updateUserDetailsThunk = createAsyncThunk(
    "userDetails/updateUserDetails",
    async (userDetailsData) => {
        const response = await updateUserDetails(userDetailsData);
        return response;
    }
);
export const deleteUserDetailsThunk = createAsyncThunk(
    "userDetails/deleteUserDetails",
    async () => {
        const response = await deleteUserDetails();
        return response;
    }
);
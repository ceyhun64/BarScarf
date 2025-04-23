import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSubscribe, getSubscribers, sendMailToSubscribers } from "../services/subscribeService";

export const createSubscribeThunk = createAsyncThunk(
    "subscribe/createSubscribe",
    async (email, thunkAPI) => {
        try {
            const response = await createSubscribe(email);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getSubscribersThunk = createAsyncThunk(
    "subscribe/getSubscribers",
    async (_, thunkAPI) => {
        try {
            const response = await getSubscribers();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const sendMailToSubscribersThunk = createAsyncThunk(
    "subscribe/sendMailToSubscribers",
    async ({ subject, text }, thunkAPI) => {
        try {
            const response = await sendMailToSubscribers(subject, text);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
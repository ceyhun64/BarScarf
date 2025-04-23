import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyOrders, getMyOrderDetails, createOrder, updateOrder, cancelOrder, getOrderById, getOrderDetails, getOrders } from "../services/orderService";

export const getMyOrdersThunk = createAsyncThunk(
    "order/getMyOrders",
    async (_, thunkAPI) => {
        try {
            const response = await getMyOrders();
            return response.orders;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getMyOrderDetailsThunk = createAsyncThunk(
    "order/getMyOrderDetails",
    async (id, thunkAPI) => {
        try {
            const response = await getMyOrderDetails(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getOrdersThunk = createAsyncThunk(
    "order/getOrders",
    async (_, thunkAPI) => {
        try {
            const response = await getOrders();
            console.log("thunk:", response);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getOrderByIdThunk = createAsyncThunk(
    "order/getOrderById",
    async (id, thunkAPI) => {
        try {
            const response = await getOrderById(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getOrderDetailsThunk = createAsyncThunk(
    "order/getOrderDetails",
    async (id, thunkAPI) => {
        try {

            const response = await getOrderDetails(id);
            console.log("thunk:", response);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createOrderThunk = createAsyncThunk(
    "order/createOrder",
    async (_, thunkAPI) => {
        try {
            const response = await createOrder();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateOrderThunk = createAsyncThunk(
    "order/updateOrder",
    async (id, orderData, thunkAPI) => {
        try {
            const response = await updateOrder(id, orderData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const cancelOrderThunk = createAsyncThunk(
    "order/cancelOrder",
    async (id, thunkAPI) => {
        try {
            const response = await cancelOrder(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
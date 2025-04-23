import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, getProductCart, addProductCart, deleteProductCart, clearCart, updateProductCart } from "../services/cartService";

export const getCartThunk = createAsyncThunk(
    "cart/getCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCart();
            return response.data.cart;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getProductCartThunk = createAsyncThunk(
    "cart/getProductCart",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await getProductCart(productId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addToCartThunk = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, size, quantity }, { rejectWithValue }) => {
        try {
            const response = await addProductCart(productId, size, quantity);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProductCartThunk = createAsyncThunk(
    "cart/deleteProductCart",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await deleteProductCart(productId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const clearCartThunk = createAsyncThunk(
    "cart/clearCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await clearCart();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProductCartThunk = createAsyncThunk(
    "cart/updateProductCart",
    async ({productId, quantity, sizeId }, { rejectWithValue }) => {
        try {
            const response = await updateProductCart(productId, quantity, sizeId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
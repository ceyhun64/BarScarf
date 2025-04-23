import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToFavorites, deleteFavorite, getFavorites } from "../services/favoriteService";

export const addToFavoritesThunk = createAsyncThunk(
    "favorites/addToFavorites",
    async (productId, thunkAPI) => {
        try {
            const response = await addToFavorites(productId);
            return response.data.favorite;//response.data.favorite: {id: 16, userId: 4, productId: 1}

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getFavoritesThunk = createAsyncThunk(
    "favorites/getFavorites",
    async (_, thunkAPI) => {
        try {
            const response = await getFavorites();
            return response.data;//response.data: (4) [{…}, {…}, {…}, {…}]
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


export const deleteFavoriteThunk = createAsyncThunk(
    "favorites/deleteFavorite",
    async (productId, thunkAPI) => {
        try {
            const response = await deleteFavorite(productId);
            return response.data.productId;//response.data.productId: 2
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
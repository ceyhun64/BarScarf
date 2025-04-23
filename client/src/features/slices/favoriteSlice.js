import { createSlice } from "@reduxjs/toolkit";
import { addToFavoritesThunk, deleteFavoriteThunk, getFavoritesThunk } from "../thunks/favoriteThunk";

const initialState = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [], // localStorage'dan favorileri al
    loading: false,
    error: null,
    alert: { message: null, type: null }
};

const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        clearAlert: (state) => {
            state.alert = { message: "", type: "" };
        }
    },
    extraReducers: (builder) => {
        builder
            //addFavorite
            .addCase(addToFavoritesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToFavoritesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites.push(action.payload); //thunktan gelen yanıtı favorites arrayine ekledik
                state.alert = { message: "Favoriye eklendi", type: "success" };
                state.error = null;
                localStorage.setItem('favorites', JSON.stringify(state.favorites));

            })
            .addCase(addToFavoritesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //getFavorites
            .addCase(getFavoritesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFavoritesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
                state.error = null;
            })
            .addCase(getFavoritesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //deleteFavorite
            .addCase(deleteFavoriteThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFavoriteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = state.favorites.filter(fav => fav.productId !== action.payload.productId);
                state.alert = { message: "Favori silindi", type: "danger" };
                state.error = null;
                localStorage.setItem('favorites', JSON.stringify(state.favorites));

            })
            .addCase(deleteFavoriteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})

export const { clearAlert } = favoriteSlice.actions;
export default favoriteSlice.reducer;   
import { createSlice } from "@reduxjs/toolkit";
import {  getSizesThunk } from "../thunks/colorsizeThunk";

const initialState = {
    sizes: [],
    loading: false,
    error: null,
};

const colorsizeSlice = createSlice({
    name: "color-size",
    initialState,
    reducers: {
    
        setSizes: (state, action) => {
            state.sizes = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
           
            .addCase(getSizesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSizesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.sizes = action.payload.sizes;
            })
            .addCase(getSizesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const {  setSizes } = colorsizeSlice.actions;
export default colorsizeSlice.reducer;
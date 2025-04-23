import { createSlice } from "@reduxjs/toolkit";
import { getMyOrdersThunk, getMyOrderDetailsThunk, createOrderThunk, updateOrderThunk, cancelOrderThunk, getOrderByIdThunk, getOrderDetailsThunk, getOrdersThunk } from "../thunks/orderThunk";

const initialState = {
    orders: [],
    order: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
};
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyOrdersThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(getMyOrdersThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(getMyOrderDetailsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyOrderDetailsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(getMyOrderDetailsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })

            .addCase(getOrdersThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrdersThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(getOrdersThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })

            .addCase(getOrderByIdThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(getOrderByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(getOrderDetailsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetailsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(getOrderDetailsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(createOrderThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrderThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(createOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(updateOrderThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(updateOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(cancelOrderThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelOrderThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(cancelOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
    }
})

export default orderSlice.reducer;
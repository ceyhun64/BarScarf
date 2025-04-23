import { createSlice } from "@reduxjs/toolkit";
import { createSubscribeThunk, getSubscribersThunk, sendMailToSubscribersThunk } from "../thunks/subscribeThunk";

const initialState = {
    subscribe: null,
    subscribers: [],
    loading: false,
    error: null,
    alert: {
        message: null,
        type: null
    }
};

const subscribeSlice = createSlice({
    name: "subscribe",
    initialState,
    reducers: {
        clearAlert: (state) => {
            state.alert.message = null;
            state.alert.type = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSubscribeThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubscribeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribe = action.payload;
                state.alert.message = "Abone oldunuz";
                state.alert.type = "success";
            })
            .addCase(createSubscribeThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getSubscribersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubscribersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribers = action.payload;
            })
            .addCase(getSubscribersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(sendMailToSubscribersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMailToSubscribersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribe = action.payload;
            })
            .addCase(sendMailToSubscribersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearAlert } = subscribeSlice.actions;
export default subscribeSlice.reducer;
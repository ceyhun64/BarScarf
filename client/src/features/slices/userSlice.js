import { createSlice } from "@reduxjs/toolkit";
import {
    getUsersThunk,
    getUserByIdThunk,
    getUserByNameThunk,
    updateUserThunk,
    deleteUserThunk,
} from "../thunks/userThunk";

const initialState = {
    users: [],
    user: null,
    loading: false,
    error: null,
    alert: { message: null, type: null },
};

const cartSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearAlert: (state) => {
            state.alert = { message: null, type: null };
        },
    },
    extraReducers: (builder) => {
        builder

            // get users
            .addCase(getUsersThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // get user by id
            .addCase(getUserByIdThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get user by name
            .addCase(getUserByNameThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserByNameThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUserByNameThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // update user
            .addCase(updateUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload;
                const index = state.users.findIndex(
                    (user) => user.id === updatedUser.id
                );
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete user
            .addCase(deleteUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(
                    (user) => user.id !== action.payload
                );
                state.alert = {
                    message: "Kullanıcı başarıyla silindi.",
                    type: "success",
                };
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearAlert } = cartSlice.actions;
export default cartSlice.reducer;

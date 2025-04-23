import { createSlice } from "@reduxjs/toolkit";
import { getMyUserDetailsThunk, createUserDetailsThunk, updateUserDetailsThunk, deleteUserDetailsThunk ,getUserDetailsByIdThunk} from "../thunks/userDetailsThunk";

const initialState = {
    userDetails: null,
    loading: false,
    error: null,
    alert:{message:null, type:null}
};

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        clearAlert: (state) => {
            state.alert = { message: null, type: null };
        }
    },
    extraReducers: (builder) => {
        builder

            // getUserDetailsByIdThunk
            .addCase(getMyUserDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyUserDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
            })
            .addCase(getMyUserDetailsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // createUserDetailsThunk
            .addCase(createUserDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
                state.alert.message = "Kullanıcı detayları başarıyla oluşturuldu.";
                state.alert.type = "success";
            })
            .addCase(createUserDetailsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // updateUserDetailsThunk
            .addCase(updateUserDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
                state.alert.message = "Kullanıcı detayları başarıyla güncellendi.";
                state.alert.type = "warning";
            })
            .addCase(updateUserDetailsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // deleteUserDetailsThunk
            .addCase(deleteUserDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = null;
            })
            .addCase(deleteUserDetailsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getUserDetailsByIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDetailsByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
            })
            .addCase(getUserDetailsByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const { clearAlert } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
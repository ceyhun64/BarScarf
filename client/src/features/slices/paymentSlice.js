import { createSlice } from '@reduxjs/toolkit';
import { createPaymentThunk } from '../thunks/paymentThunk';

const initialState = {
  payment: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
  alert: { message: "", type: "" }
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearAlert: (state) => {
      state.alert = { message: "", type: "" };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaymentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payment = action.payload;
        state.alert.message = "Ödeme başarıyla tamamlandı , anasayfaya yönlendiriliyorsunuz ...";
        state.alert.type = "success"
      })
      .addCase(createPaymentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const {clearAlert} = paymentSlice.actions;
export default paymentSlice.reducer;
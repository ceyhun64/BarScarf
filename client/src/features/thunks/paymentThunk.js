import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPayment } from '../services/paymentService';

export const createPaymentThunk = createAsyncThunk(
  'payment/createPayment',
  async (paymentData, thunkAPI) => {
    try {
      const response = await createPayment(paymentData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);  
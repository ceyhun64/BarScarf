import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendCargo, getToken} from '../services/cargoService';

export const sendCargoThunk = createAsyncThunk(
  'cargo/sendCargo',
  async (cargoData) => {
    try {
      const response = await sendCargo(cargoData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);  
export const getTokenThunk = createAsyncThunk(
  'cargo/getToken',
  async () => {
    try {
      const response = await getToken();
      return response;
    } catch (error) {
      throw error;
    }
  }
);
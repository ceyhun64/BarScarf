import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSizes} from "../services/colorsizeService";



export const getSizesThunk = createAsyncThunk(
    "color-size/getSizes",
    async (_, thunkAPI) => { // Parametre gereksiz olduğu için boş bırakılıyor
        try {
            const response = await getSizes();
            return response.data;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

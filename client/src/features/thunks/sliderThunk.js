import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBanners, getHeroes, getSliders, createBanner, createHeroes, createSlider, deleteBanner, deleteHeroes, deleteSlider } from "../services/sliderService";

export const getBannersThunk = createAsyncThunk(
    "slider/getBanners",
    async (_, thunkAPI) => {
        try {
            const response = await getBanners();
            return response.data.banners;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getHeroesThunk = createAsyncThunk(
    "slider/getHeroes",
    async (_, thunkAPI) => {
        try {
            const response = await getHeroes();
            return response.data.heroes;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getSlidersThunk = createAsyncThunk(
    "slider/getSliders",
    async (_, thunkAPI) => {
        try {
            const response = await getSliders();
            console.log("response.data thunk:", response.data);   
            console.log("response.data.sliders thunk:", response.data.sliders);   
            return response.data.sliders;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createBannerThunk = createAsyncThunk(
    "slider/createBanner",
    async (bannerData, thunkAPI) => {
        console.log("bannerdatathunk:", bannerData);
        try {
            const response = await createBanner(bannerData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createHeroesThunk = createAsyncThunk(
    "slider/createHeroes",
    async (heroesData, thunkAPI) => {
        console.log("heroesdatathunk:", heroesData);
        try {
            const response = await createHeroes(heroesData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const createSliderThunk = createAsyncThunk(
    "slider/createSlider",
    async (sliderData, thunkAPI) => {
        console.log("sliderdatathunk:", sliderData);
        try {
            const response = await createSlider(sliderData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const deleteBannerThunk = createAsyncThunk(
    "slider/deleteBanner",
    async (bannerId, thunkAPI) => {
        try {
            const response = await deleteBanner(bannerId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const deleteHeroesThunk = createAsyncThunk(
    "slider/deleteHeroes",
    async (heroesId, thunkAPI) => {
        try {
            const response = await deleteHeroes(heroesId);
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const deleteSliderThunk = createAsyncThunk(
    "slider/deleteSlider",
    async (sliderId, thunkAPI) => {
        try {
            const response = await deleteSlider(sliderId);
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
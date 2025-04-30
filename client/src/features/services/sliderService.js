import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_URL = `${import.meta.env.VITE_API_URL}/slider`;

export const getSliders = async () => {
    try {
        const res = await axios.get(API_URL);
        return res;
    } catch (error) {
        console.error("Slider verisi çekilemedi: ", error);
        throw error;
    }
};
export const getBanners = async () => {
    try {
        const res = await axios.get(`${API_URL}/banner`);
        return res;
    } catch (error) {
        console.error("Banner verisi çekilemedi: ", error);
        throw error;
    }
};
export const getHeroes = async () => {
    try {
        const res = await axios.get(`${API_URL}/heroes`);
        return res;
    } catch (error) {
        console.error("Heroes verisi çekilemedi: ", error);
        throw error;
    }
};
//admin
export const createSlider = async (sliderData) => {
    try {
        const res = await axiosInstance.post("/slider", sliderData);
        return res;
    } catch (error) {
        console.error("Slider oluşturulurken hata oluştu:", error);
    }
}

export const deleteSlider = async (sliderId) => {
    try {
        const res = await axiosInstance.delete(`/slider/${sliderId}`);
        return res;
    } catch (error) {
        console.error("Slider silinirken hata oluştu:", error);
    }
}
export const createBanner = async (bannerData) => {
    try {
        console.log("bannerDataservice:", bannerData);
        const res = await axiosInstance.post("/slider/banner", bannerData);

        console.log("createbanner service res", res);
        return res;
    } catch (error) {
        console.error("Banner oluşturulurken hata oluştu:", error);
    }
}
export const deleteBanner = async (bannerId) => {
    try {
        const res = await axiosInstance.delete(`/slider/banner/${bannerId}`);
        return res;
    } catch (error) {
        console.error("Banner silinirken hata oluştu:", error);
    }
}
export const createHeroes = async (heroesData) => {
    try {
        const res = await axiosInstance.post("/slider/heroes", heroesData);
        return res;
    } catch (error) {
        console.error("Heroes oluşturulurken hata oluştu:", error);
    }
}
export const deleteHeroes = async (heroesId) => {
    try {
        const res = await axiosInstance.delete(`/slider/heroes/${heroesId}`);
        return res;
    } catch (error) {
        console.error("Heroes silinirken hata oluştu:", error);
    }
}

import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = `http://127.0.0.1:3000/api/subscribe`;

export const createSubscribe = async (email) => {
    try {
        const res = await axios.post(API_URL, { email });
        return res;
    } catch (error) {
        console.error("Abone olamadınız: ", error);
        throw error;
    }
};

export const getSubscribers = async () => {
    try {
        const res = await axiosInstance.get(`/subscribe`);
        return res;
    } catch (error) {
        console.error("Aboneleri çekerken hata oluştu: ", error);
        throw error;
    }
};

export const sendMailToSubscribers = async (subject, text) => {
    try {
        const res = await axiosInstance.post(`/subscribe/send-mail`, { subject, text });
        return res;
    } catch (error) {
        console.error("Aboneleri mail atarken hata oluştu: ", error);
        throw error;
    }
};
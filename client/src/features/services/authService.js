import axios from 'axios';
import axiosInstance from './axiosInstance';


const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

//login api isteği
export const login = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/login`, { email, password });//email ve password alıyoruz kullanıcıdan
        return res; // Başarılı yanıtı döndürüyoruz
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error.response?.data?.message || 'Bir hata oluştu';
    }
};

export const logout = async () => {
    try {
        const res = await axiosInstance.post("/auth/logout");
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error.response?.data?.message || 'Bir hata oluştu';
    }
    
};

//register api isteği
export const register = async (name, email, password) => {
    try {
        const res = await axios.post(`${API_URL}/register`, { name, email, password });
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error.response?.data?.message || 'Bir hata oluştu';
    }
};

//password güncellemek için mail gönderme api isteği
export const passwordEmail = async (email) => {
    try {
        const res = await axios.post(`${API_URL}/password-email`, { email });
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error.response?.data?.message || 'Bir hata oluştu';
    }
};

//password güncelleme api isteği
export const updatePassword = async (token, password, newPassword, againNewPassword) => {
    try {
        const res = await axios.put(`${API_URL}/update-password/${token}`, { password, newPassword, againNewPassword });
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error.response?.data?.message || 'Bir hata oluştu';
    }
}
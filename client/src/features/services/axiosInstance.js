// src/api/axiosInstance.js
import axios from 'axios';

const API_URL = "http://127.0.0.1:3000/api"; // API URL'inizi burada ayarlayın

const axiosInstance = axios.create({
    baseURL: API_URL,//baseUrl belirliyoruz
});

axiosInstance.interceptors.request.use(// İstek öncesi token'ı header'a ekliyoruz
    (config) => {//config isteğinin özelliklerini içerir
        const token = localStorage.getItem('token');// Token'ı localStorage'dan alıyoruz loginde localStorage a kaydetmiştik
        if (token) {//token varsa
            config.headers['x-auth-token'] = token; // Token'ı header'a ekliyoruz
        }
        return config;//config'ı döndürüyoruz
    },
    (error) => {
        return Promise.reject(error);// Hata durumunda hata döndürüyoruz prom
    }
);

export default axiosInstance;// axiosInstance'ı export ediyoruz

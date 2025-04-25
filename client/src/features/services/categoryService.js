import axios from 'axios';
import axiosInstance from './axiosInstance';
const API_URL = `${import.meta.env.production.VITE_API_URL}/category`;

export const getCategories = async () => {
    try {
        const res = await axios.get(API_URL);
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
};

export const getAllSubCategories = async () => {
    try {
        const res = await axios.get(`${API_URL}/sub`);
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const getPopCategories = async () => {
    try {
        const res = await axiosInstance.get(`category/pop`);
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const getCategoryById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}


//admin
export const createCategory = async (categoryData) => {
    try {
        const res = await axiosInstance.post("/category", { categoryData });
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const updateCategory = async (id, name) => {
    try {
        const res = await axiosInstance.put(`/category/${id}`, { name });
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const updatePopCategory = async (id, isPopular) => {
    try {
        const res = await axiosInstance.put(`/category/pop/${id}`, { isPopular });
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const deleteCategory = async (id) => {
    try {
        const res = await axiosInstance.delete(`/category/${id}`);
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const getSubCateory = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/sub/${id}`);
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const createSubCategory = async (categoryData) => {
    try {
        const res = await axiosInstance.post("/category/sub", { categoryData });
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const updateSubCategory = async (id, name) => {
    try {
        const res = await axiosInstance.put(`/category/sub/${id}`, { name });
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}
export const deleteSubCategory = async (id) => {
    try {
        const res = await axiosInstance.delete(`/category/sub/${id}`);
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}
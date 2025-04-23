import axiosInstance from './axiosInstance';

export const getCart = async () => {
    try {
        const res = await axiosInstance.get("/cart");
        return res;
    } catch (error) {
        // Hata durumunda backend'den gelen mesajı alıyoruz
        throw error.response?.data?.message || 'Bir hata oluştu';
    }
}

export const getProductCart = async (productId) => {
    try {
        const res = await axiosInstance.get(`/cart/${productId}`);
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const addProductCart = async (productId, size, quantity) => {
    try {
        const res = await axiosInstance.post("/cart/add", { productId, size, quantity });
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const deleteProductCart = async (productId) => {
    try {
        const res = await axiosInstance.delete(`/cart/${productId}`);
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const clearCart = async () => {
    try {
        const res = await axiosInstance.delete("/cart/clear");
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}

export const updateProductCart = async (productId, quantity, sizeId) => {
    try {
        const res = await axiosInstance.put(`/cart/update/${productId}`, { quantity, sizeId });
        return res;
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        throw error;
    }
}
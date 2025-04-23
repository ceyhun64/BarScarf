import axiosInstance from './axiosInstance';

export const getFavorites = async () => {
    try {
        const res = await axiosInstance.get("/favorite");
        return res;
    } catch (error) {
        console.error('Error getting favorites:', error);
        throw error;
    }
}

export const addToFavorites = async (productId) => {
    try {
        console.log('favoriteservice productId:', productId);
        const res = await axiosInstance.post("/favorite", { productId: productId });
        console.log('favoriteservice res:', res);
        return res;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error;
    }
};

export const deleteFavorite = async (productId) => {
    try {
        const res = await axiosInstance.delete(`/favorite/${productId}`);
        return res;
    } catch (error) {
        console.error('Error deleting favorite:', error);
        throw error;
    }
};
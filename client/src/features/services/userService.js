import axiosInstance from "./axiosInstance";

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get("/user");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserByName = async (name) => {
    try {
        const response = await axiosInstance.get(`/user/name/${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, updatedData) => {
    try {
        const response = await axiosInstance.put(`/user/${id}`, updatedData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`/user/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
import axiosInstance from "./axiosInstance";

export const getMyUserDetails = async () => {
    try {
        const response = await axiosInstance.get(`/user-details/user`);
        console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserDetailsById = async (id) => {
    try {
        const response = await axiosInstance.get(`/user-details/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createUserDetails = async (userDetailsData) => {
    try {
        const response = await axiosInstance.post("/user-details", userDetailsData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserDetails = async (userDetailsData) => {
    try {
        const response = await axiosInstance.put(`/user-details`, userDetailsData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUserDetails = async () => {
    try {
        const response = await axiosInstance.delete(`/user-details`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

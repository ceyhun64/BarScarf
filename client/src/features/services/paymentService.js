import axiosInstance from "./axiosInstance";

export const createPayment = async (paymentData) => {
    const response = await axiosInstance.post('/payment', paymentData);
    return response.data;
};

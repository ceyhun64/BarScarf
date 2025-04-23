import axiosInstance from "./axiosInstance";

// Kullanıcının kendi siparişlerini almak
export const getMyOrders = async () => {
  try {
    const response = await axiosInstance.get("/order/my-orders");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Kullanıcının kendi sipariş detayını almak
export const getMyOrderDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/order/my-orders/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Sipariş oluşturma (Admin olmayan kullanıcılar için)
export const createOrder = async () => {
  try {
    const response = await axiosInstance.post('/order'); // Admin gerekmiyor
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get("/order"); // Admin gerekmiyor
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/order/details/${id}`); // Admin gerekmiyor
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/order/${id}`); // Admin gerekmiyor
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Sipariş güncelleme (Admin olmayan kullanıcılar için)
export const updateOrder = async (id, orderData) => {
  try {
    const response = await axiosInstance.put(`/order/${id}`, orderData); // Admin gerekmiyor
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Sipariş iptal etme (Admin olmayan kullanıcılar için)
export const cancelOrder = async (id) => {
  try {
    const response = await axiosInstance.put(`/order/${id}/cancel`); // Admin gerekmiyor
    return response.data;
  } catch (error) {
    throw error;
  }
};

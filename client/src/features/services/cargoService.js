import axiosInstance from './axiosInstance';

export const sendCargo = async (cargoData) => {
  try {
    const response = await axiosInstance.post(`/cargo/send`, cargoData);
    return response.data;
  } catch (error) {
    console.error('Kargo gönderimi başarısız:', error);
    throw error;
  }
};

export const getToken = async () => {
  try {
    const response = await axiosInstance.post('/cargo/token');
    return response.data;
  } catch (error) {
    console.error('Token alınamadı:', error);
    throw error;
  }
};


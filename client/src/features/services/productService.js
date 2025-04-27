import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_URL = `${import.meta.env.VITE_API_PRODUCTION_URL}/product`;

export const getProducts = async () => {
  try {
    const res = await axios.get(API_URL);// API'den veri çekmek için axios kullanıyoruz
    return res;// API'den gelen veriyi döndürüyoruz
  } catch (error) {
    console.error("API'den veri çekerken hata oluştu:", error);
    return []; // Hata durumunda boş array döndürerek sayfanın çökmesini önleyelim
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);// API'den veri çekmek için axios kullanıyoruz
    return res;// API'den gelen veriyi döndürüyoruz
  } catch (error) {
    console.error("Ürün verisi çekilemedi: ", error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const res = await axios.get(`${API_URL}/category/${categoryId}`);
    return res;
  } catch (error) {
    console.error("Ürün verisi çekilemedi: ", error);  // Burada hata mesajını alırsınız
    throw error;
  }
};

export const getProductsBySubcategory = async (subCategoryId) => {
  try {
    const res = await axios.get(`${API_URL}/sub/${subCategoryId}`);
    return res;
  } catch (error) {
    console.error("Ürün verisi çekilemedi: ", error);
    throw error;
  }
};


export const getProductsBySize = async (sizeId) => {
  try {
    const res = await axios.get(`${API_URL}/size/${sizeId}`);
    return res;
  } catch (error) {
    console.error("Ürün verisi çekilemedi: ", error);
    throw error;
  }
};

export const getProductsByName = async (name) => {
  try {
    const res = await axios.get(`${API_URL}/name/${name}`)
    return res
  } catch (error) {
    console.error("Ürün verisi çekilemedi: ", error);
    throw error;
  }
}

export const getProductsByColor = async (color) => {
  try {
    const res = await axios.get(`${API_URL}/color/${color}`)
    return res
  } catch (error) {
    console.error("Ürün verisi çekilemedi: ", error);
    throw error;
  }
}


//admin
export const createProduct = async (productData) => {
  try {
    const res = await axiosInstance.post("/product", productData);
    return res;
  } catch (error) {
    console.error("Ürün oluşturulurken hata oluştu:", error);
  }
}

export const updateProduct = async (productId, productData) => {
  try {

    const res = await axiosInstance.put(`/product/${productId}`, productData);
    return res;
  } catch (error) {
    console.error("Ürün güncellenirken hata oluştu:", error);
  }
}

export const deleteProduct = async (productId) => {
  try {
    const res = await axiosInstance.delete(`/product/${productId}`);
    return res;
  } catch (error) {
    console.error("Ürün silinirken hata oluştu:", error);
  }
}







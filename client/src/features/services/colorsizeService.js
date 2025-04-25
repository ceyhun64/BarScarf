import axios from "axios";

const API_URL = `${import.meta.env.production.VITE_API_URL}/color-size`;

export const getSizes = async () => {
    try {
        const res = await axios.get(`${API_URL}/sizes`);// API'den veri çekmek için axios kullanıyoruz
        return res;// API'den gelen veriyi döndürüyoruz
    } catch (error) {
        console.error("API'den veri çekerken hata oluştu:", error);
        return []; // Hata durumunda boş array döndürerek sayfanın çökmesini önleyelim
    }
};



const Size = require("../models/size");

exports.get_sizes = async (req, res) => {
    try {
        const sizes = await Size.findAll(); // Kategorileri buluyoruz
        if (!sizes || sizes.length === 0) {
            return res.status(404).json({ message: "Beden bulunamadı" }); // Kategori yoksa 404 döndür
        }
        res.json({ message: "Renkler başarıyla çekildi.", sizes }); 
    } catch (error) {
        console.error("Beden verisi alınırken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası, kategori verileri alınamadı", error: error.message });
    }
};


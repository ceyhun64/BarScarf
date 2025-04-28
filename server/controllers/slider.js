const Slider = require("../models/slider");

exports.create_slider = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Tek bir resim alıyoruz
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;  // Eğer dosya varsa, resim yolunu al

        if (!imageUrl) {
            return res.status(400).json({ error: "Resim dosyası gereklidir." });  // Eğer resim yoksa hata döndür
        }

        // Yeni slider'ı oluşturuyoruz
        const slider = await Slider.create({
            title,
            description,
            imageUrl  // Resim yolunu veritabanına kaydediyoruz
        });

        // Başarı durumu
        res.status(200).json({ message: "Slider başarıyla oluşturuldu!", slider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Slider oluşturulurken hata oluştu." });
    }
};

exports.get_slider = async (req, res) => {
    try {
        // Tüm slider'ları çekiyoruz
        const sliders = await Slider.findAll();
        res.status(200).json({ sliders });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Slider'lar çekilirken hata oluştu." });
    }
}


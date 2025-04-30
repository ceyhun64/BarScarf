const Slider = require("../models/slider");
const Banner = require("../models/banner");
const Heroes = require("../models/heroes");
const fs = require('fs');
const path = require('path');  //

exports.add_slider = async (req, res) => {
    try {
        const { title, description } = req.body;
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        if (!title || !description || images.length === 0) {
            return res.status(400).json({ error: "Lütfen tüm alanları doldurun." });
        }

        // Slider için birden fazla resim kaydediyorsanız, birden fazla imageUrl ekleyebilirsiniz
        const slider = await Slider.create({
            title,
            description,
            imageUrl: images.join(", ")  // Resimleri virgülle ayırarak birleştirebilirsiniz
        });

        res.status(201).json(slider);  // Başarıyla eklenen slider'ı döndür
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Slider eklenirken hata oluştu." });
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

exports.delete_slider = async (req, res) => {
    try {
        const slider = await Slider.findByPk(req.params.id);

        if (!slider) {
            return res.status(404).json({ error: "Slider bulunamadı." });
        }

        // Resim dosyasını silme işlemi
        if (slider.imageUrl) {
            const imagePath = path.join(__dirname, '..', 'uploads', slider.imageUrl.split('/').pop());
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Resim dosyası silinirken hata oluştu:', err);
                } else {
                    console.log('Resim dosyası başarıyla silindi:', imagePath);
                }
            });
        }

        // Slider'ı veritabanından silme
        await slider.destroy();

        res.json({ message: "Slider başarıyla silindi." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Slider silinirken hata oluştu." });
    }
};

exports.add_banner = async (req, res) => {
    try {
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        if (images.length === 0) {
            return res.status(400).json({ error: "Lütfen tüm alanları doldurun." });
        }
        // Slider için birden fazla resim kaydediyorsanız, birden fazla imageUrl ekleyebilirsiniz
        const banner = await Banner.create({ imageUrl: images.join(", ") });

        res.status(201).json(banner);  // Başarıyla eklenen slider'ı döndür
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "banner eklenirken hata oluştu." });
    }
}

exports.get_banner = async (req, res) => {
    try {
        const banners = await Banner.findAll();
        res.status(200).json({ banners });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Banner'lar çekilirken hata oluştu." });
    }
}

exports.delete_banner = async (req, res) => {
    try {
        const banner = await Banner.findByPk(req.params.id);
        if (!banner) {
            return res.status(404).json({ error: "Banner bulunamadı." });
        }
        // Resim dosyasını silme işlemi
        if (banner.imageUrl) {
            const imagePath = path.join(__dirname, '..', 'uploads', banner.imageUrl.split('/').pop());
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Resim dosyası silinirken hata oluştu:', err);
                } else {
                    console.log('Resim dosyası başarıyla silindi:', imagePath);
                }

            })
            await banner.destroy();
            res.json({ message: "Banner başarıyla silindi." });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Banner silinirken hata oluştu." });
    }
}

exports.add_heroes = async (req, res) => {
    try {
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        if (images.length === 0) {
            return res.status(400).json({ error: "Lütfen tüm alanları doldurun." });
        }
        // Slider için birden fazla resim kaydediyorsanız, birden fazla imageUrl ekleyebilirsiniz
        const heroes = await Heroes.create({ imageUrl: images.join(", ") });

        res.status(201).json(heroes);  // Başarıyla eklenen slider'ı döndür
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "heroes eklenirken hata oluştu." });
    }
}

exports.get_heroes = async (req, res) => {
    try {
        const heroes = await Heroes.findAll();
        res.status(200).json({ heroes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "heroes çekilirken hata oluştu." });
    }
}

exports.delete_heroes = async (req, res) => {
    try {
        const heroes = await Heroes.findByPk(req.params.id);
        if (!heroes) {
            return res.status(404).json({ error: "heroes bulunamadı." });
        }
        // Resim dosyasını silme işlemi
        if (heroes.imageUrl) {
            const imagePath = path.join(__dirname, '..', 'uploads', heroes.imageUrl.split('/').pop());
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Resim dosyası silinirken hata oluştu:', err);
                } else {
                    console.log('Resim dosyası başarıyla silindi:', imagePath);
                }

            })
            await heroes.destroy();
            res.json({ message: "heroes başarıyla silindi." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "heroes silinirken hata oluştu." });
    }
}
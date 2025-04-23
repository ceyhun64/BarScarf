const Category = require("../models/category");
const SubCategory = require("../models/subCategory");

// Kategori listeleme
exports.get_category = async (req, res) => {
    try {
        const categories = await Category.findAll(); // Kategorileri buluyoruz
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "Kategori bulunamadı" }); // Kategori yoksa 404 döndür
        }
        res.json({ message: "Kategoriler başarıyla çekildi.", categories });
    } catch (error) {
        console.error("Kategori verisi alınırken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası, kategori verileri alınamadı", error: error.message });
    }
};

// Idye göre kategori listeleme
exports.get_category_by_id = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id); // ID'ye göre kategoriyi bul
        if (!category) {
            return res.status(404).json({ message: "Kategori bulunamadı" });
        }
        res.status(200).json({ message: "Kategori getirildi", category });
    } catch (error) {
        console.error("Kategori verisi alınırken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }
};

// Kategori oluşturma
exports.create_category = async (req, res) => {
    const { categoryData } = req.body;
    const { name } = categoryData;

    try {

        const existingCategory = await Category.findOne({ where: { name } });

        if (existingCategory) {
            return res.status(400).json({ message: "Bu kategori zaten mevcut!" });
        }

        // Create the new category
        const category = await Category.create({ name });

        res.status(201).json({ message: "Kategori başarıyla oluşturuldu", category });
    } catch (err) {
        console.error("Kategori oluşturulurken hata oluştu:", err);
        res.status(500).json({ message: "Sunucu hatası", error: err.message || "Bilinmeyen bir hata oluştu" });
    }
};

// Kategori güncelleme
exports.update_category = async (req, res) => {
    const { name } = req.body;
    try {
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Kategori bulunamadı!" });
        }
        await category.update({ name });
        res.status(200).json({ message: "Kategori başarıyla güncellendi", category });
    } catch (err) {
        console.error("Kategori güncellenirken hata oluştu:", err);
        res.status(500).json({ message: "Sunucu hatası", error: err.message || "Bilinmeyen bir hata oluştu" });
    }
};

// Kategori silme
exports.delete_category = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Kategori bulunamadı!" });
        }
        await category.destroy();
        res.status(200).json({ message: "Kategori başarıyla silindi", category });
    } catch (err) {
        console.error("Kategori silinirken hata oluştu:", err);
        res.status(500).json({ message: "Sunucu hatası", error: err.message || "Bilinmeyen bir hata oluştu" });
    }
};

// Tüm alt kategorileri listeleme
exports.get_all_sub_categories = async (req, res) => {
    try {
        const subCategories = await SubCategory.findAll({
            include: {
                model: Category,
                attributes: ['id', 'name']  // Kategoriye ait sadece id ve name bilgileri
            }
        });

        if (!subCategories || subCategories.length === 0) {
            return res.status(404).json({ message: "Alt kategori bulunamadı" });
        }

        res.json({
            message: "Alt kategoriler başarıyla çekildi.",
            subCategories
        });
    } catch (error) {
        console.error("Alt kategori verisi alınırken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }
};

/// Alt kategori listeleme(üst kategoriye göre)
exports.get_sub_category = async (req, res) => {
    try {
        const subCategories = await SubCategory.findAll({ where: { categoryId: req.params.id } });
        if (!subCategories || subCategories.length === 0) {
            return res.status(404).json({ message: "Alt kategori bulunamadı" });
        }
        res.json({ message: "Alt kategoriler başarıyla çekildi.", subCategories });

    } catch (error) {
        console.error("Alt kategori verisi alınırken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası, alt kategori verileri alınamadı", error: error.message });
    }
}

// Alt kategori oluşturma
exports.create_sub_category = async (req, res) => {
    try {
        const name = req.body.categoryData.name;
        const categoryId = req.body.categoryData.categoryId;
        const existingSubCategory = await SubCategory.findOne({ where: { name, categoryId: categoryId } });
        if (existingSubCategory) {
            return res.status(400).json({ message: "Bu alt kategori zaten mevcut!" });
        }
        const subCategory = await SubCategory.create({ name, categoryId });
        res.status(201).json({ message: "Alt kategori başarıyla oluşturuldu", subCategory });
    } catch (error) {
        console.error("Alt kategori oluşturulurken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message || "Bilinmeyen bir hata oluştu" });

    }
}

// Alt kategori güncelleme
exports.update_sub_category = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const subCategory = await SubCategory.findByPk(id);
        if (!subCategory) {
            return res.status(404).json({ message: "Alt kategori bulunamadı!" });
        }
        await subCategory.update({ name });
        res.status(200).json({ message: "Alt kategori başarıyla güncellendi", subCategory });

    } catch (error) {
        console.error("Alt kategori güncellenirken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message || "Bilinmeyen bir hata oluştu" });

    }
}

// Alt kategori silme
exports.delete_sub_category = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findByPk(id);
        if (!subCategory) {
            return res.status(404).json({ message: "Alt kategori bulunamadı!" });

        }
        await subCategory.destroy();
        res.status(200).json({ message: "Alt kategori başarıyla silindi", subCategory });
    }
    catch (error) {
        console.error("Alt kategori silinirken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message || "Bilinmeyen bir hata oluştu" });
    }
}

// Popüler alt kategorileri listeleme
exports.get_popular_sub_categories = async (req, res) => {
    try {
        const subCategories = await SubCategory.findAll({
            where: { isPopular: true },
            include: {
                model: Category,
                attributes: ['id', 'name']
            }
        });
        if (!subCategories || subCategories.length === 0) {
            return res.status(404).json({ message: "Popüler alt kategori bulunamadı" });
        }
        res.json({
            message: "Popüler alt kategoriler başarıyla çekildi.",
            subCategories
        });
    }
    catch (error) {
        console.error("Popüler alt kategori verisi alınırken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }
}

//popüler kategori güncelleme
exports.update_popular_sub_category = async (req, res) => {
    try {
        const { isPopular } = req.body;
        const { id } = req.params;
        const subCategory = await SubCategory.findByPk(id);
        if (!subCategory) {
            return res.status(404).json({ message: "Alt kategori bulunamadı!" });
        }
        await subCategory.update({ isPopular });
        res.status(200).json({ message: "Alt kategori popülerliği başarıyla güncellendi", subCategory });
    } catch (error) {
        console.error("Alt kategori popülerliği güncellenirken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message || "Bilinmeyen bir hata oluştu" });
    }
}
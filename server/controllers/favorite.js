const Favorite = require("../models/favorite");
const Product = require("../models/product");
const ProductImage = require("../models/productImage");

// Favori ekleme
exports.add_favorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.body.productId;
        // Ürünün mevcut olup olmadığını kontrol et
        const productExists = await Product.findByPk(productId);
        if (!productExists) {
            return res.status(404).json({ error: "Ürün bulunamadı." });
        }
        // Kullanıcının zaten bu ürünü favorilere ekleyip eklemediğini kontrol et
        const existingFavorite = await Favorite.findOne({
            where: {
                userId,
                productId
            }
        });
        if (existingFavorite) {
            return res.status(400).json({ error: "Bu ürün zaten favorilere eklenmiş." });
        }
        // Yeni favoriyi oluştur
        const favorite = await Favorite.create({ userId, productId });

        // Favori başarıyla eklendi
        res.status(201).json({ message: "favoriye eklendi ", favorite });
    } catch (error) {
        console.error("Favori eklerken hata:", error);
        res.status(500).json({ error: "Sunucu hatası, lütfen tekrar deneyin!" });
    }
}

// Favorileri listeleme
exports.get_favorites = async (req, res) => {
    try {
        const userId = req.user.id;
        // Kullanıcının favorilerini al, Product detaylarıyla birlikte
        const favorites = await Favorite.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: Product,
                    as: "product",  // Burada 'product' aynı 'as' ismini kullanıyoruz.
                    attributes: ["id", "name", "price"],
                    include: [
                        {
                            model: ProductImage,
                            as: "images",  // 'images' 'Product' ile ilişkili 'productimages'
                            attributes: ["imageUrl"]
                        }
                    ]
                }
            ]
        });

        // Eğer favoriler bulunamazsa
        if (favorites.length === 0) {
            return res.status(404).json({ message: "Favori bulunamadı." });
        }

        res.json(favorites);
    } catch (error) {
        console.error("Favoriler alınırken hata:", error);
        res.status(500).json({ error: "Sunucu hatası, lütfen tekrar deneyin!" });
    }
};


// Favori silme
exports.delete_favorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        const favorite = await Favorite.findOne({
            where: { productId, userId }
        });

        if (!favorite) {
            console.log("Favori bulunamadı!");
            return res.status(404).json({ error: "Favori bulunamadı veya silme izniniz yok." });
        }

        await favorite.destroy();
        console.log("Favori başarıyla silindi!");
        res.status(200).json({ message: "Ürün favorilerinizden kaldırıldı.", productId });
    } catch (error) {
        console.error("Favori silinirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası, lütfen tekrar deneyin!" });
    }
};


const fs = require("fs");
const path = require('path');  // path modülünü içe aktar
const { Op } = require("sequelize");
const Product = require("../models/product");
const Size = require("../models/size");
const Favorite = require("../models/favorite");
const CartProduct = require("../models/cartProduct");
const ProductImage = require("../models/productImage");
const OrderProduct = require("../models/orderProduct");
const ProductCategory = require("../models/productCategory");
const ProductSubCategory = require("../models/productSubCategory");
const SubCategory = require("../models/subCategory");
const Review = require("../models/review");
const Category = require("../models/category");
const ProductSize = require("../models/productSize");

exports.get_product = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: ProductImage,
                    as: 'images',
                    attributes: ["imageUrl"],
                },

            ],
        });
        if (!products.length) {
            return res.status(404).json({ message: "Ürün bulunamadı", products: [] });
        }

        // Her ürün için mainImage ve renk bilgilerini ekliyoruz
        const formattedProducts = products.map(product => {
            const productJSON = product.toJSON();

            // Ürün görseli
            const mainImage = productJSON.images?.[0]?.imageUrl || null;
            return {
                ...productJSON,
                mainImage,
            };
        });

        res.json({ message: "Ürünler başarıyla çekildi.", products: formattedProducts });

    } catch (error) {
        console.error("Ürünleri çekerken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin." });
    }
};

// Ürün listeleme (kategoriye göre)
exports.get_product_by_category = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // Category üzerinden ilişkili ürünleri çekiyoruz
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    where: { id: categoryId }, // Kategori id'sine göre filtreleme yapıyoruz
                    through: { attributes: [] }, // İlişkili ProductCategory tablosunu dahil ediyoruz
                },
                {
                    model: ProductImage,
                    as: 'images', // images alias'ı kullanıyoruz
                    attributes: ["imageUrl"], // Sadece 'imageUrl' alanını çekiyoruz
                }
            ]
        });

        // Eğer kategoriye ait ürün yoksa boş bir liste döndürüyoruz
        if (!products.length) {
            return res.status(404).json({ error: "Bu kategoride ürün bulunamadı" });
        }

        // Eşleşen ürünleri döndürüyoruz
        res.json({ message: "Ürünler başarıyla çekildi.", products });
    } catch (error) {
        console.error("Hata oluştu:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
}

// Ürün listeleme(alt kategoriye göre)
exports.get_product_by_subcategory = async (req, res) => {
    try {
        const subCategoryId = req.params.subCategoryId;

        // Category üzerinden ilişkili ürünleri çekiyoruz
        const products = await Product.findAll({
            include: [
                {
                    model: SubCategory,
                    where: { id: subCategoryId }, // Kategori id'sine göre filtreleme yapıyoruz
                    through: { attributes: [] }, // İlişkili ProductCategory tablosunu dahil ediyoruz
                },
                {
                    model: ProductImage,
                    as: 'images', // images alias'ı kullanıyoruz
                    attributes: ["imageUrl"], // Sadece 'imageUrl' alanını çekiyoruz
                }
            ]
        });

        // Eğer kategoriye ait ürün yoksa boş bir liste döndürüyoruz
        if (!products.length) {
            return res.status(404).json({ error: "Bu kategoride ürün bulunamadı" });
        }

        // Eşleşen ürünleri döndürüyoruz
        res.json({ message: "Ürünler başarıyla çekildi.", products });
    } catch (error) {
        console.error("Hata oluştu:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
}

// Ürün listeleme(bedene göre)
exports.get_product_by_size = async (req, res) => {
    try {
        const sizeId = req.params.sizeId;

        if (!sizeId) {
            return res.status(400).json({ error: "Geçersiz sizeId" });
        }

        const productSizes = await ProductSize.findAll({
            where: { sizeId: sizeId }
        });

        // Eğer bu renk ile eşleşen ürün yoksa boş bir liste döndür
        if (!productSizes.length) {
            return res.status(404).json({ error: "Bu bedende ürün bulunamadı" });
        }

        // Eşleşen ürünlerin productId'lerini al
        const productIds = productSizes.map(p => p.productId);

        // Bu productId'lere sahip ürünleri getir
        const products = await Product.findAll({
            where: {
                id: productIds
            },
            include: [
                {
                    model: ProductImage,
                    as: 'images', // images alias'ı kullanıyoruz
                    attributes: ["imageUrl"], // Sadece 'imageUrl' alanını çekiyoruz
                }
            ]

        });
        res.json({ message: "Ürünler başarıyla çekildi.", products });
    } catch (error) {
        console.error("Hata oluştu:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
}

// Ürün listeleme(isme göre)
exports.get_product_by_name = async (req, res) => {
    try {
        const product = await Product.findAll({
            where: {
                name: { [Op.like]: `%${req.params.name}%` }
            },
            include: [
                {
                    model: ProductImage,
                    as: 'images',
                    attributes: ["imageUrl"],
                },

            ],
        });
        res.status(200).json(product);
    } catch (err) {
        console.error("Kullanıcı arama sırasında hata oluştu:", err);
        res.status(500).json({ message: "Sunucu hatası", error: err.message || "Bilinmeyen bir hata oluştu" });
    }
};

// Ürün listeleme(renge göre)
exports.get_product_by_color = async (req, res) => {
    try {
        const { color } = req.params;
        const products = await Product.findAll({
            where: {
                color: color
            },
            include: [
                {
                    model: ProductImage,
                    as: 'images',
                    attributes: ["imageUrl"],
                },

            ],
        });
        if (!products.length) {
            return res.status(404).json({ message: "Ürün bulunamadı", products: [] });
        }

        // Her ürün için mainImage ve renk bilgilerini ekliyoruz
        const formattedProducts = products.map(product => {
            const productJSON = product.toJSON();

            // Ürün görseli
            const mainImage = productJSON.images?.[0]?.imageUrl || null;
            return {
                ...productJSON,
                mainImage,
            };
        });

        res.json({ message: "Ürünler başarıyla çekildi.", products: formattedProducts });

    } catch (error) {
        console.error("Ürünleri çekerken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin." });
    }
};
// Ürün listeleme(ürün ayrıntısı)
exports.get_product_by_id = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                {
                    model: Size, //  Ara tablo yerine Size modelini ekle
                    through: { attributes: [] }, // Ara tabloyu dahil etme
                    attributes: ['id', 'name'] // Sadece beden adını getir
                },
                {
                    model: ProductImage, // Görselleri ekleyelim
                    as: 'images', // İlişkili görselleri 'images' adıyla alacağız
                    attributes: ['id', 'imageUrl'] // Görsellerin id'si, URL'si ve ana olup olmadığı
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ error: "Ürün bulunamadı" });
        }

        res.json({ message: "Ürünler başarıyla çekildi.", product });
    } catch (error) {
        console.error("Ürün getirilirken hata oluştu:", error);
        res.status(500).json({ error: "Sunucu hatası, lütfen tekrar deneyin." });
    }
};

// Ürün ekleme
exports.add_product = async (req, res) => {
    try {
        console.log("Kullanıcı verileri:", req.body); // Verilerin doğru geldiğini kontrol et
        console.log("Kullanıcı resimleri:", req.files); // Dosyaların doğru şekilde geldiğini kontrol et

        const { subCategoryId, categoryId, name, price, stock, color, sizeIds, description } = req.body;
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];


        // Zorunlu alanların kontrolü
        if (!name || images.length === 0 || !price || !stock || !color || !description) {
            return res.status(400).json({ error: "Lütfen tüm zorunlu alanları doldurun." });
        }

        // Ürünü veritabanına ekleyin
        const product = await Product.create({ name, price, stock, color, description }); // 'image' alanı yok, sadece diğer alanlar

        // Ürünü kategoriyle ilişkilendirin
        await ProductCategory.create({ categoryId, productId: product.id });

        await ProductSubCategory.create({ subCategoryId, productId: product.id });

        // Ürünü bedenle ilişkilendirin (sizeIds boş değilse)
        if (sizeIds && sizeIds.length > 0) {
            const sizes = await Size.findAll({ where: { id: sizeIds } });
            await product.addSizes(sizes);
        }

        // Ürün resimlerini 'ProductImage' tablosuna ekleyin
        const imageRecords = []; // Resim kayıtlarını tutmak için bir dizi
        for (const image of images) {
            imageRecords.push({
                productId: product.id,    // Ürünün id'si
                imageUrl: image           // Resim URL'si
            });
        }

        // Birden fazla resmi 'ProductImage' tablosuna ekle
        await ProductImage.bulkCreate(imageRecords);

        // Ana görsel olarak ilk resmi seçmek (ProductImage tablosundan)
        const mainImage = imageRecords[0].imageUrl;

        // Başarıyla eklenen ürünü döndür
        res.status(201).json({ product, mainImage });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ürün eklenirken hata oluştu." });
    }
};

//Ürün güncelleme
exports.update_product = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId); // id'ye göre ürünü bul

        if (!product) { // Eğer ürün bulunamazsa
            return res.status(404).json({ error: "Ürün bulunamadı." });
        }

        const { subCategoryId, categoryId, name, price, stock, color, sizeIds, description } = req.body;
        let imageUrls = [];

        // Eski resimleri sil
        const productImages = await ProductImage.findAll({ where: { productId: product.id } });
        productImages.forEach((image) => {
            const imagePath = path.join(__dirname, '..', 'uploads', image.imageUrl.split('/').pop());
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Resim dosyası silinirken hata oluştu:', err);
                } else {
                    console.log('Resim dosyası başarıyla silindi:', imagePath);
                }
            });
        });
        await ProductImage.destroy({ where: { productId: product.id } });


        // Yeni resimleri yükle
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => `/uploads/${file.filename}`); // Resimleri al
            // ProductImage tablosuna yeni resimleri ekle
            for (const imageUrl of imageUrls) {
                await ProductImage.create({
                    productId: product.id,
                    imageUrl: imageUrl
                });
            }
        }

        // Ürünü güncelle
        await product.update({
            name,
            price,
            stock,
            color,
            description // Eğer renk Product tablosunda tutuluyorsa, burada doğrudan güncellenir
        });

        // Ürünün kategorisini güncelle
        if (categoryId) {
            await ProductCategory.update(
                { categoryId },
                { where: { productId: product.id } }
            );
        }
        if (subCategoryId) {
            await ProductSubCategory.update(
                { subCategoryId },
                { where: { productId: product.id } }
            );
        }


        // Renk varsa ve Product tablosunda değilse, doğrudan renk güncelleniyor
        if (color) {
            product.color = color; // Ürünün renk bilgisini güncelle
            await product.save(); // Kaydet
        }

        // Bedeni varsa, güncelle
        if (sizeIds && sizeIds.length > 0) {
            const sizes = await Size.findAll({ where: { id: sizeIds } });
            await product.setSizes(sizes); // Product-Sizes ilişkilendirmesi
        }

        // Başarıyla güncellenmiş ürünü döndür
        res.json({
            message: "Ürün başarıyla güncellendi.",
            product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ürün güncellenirken hata oluştu." });
    }
};

exports.delete_product = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Ürün bulunamadı." });
        }

        // Ürünle ilişkili yorumları sil
        await Review.destroy({ where: { productId: product.id } });

        // Resim dosyalarını sil
        const productImages = await ProductImage.findAll({ where: { productId: product.id } });
        productImages.forEach((image) => {
            const imagePath = path.join(__dirname, '..', 'uploads', image.imageUrl.split('/').pop());
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Resim dosyası silinirken hata oluştu:', err);
                } else {
                    console.log('Resim dosyası başarıyla silindi:', imagePath);
                }
            });
        });

        // Veritabanından resmi sil
        await ProductImage.destroy({ where: { productId: product.id } });

        // Diğer ilişkileri sil
        await OrderProduct.destroy({ where: { productId: product.id } });
        await product.setSizes([]);
        await ProductSize.destroy({ where: { productId: product.id } });
        await Favorite.destroy({ where: { productId: product.id } });
        await ProductCategory.destroy({ where: { productId: product.id } });
        await ProductSubCategory.destroy({ where: { productId: product.id } });
        await CartProduct.destroy({ where: { productId: product.id } });

        // Ürünü sil
        await product.destroy();

        res.json({ message: "Ürün başarıyla silindi." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ürün silinirken hata oluştu." });
    }
};
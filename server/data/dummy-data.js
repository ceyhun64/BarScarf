//statik data
const User = require("../models/user");
const UserDetails = require("../models/userDetails");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const ProductSubCategory = require("../models/productSubCategory");
const ProductImage = require("../models/productImage");
const Cart = require("../models/cart");
const CartProduct = require("../models/cartProduct");
const Order = require("../models/order");
const OrderProduct = require("../models/orderProduct");
const Review = require("../models/review");
const Favorite = require("../models/favorite");
const Subscribe = require("../models/subscribe");
const bcrypt = require('bcrypt');

async function populate() {

    await User.bulkCreate([
        { name: "Ceyhun", email: "ceyhun@example.com", password: await bcrypt.hash("Ceycey.123", 10), isAdmin: 1 },
    ]);
    // 5 adet kullanıcı verisi
    await UserDetails.bulkCreate([
        {
            userId: 1, // Ceyhun
            firstName: 'Ceyhun',
            lastName: 'Turkmen',
            phoneNumber: '1234567890',
            email: 'ceyhun@example.com',
            address: '123 Ceyhun St',
            city: 'New York',
            district: 'Manhattan',
            zipCode: '10001'
        },
        {
            userId: 2, // Bulent
            firstName: 'Bulent',
            lastName: 'Turkmen',
            phoneNumber: '2345678901',
            email: 'bulent@example.com',
            address: '456 Bulent St',
            city: 'Los Angeles',
            district: 'Hollywood',
            zipCode: '90001'
        },
        {
            userId: 3, // Hasan
            firstName: 'Hasan',
            lastName: 'Turkmen',
            phoneNumber: '3456789012',
            email: 'hasan@example.com',
            address: '789 Hasan St',
            city: 'Chicago',
            district: 'Lincoln Park',
            zipCode: '60614'
        },
        {
            userId: 4, // Done
            firstName: 'Done',
            lastName: 'Turkmen',
            phoneNumber: '4567890123',
            email: 'done@example.com',
            address: '101 Done St',
            city: 'San Francisco',
            district: 'Mission District',
            zipCode: '94110'
        },
        {
            userId: 5, // Selin
            firstName: 'Zeynep',
            lastName: 'Yıldırım',
            phoneNumber: '5678901234',
            email: 'zeynep@example.com',
            address: '202 Zeynep St',
            city: 'Austin',
            district: 'Downtown',
            zipCode: '73301'
        },
        {
            userId: 6, // Murat
            firstName: 'Hasan Ali',
            lastName: 'Kaya',
            phoneNumber: '6789012345',
            email: 'hasanali@example.com',
            address: '303 HasanAli St',
            city: 'Houston',
            district: 'West End',
            zipCode: '77001'
        }
    ]);

    // Kadın alt kategorileri (23 adet)
    await Category.bulkCreate([
        { name: "Eşarp" },
        { name: "Şal" },
        { name: "Çanta" },

    ]);

    await SubCategory.bulkCreate([
        { name: "Düz Eşarp", categoryId: 1, isPopular: 1 },
        { name: "Desenli Eşarp", categoryId: 1, isPopular: 1 },
        { name: "Çizgili Eşarp", categoryId: 1, isPopular: 1 },
        { name: "Kare Eşarp", categoryId: 1, isPopular: 1 },
        { name: "Sırt Şalı", categoryId: 2, isPopular: 0 },
        { name: "Baş Şalı", categoryId: 2, isPopular: 0 },
        { name: "Küçük Çanta", categoryId: 3, isPopular: 0 },
        { name: "Büyük Çanta", categoryId: 3, isPopular: 0 },
    ])


    await Product.bulkCreate([
        {
            name: "Kırmızı Eşarp",
            price: 199,
            stock: 60,
            color: "kirmizi",
            description: "Canlı kırmızı renkte, şık ve zarif bir eşarp modeli.",
            groupCode: "ESARP123",

        },
        {
            name: "Siyah Çanta",
            price: 199,
            stock: 60,
            color: "siyah",
            description: "Günlük kullanıma uygun düz siyah gömlek.",
            groupCode: "CANTA123",
        },
        {
            name: "Krem Çanta",
            price: 149,
            stock: 70,
            color: "sari",
            description: "Rahat ve hafif yazlık sarı şort.",
            groupCode: "CANTA123",
        },
        {
            name: "Louis Vuitton Çanta",
            price: 149,
            stock: 70,
            color: "kirmizi",
            description: "Yaz ayları için ideal kırmızı renkli şort.",
            groupCode: "CANTA123",
        },
        {
            name: "Şort Kargo",
            price: 169,
            stock: 70,
            color: "mavi",
            description: "Farklı cepleriyle kullanışlı mavi kargo şort.",
            groupCode: "CANTA123",
        },
        {
            name: "Şort Kargo",
            price: 169,
            stock: 70,
            color: "sari",
            description: "Göz alıcı sarı tonunda rahat kargo şort.",
            groupCode: "CANTA123",
        },
        {
            name: "Elbise Düz",
            price: 249,
            stock: 50,
            color: "siyah",
            description: "Klasik ve zarif siyah düz elbise.",
            groupCode: "ELBİSE123",
        },
        {
            name: "Elbise Düz",
            price: 249,
            stock: 50,
            color: "beyaz",
            description: "Temiz ve sade görünüm sunan beyaz düz elbise.",
            groupCode: "ELBİSE123",
        },
        {
            name: "Elbise Sırt Dekolteli",
            price: 289,
            stock: 50,
            color: "pembe",
            description: "Feminen tasarımıyla dikkat çeken pembe sırt dekolteli elbise.",
            groupCode: "ELBİSE123",
        },
        {
            name: "Elbise Sırt Dekolteli",
            price: 289,
            stock: 50,
            color: "mor",
            description: "Gece davetleri için mor tonunda sırt dekolteli elbise.",
            groupCode: "ELBİSE123",
        }
    ]);


    // Ürün resimleri
    await ProductImage.bulkCreate([
        { productId: 1, imageUrl: "/uploads/29.jpg" },
        { productId: 1, imageUrl: "/uploads/2.jpg" },
        { productId: 2, imageUrl: "/uploads/30.jpg" },
        { productId: 2, imageUrl: "/uploads/3.jpg" },
        { productId: 3, imageUrl: "/uploads/31.jpg" },
        { productId: 3, imageUrl: "/uploads/6.jpg" },
        { productId: 4, imageUrl: "/uploads/32.jpg" },
        { productId: 4, imageUrl: "/uploads/8.jpg" },
        { productId: 5, imageUrl: "/uploads/9.jpg" },
        { productId: 5, imageUrl: "/uploads/10.jpg" },
        { productId: 6, imageUrl: "/uploads/11.jpg" },
        { productId: 6, imageUrl: "/uploads/12.jpg" },
        { productId: 7, imageUrl: "/uploads/13.jpg" },
        { productId: 7, imageUrl: "/uploads/14.jpg" },
        { productId: 8, imageUrl: "/uploads/15.jpg" },
        { productId: 8, imageUrl: "/uploads/16.jpg" },
        { productId: 9, imageUrl: "/uploads/17.jpg" },
        { productId: 9, imageUrl: "/uploads/18.jpg" },
        { productId: 10, imageUrl: "/uploads/19.jpg" },
        { productId: 10, imageUrl: "/uploads/20.jpg" },
    ]);

    await ProductCategory.bulkCreate([
        { productId: 1, categoryId: 1 },
        { productId: 2, categoryId: 1 },
        { productId: 3, categoryId: 2 },
        { productId: 4, categoryId: 2 },
        { productId: 5, categoryId: 3 },
        { productId: 6, categoryId: 3 },
        { productId: 7, categoryId: 1 },
        { productId: 8, categoryId: 1 },
        { productId: 9, categoryId: 2 },
        { productId: 10, categoryId: 3 },

    ])

    await ProductSubCategory.bulkCreate([
        { productId: 1, subCategoryId: 1 },
        { productId: 2, subCategoryId: 2 },
        { productId: 3, subCategoryId: 2 },
        { productId: 3, subCategoryId: 3 },
        { productId: 4, subCategoryId: 3 },
        { productId: 4, subCategoryId: 4 },
        { productId: 5, subCategoryId: 4 },
        { productId: 5, subCategoryId: 5 },
        { productId: 6, subCategoryId: 5 },
        { productId: 6, subCategoryId: 6 },
        { productId: 7, subCategoryId: 6 },
        { productId: 7, subCategoryId: 7 },
        { productId: 8, subCategoryId: 7 },
        { productId: 9, subCategoryId: 8 },
        { productId: 10, subCategoryId: 8 },
    ]);
    await Cart.bulkCreate([
        { userId: 1, price: 1000 },
        { userId: 2, price: 1000 },
        { userId: 3, price: 1000 },
        { userId: 4, price: 1000 },
        { userId: 5, price: 1000 },
    ]);

    await CartProduct.bulkCreate([
        { id: 1, quantity: 1, productId: 1, cartId: 1, price: 1000 },
        { id: 2, quantity: 3, productId: 2,  cartId: 2, price: 1000 },
        { id: 3, quantity: 1, productId: 3,  cartId: 3, price: 1000 },
        { id: 4, quantity: 2, productId: 4,  cartId: 4, price: 1000 },
        { id: 5, quantity: 1, productId: 5,  cartId: 5, price: 1000 },
    ]);

    await Order.bulkCreate([
        { userId: 1, totalPrice: 99.99, status: 'pending', },
        { userId: 2, totalPrice: 149.99, status: 'completed', },
        { userId: 1, totalPrice: 59.99, status: 'cancelled', },
        { userId: 3, totalPrice: 249.99, status: 'pending', }
    ]);

    await OrderProduct.bulkCreate([
        { id: 1, quantity: 1, productId: 1, orderId: 1, priceAtPurchase: 99.99 },
        { id: 2, quantity: 3, productId: 2, orderId: 2, priceAtPurchase: 99.99 },
        { id: 3, quantity: 1, productId: 3, orderId: 3, priceAtPurchase: 99.99 },
        { id: 4, quantity: 2, productId: 4, orderId: 4, priceAtPurchase: 99.99 },
    ]);

    await Review.bulkCreate([
        { userId: 1, productId: 1, rating: 5, comment: 'Great product!', },
        { userId: 2, productId: 2, rating: 4, comment: 'Good quality.', },
        { userId: 3, productId: 3, rating: 3, comment: 'Average product.', },
        { userId: 4, productId: 4, rating: 2, comment: 'Not satisfied.', },
        { userId: 5, productId: 5, rating: 1, comment: 'Terrible product.', },
    ]);

    await Favorite.bulkCreate([
        { userId: 1, productId: 1 },
        { userId: 2, productId: 2 },
        { userId: 3, productId: 3 },
        { userId: 4, productId: 4 },
        { userId: 5, productId: 5 },
        { userId: 1, productId: 6 },
        { userId: 2, productId: 7 },
        { userId: 3, productId: 8 },
        { userId: 4, productId: 9 },
        { userId: 5, productId: 10 },
    ]);

    await Subscribe.bulkCreate([
        { email: 'ctrkmn64@gmail.com' },
        { email: 'ceyhunturkmen4@gmail.com' },
    ]);
}

module.exports = populate;

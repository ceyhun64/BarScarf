const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary yapılandırması
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage ayarı
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads", // Cloudinary'de klasör ismi
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
    },
});

// Multer + Cloudinary birleşimi
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

// Çoklu upload için middleware
const uploadMultiple = upload.array("images", 5); // images[] olarak göndereceksin

module.exports = uploadMultiple;

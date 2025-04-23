const multer = require("multer");
const path = require("path");

// Dosyaların kaydedileceği dizini ve dosya adlarını ayarlayalım
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Dosyaları "uploads" klasörüne kaydet
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        // Dosya adını benzersiz yapmak için timestamp ekleyelim
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Sadece resim formatlarını kabul etmek için fileFilter fonksiyonu
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    // Eğer dosya uygun formatta ise, kabul et
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // Hatalı formatta dosya gelirse hata döndür
        cb(new Error("Geçersiz dosya türü! Sadece JPEG, PNG, WEBP kabul edilir."), false);
    }
};

// Multer middleware'ini doğru ayarlıyoruz
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 20 * 1024 * 1024  } // Maksimum dosya boyutunu 5MB ile sınırlıyoruz
});

const uploadMultiple = upload.array('images', 5); // Burada 'images[]' key'i kullanılacak ve maksimum 5 dosya yüklenebilir

module.exports = uploadMultiple;

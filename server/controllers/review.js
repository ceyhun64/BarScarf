const Review = require('../models/review');

//yorum ekleme
exports.create_review=async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const { comment, rating } = req.body;

        // Gelen verileri kontrol et
        if (!comment || typeof comment !== "string" || comment.length < 3) {
            return res.status(400).json({ error: "Yorum en az 3 karakter olmalı!" });
        }
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Puan 1 ile 5 arasında olmalı!" });
        }

        //Yorumu oluştur
        const review = await Review.create({
            userId,
            productId,
            comment,
            rating
        });
        res.status(201).json(review);
    } catch (error) {
        console.error("Yorum oluşturulurken hata:", error);
        res.status(500).json({ error: "Sunucu hatası, lütfen tekrar deneyin!" });
    }
}

///yorum listeleme
exports.get_reviews= async (req, res) => {
    try {
        const productId = req.params.productId;
        // Sadece yorumları çek
        const reviews = await Review.findAll({
            where: { productId },
            order: [["createdAt", "DESC"]]  // Yorumları en yenisinden eskiye sıralar
        });
        if (reviews.length === 0) {
            return res.status(404).json({ message: "Bu ürün için yorum bulunamadı." });
        }
        res.status(200).json(reviews);

    } catch (error) {
        console.error("Yorumları çekerken hata:", error);
        res.status(500).json({ error: "Sunucu hatası, lütfen tekrar deneyin!" });
    }
}

//yorum silme
exports.delete_review=async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user.id;
        
        // Yorumun var olup olmadığını ve kullanıcıya ait olup olmadığını kontrol et
        const review = await Review.findOne({
            where: {
                id: reviewId,
                userId: userId // Yorumun yalnızca kullanıcıya ait olup olmadığını kontrol et
            }
        });

        // Eğer yorum bulunamazsa
        if (!review) {
            return res.status(404).json({ error: "Yorum bulunamadı veya silme izniniz yok." });
        }

        // Yorumun silinmesi
        await review.destroy(); // Yorum silinir

        // Başarı mesajı
        res.status(200).json({ message: "Yorum başarıyla silindi." });

    } catch (error) {
        console.error("Yorum silinirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası, lütfen tekrar deneyin!" });
    }
}

//admin için yorum silme
exports.delete_review_admin= async (req, res) => {
    try {
        const userId = req.user.id;
        const reviewId = req.params.reviewId;

        // Yorum veritabanında var mı kontrol et
        const review = await Review.findOne({
            where: {
                id: reviewId
            }
        });

        // Eğer yorum bulunamazsa
        if (!review) {
            return res.status(404).json({ error: "Yorum bulunamadı." });
        }

        // Eğer admin değilse ve yorum kendisine ait değilse, silme işlemini engelle
        if (!req.user.isAdmin && review.userId !== userId) {
            return res.status(403).json({ error: "Silme izniniz yok." });
        }

        // Yorumun silinmesi
        await review.destroy(); // Yorum silinir

        res.status(200).json({ message: "Yorum başarıyla silindi." });

    } catch (error) {
        console.error("Yorum silinirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası, lütfen tekrar deneyin!" });
    }
}

///yorum güncelleme
exports.update_review= async (req, res) => {
    try {
        const userId = req.user.id;
        const reviewId = req.params.reviewId;
        const { comment, rating } = req.body;

        // Yorumun var olup olmadığını ve kullanıcıya ait olup olmadığını kontrol et
        const review = await Review.findOne({
            where: {
                id: reviewId,
                userId: userId // Yorum yalnızca kullanıcıya aitse güncellenebilir
            }
        });

        // Eğer yorum bulunamazsa
        if (!review) {
            return res.status(404).json({ error: "Yorum bulunamadı veya güncelleme izniniz yok." });
        }

        // Yorumun güncellenmesi
        await review.update({
            comment,
            rating
        });

        // Güncellenen yorumun dönülmesi
        res.status(200).json(review);

    } catch (error) {
        console.error("Yorum güncellenirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası, lütfen tekrar deneyin!" });
    }
}
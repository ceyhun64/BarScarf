const User = require("../models/user");
const Favorite = require("../models/favorite");
const Review = require("../models/review");
const Order=require("../models/order");
const { Op } = require("sequelize");


// Kullanıcı listeleme
exports.get_users = async (req, res) => {
    try {
        const users = await User.findAll();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Hiç kullanıcı bulunamadı" });
        }
        res.status(200).json({ message: "Kullanıcılar başarıyla listelendi", users });
    } catch (err) {
        console.error("Kullanıcılar listelenirken hata oluştu:", err);
        res.status(500).json({ message: "Sunucu hatası", error: err.message || "Bilinmeyen bir hata oluştu" });
    }
};

// Kullanıcı listeleme (id ye göre)
exports.get_user_by_id = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }
        res.status(200).json({ message: "Kullanıcı başarıyla bulundu", user });
    } catch (err) {
        console.error("Kullanıcı bulunurken hata oluştu:", err);
        res.status(500).json({ message: "Sunucu hatası", error: err.message || "Bilinmeyen bir hata oluştu" });
    }
};

// Kullanıcı listeleme (isime göre)
exports.get_user_by_name = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                name: { [Op.like]: `%${req.params.name}%` }
            }
        });
        res.status(200).json(user);
    } catch (err) {
        console.error("Kullanıcı arama sırasında hata oluştu:", err);
        res.status(500).json({ message: "Sunucu hatası", error: err.message || "Bilinmeyen bir hata oluştu" });
    }
};

// Kullanıcı güncelleme
exports.update_user = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;
        await user.save();
        res.status(200).json({ message: "Kullanıcı başarıyla güncellendi", user });
    } catch (err) {
        console.error("Kullanıcı güncellenirken hata oluştu:", err);
        res.status(500).json({ message: "Sunucu hatası", error: err.message || "Bilinmeyen bir hata oluştu" });
    }
}

// Kullanıcı silme
exports.delete_user = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
        }
        await Order.destroy({ where: { userId: req.params.id } }); // Önce orders tablosundan sil
        await Review.destroy({ where: { userId: req.params.id } }); // Önce reviews tablosundan sil
        await Favorite.destroy({ where: { userId: req.params.id } }); // Önce favorites tablosundan sil
        await user.destroy();
        res.status(200).json({ message: "Kullanıcı başarıyla silindi", user });
    } catch (err) {
        console.error("Kullanıcı silme sırasında hata oluştu:", err);
        res.status(500).json({ message: "Sunucu hatası", error: err.message || "Bilinmeyen bir hata oluştu" });
    }
};

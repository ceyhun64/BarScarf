//admin kontrolünü yapan middleware
module.exports = function (req, res, next) {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Yetkiniz yok." });//req.user.isAdmin false ise yetkiniz yok mesajını gönder
    }
    next();//var ise next() fonksiyonunu çağırır
};

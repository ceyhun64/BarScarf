//auth controller
require("dotenv").config();//.env dosyasını kullanabilmek için dotenv kütüphanesini dahil ettik
const User = require("../models/user");
const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const redis = require("redis");//redis kütüphanesini dahil ettik(kara liste)
const jwt = require("jsonwebtoken");//jsonwebtoken kütüphanesini dahil ettik
const sendMail = require("../helpers/sendMail");//mail gönderebilmek için

// Kullanıcı kayıt
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Aynı email adresiyle bir kullanıcı var mı kontrol et
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: "Bu email adresi kayıtlı." });
        }
        // Yeni kullanıcıyı oluştur
        const newUser = await User.create({ name, email, password });

        // Token oluştur
        const token = newUser.createAuthToken();

        // Mail gönderme ayarları
        const mailOptions = {
            to: email,
            subject: "Kayıt Başarılı",
            text: "Kayıt başarılı. Hoşgeldiniz!"
        };

        // E-posta gönderme işlemi
        await sendMail(mailOptions);

        // Başarıyla kaydedilen kullanıcıyı ve token'ı döndür
        res.status(200).header("x-auth-token", token).json({ message: "Kayıt işlemi başarılı , giriş yapabilirsiniz", newUser });
    } catch (error) {
        console.error("Kayıt işlemi sırasında bir hata oluştu:", error);
        res.status(500).json({ message: "Kayıt işlemi sırasında bir hata oluştu." });
    }
};

// Kullanıcı girişi
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });//veritabanında email adresine sahip kullanıcı var mı?
    if (!user) {//yoksa
        return res.status(400).json({ message: "Bu email adresi kayıtlı değil." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {//email varsa şifre doğru mu?
        return res.status(400).json({ message: "Hatalı şifre." });
    }
    let cart = await Cart.findOne({ where: { id: user.id } });// yeni sepet oluşturuyor yeni kullanıcı için
    if (!cart) {//cart yoksa yeni sepet oluştur
        cart = await Cart.create({ id: user.id });
    }
    const token = user.createAuthToken();//token oluşturuyoruz

    const mailOptions = {//mail gönderme ayarları
        to: email,
        subject: "Giriş Başarılı",
        text: "Giriş başarılı. Hoşgeldiniz!"
    };
    await sendMail(mailOptions);//mail gönderiyoruz
    res.status(200).header("x-auth-token", token).json({ message: "Giriş işlemi başarılı , anasayfaya yönlendiriliyorsunuz", token: token, username: user.name });//frontende token gönderiyoruz
}

// Kullanıcı çıkışı
exports.logout = async (req, res) => {
    const redisClient = redis.createClient();
    // Token'ı x-auth-token header'ından alıyoruz
    const token = req.header("x-auth-token"); // "x-auth-token" header'ını alıyoruz

    if (!token) {
        return res.status(400).json({ message: "Token bulunamadı!" });//token yoksa hata döndürüyoruz(çıkış yapamıyor)
    }

    try {
        // Token'ı Redis'e geçersiz kılmak için blacklist'e ekliyoruz
        await redisClient.setEx(token, 3600, "blacklisted"); // 1 saat boyunca geçersiz kıl

        res.status(200).json({ message: "Çıkış yapıldı!" });
    } catch (error) {
        console.error("Redis işlemi sırasında hata oluştu:", error);
        res.status(500).json({ message: "Çıkış sırasında bir hata oluştu." });
    }
};

//şifre güncelleme maili gönderir
exports.passwordEmail = async (req, res) => {
    const email = req.body.email;
    // Kullanıcıyı veritabanında bul
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // Şifre sıfırlama token'ı oluştur (JWT kullanıyoruz)
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });

    // Şifre sıfırlama linki
    const resetLink = `https://www.barscarf.com/update-password/${token}`;

    // Mail gönderme
    const mailOptions = {
        to: email,
        subject: "Şifre Sıfırlama",
        text: `Şifre sıfırlama işlemi için aşağıdaki linke tıklayın: ${resetLink}`,
    };

    try {
        await sendMail(mailOptions); // Mail gönder
        res.status(200).json({ message: "Şifre sıfırlama için e-posta gönderildi." });
    } catch (error) {
        console.error("Mail gönderimi sırasında hata:", error);
        res.status(500).json({ message: "E-posta gönderme hatası." });
    }
};

// Şifre güncelleme (şifre değiştir butonuna tıklandığında mail gönderir , maildeki link buraya yönlendirir)
exports.updatePassword = async (req, res) => {
    const { token } = req.params; // URL'den gelen token
    const { password, newPassword, againNewPassword } = req.body;//kullanıcıdan verilerl alınıyor

    if (!password || !newPassword || !againNewPassword) {
        return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
    }

    // Token'ı doğrula
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);//token doğrulanıyor

        // Token'dan kullanıcıyı bul
        const user = await User.findOne({ where: { id: decoded.id } });

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });//kullanıcı yoksa hata döndür
        }

        // Eski şifreyi kontrol et
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mevcut şifre hatalı." });
        }

        // Yeni şifreleri karşılaştır
        if (newPassword !== againNewPassword) {
            return res.status(400).json({ message: "Yeni şifreler eşleşmiyor." });
        }

        // Yeni şifreyi güncelle
        await user.update({ password: newPassword });

        res.status(200).json({ message: "Şifre başarıyla güncellendi." });

    } catch (error) {
        console.error("Token doğrulama hatası:", error);
        res.status(400).json({ message: "Geçersiz veya süresi dolmuş token." });
    }
};
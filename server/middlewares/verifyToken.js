//token kontrolünü yapan middleware
require("dotenv").config(); //.env dosyasını dahil ettik
const jwt = require("jsonwebtoken"); //jwt kütüphanesini dahil ettik

const jwtPrivateKey=process.env.JWT_PRIVATE_KEY;

module.exports=function(req, res, next) {
    const token = req.header("x-auth-token");
    if(!token) {
        return res.status(401).json("Token bulunamadı")
    }
    try {
        const decodedToken = jwt.verify(token, jwtPrivateKey);
        req.user = decodedToken;//req.user =id,isAdmin,iat bilgilerini tutuyor
        next();
    } catch (ex) {
        return res.status(400).json("Geçersiz token")
    }

}
const Cart = require("../models/cart");
const CartProduct = require("../models/cartProduct");
const ProductSize = require("../models/productSize");
const Product = require("../models/product");
const Size = require("../models/size");
const ProductImage = require("../models/productImage");

// Sepete ürün ekleme
exports.add_product = async (req, res) => {
    const cartId = req.user.id;//cartId yi linkten çekiyoruz
    const { productId, size, quantity } = req.body;//productId,sizeId,quantity yi kullnıcıdan alıyoruz
    try {
        const sizee = await Size.findOne({//sizeId yi size'a göre buluyoruz    
            where: {
                name: size
            }
        })
        const product = await Product.findOne({
            where: {
                id: productId
            }
        })
        const price = product.price;
        const sizeId = sizee.id;//sizeId'yi sizeID'ye atıyoruz

        const productSize = await ProductSize.findOne({//productId ve sizeId'ye göre productSize'ı buluyoruz
            where: {
                productId,
                sizeId
            }
        })
        if (!productSize) {//productSize yoksa hata döndürüyoruz (beden ve ürün eşleşmesi yok)
            return res.status(404).json({ message: "Ürün bulunamadı" });
        }
        const cartProduct = await CartProduct.findOne({//cartId productId ve sizeId'ye göre cartProduct'ı buluyoruz
            where: {
                cartId: cartId,
                productId: productId,
                sizeId: sizeId,
            }
        })
        if (cartProduct) {//cartProduct varsa quantity'u arttırıyoruz
            cartProduct.quantity += quantity;
            await cartProduct.save();
        }
        else {//cartProduct yoksa yeni bir cartProduct oluşturuyoruz
            await CartProduct.create({
                cartId: cartId,
                productId: productId,
                sizeId: sizeId,
                quantity: quantity,
                price: quantity * price
            })
        }
        res.status(201).json({ message: "Ürün sepete eklendi" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin." });
    }
}

// Sepeti görüntüleme
exports.get_cart = async (req, res) => {
    try {
        const cartId = req.user.id;//cartId yi linkten çekiyoruz
        const cartProducts = await CartProduct.findAll({//cartId'ye göre cartProduct'ları buluyoruz
            where: { cartId },
            include: [
                {
                    model: Product,//productId'ye göre product tablosunu çekiyoruz
                    as: "products",
                    attributes: ["name", "price"],
                    include: [
                        {
                            model: ProductImage,//productId'ye göre productSize tablosunu çekiyoruz
                            as: "images",
                            attributes: ["imageUrl"],
                        },
                    ]
                },
                {
                    model: Size,//sizeId'ye göre size tablosunu çekiyoruz
                    as: "sizes",
                },
            ]
        });
        res.status(200).json({ message: "Sepet başarıyla getirildi", cart: cartProducts });//cartProducts'ı döndürüyoruz
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Bir hata oluştu" });
    }
}

// Sepetteki ürün ayrıntılarını görüntüleme
exports.get_product = async (req, res) => {
    const cartId = req.user.id;//cartId yi linkten çekiyoruz
    const productId = req.params.productId;//productId yi linkten çekiyoruz
    const cartProduct = await CartProduct.findOne({//cartId productId'ye göre cartProduct'ı buluyoruz
        where: {
            cartId: cartId,
            productId: productId,
        },
        include: [
            {
                model: Product,//productId'ye göre product tablosunu çekiyoruz
                as: "products",
                attributes: ["name", "price"],
                include: [
                    {
                        model: ProductImage,//productId'ye göre productSize tablosunu çekiyoruz
                        as: "images",
                        attributes: ["imageUrl"],

                    },
                ]
                //product tablosundan sadece name, image, price ve'ı çekiyoruz
            }
        ]

    });
    if (!cartProduct) {//cartProduct yoksa hata döndürüyoruz
        return res.status(404).json({ message: "Ürün bulunamadı" });
    }
    res.status(200).json(cartProduct);
}

// Sepetteki ürün sayısını arttırma
exports.increase_product = async (req, res) => {
    const cartId = req.user.id;//cartId yi linkten çekiyoruz
    const productId = req.params.productId;//productId yi linkten çekiyoruz
    const sizeId = req.params.sizeId;//sizeId yi linkten çekiyoruz
    const cartProduct = await CartProduct.findOne({//cartId productId ve sizeId'ye göre cartProduct'ı buluyoruz
        where: {
            cartId: cartId,
            productId: productId,
            sizeId: sizeId,
        }
    });
    if (!cartProduct) {//cartProduct yoksa hata döndürüyoruz
        return res.status(404).json({ message: "Ürün bulunamadı" });
    }
    cartProduct.quantity++;//cartProduct varsa quantity'i 1 arttırıyoruz
    await cartProduct.save();//cartProduct'ı kaydediyoruz
    res.status(200).json({ message: "Ürün sayısı arttırıldı" });
}

// Sepetteki ürün sayısını azaltma
exports.decrease_product = async (req, res) => {
    const cartId = req.user.id;//cartId yi linkten çekiyoruz
    const productId = req.params.productId;//productId yi linkten çekiyoruz
    const sizeId = req.params.sizeId;//sizeId yi linkten çekiyoruz
    const cartProduct = await CartProduct.findOne({//cartId productId ve sizeId'ye göre cartProduct'ı buluyoruz
        where: {
            cartId: cartId,
            productId: productId,
            sizeId: sizeId,
        }
    });
    if (!cartProduct) {///cartProduct yoksa hata döndürüyoruz
        return res.status(404).json({ message: "Ürün bulunamadı" });
    }
    if (cartProduct.quantity > 1) {//cartProduct 1den büyükse 1 azaltıyoruz
        cartProduct.quantity--;
        await cartProduct.save();
        res.status(200).json({ message: "Ürün sayısı azaltıldı" });
    }
    else {//cartProduct 1'e veya 0a eşitse cartProduct'ı siliyoruz
        await cartProduct.destroy();
        res.status(200).json({ message: "Ürün sepetten kaldırıldı" });
    }
}

// Sepetten ürün kaldırma
exports.delete_product = async (req, res) => {
    const cartId = req.user.id;//cartId yi linkten çekiyoruz
    const productId = req.params.productId;//productId yi linkten çekiyoruz
    const cartProduct = await CartProduct.findOne({//cartId productId ve sizeId'ye göre cartProduct'ı buluyoruz
        where: {
            cartId: cartId,
            productId: productId,
        }
    });
    if (!cartProduct) {//cartProduct yoksa hata döndürüyoruz
        return res.status(404).json({ message: "Ürün bulunamadı" });
    }
    const cart = await Cart.findOne({//cartId'ye göre cart'ı buluyoruz
        where: {
            id: cartId
        }
    })
    cart.price -= cartProduct.price * cartProduct.quantity;//cart'ın totalPrice'ından cartProduct'ın price'ını çıkarıyoruz
    await cartProduct.destroy();//cartProduct varsa siliyoruz
    res.status(200).json({ message: "Ürün sepetten kaldırıldı" });
}

// Sepetteki ürün bilgisini güncelleme
exports.update_product = async (req, res) => {
    try {
        const cartId = req.user.id; // cartId'yi linkten çekiyoruz
        const productId = req.params.productId; // productId'yi linkten çekiyoruz
        const { quantity, sizeId } = req.body; // quantity, sizeId 'ı kullanıcıdan çekiyoruz

        // Sepetteki ilgili ürünü bul
        const cartProduct = await CartProduct.findOne({
            where: { cartId, productId }
        });

        if (!cartProduct) {
            return res.status(404).json({ message: "Ürün sepette bulunamadı!" });
        }

        // Ürün bilgilerini çek
        const product = await Product.findOne({ where: { id: productId } });
        if (!product) {
            return res.status(404).json({ message: "Ürün veritabanında bulunamadı!" });
        }

        // Güncellenmesi gereken değerleri atama
        cartProduct.quantity = quantity;
        cartProduct.sizeId = sizeId;
        await cartProduct.save(); // Sepetteki ürünü güncelle ve kaydet

        res.status(200).json({ message: "Ürün başarıyla güncellendi", cartProduct });
    } catch (error) {
        console.error("Ürün güncellenirken hata oluştu:", error);
        res.status(500).json({ message: "Sunucu hatası", error });
    }
};

// Sepeti temizleme
exports.clear_cart = async (req, res) => {
    const cartId = req.user.id; // cartId'yi user'dan alıyoruz
    try {
        const cartProducts = await CartProduct.findAll({
            where: { cartId: cartId },
        });

        // Eğer sepet ürünleri yoksa
        if (cartProducts.length === 0) {
            return res.status(404).json({ message: "Sepetinizde ürün bulunmamaktadır." });
        }

        // Sepet ürünlerini siliyoruz
        await CartProduct.destroy({
            where: { cartId: cartId },
        });

        res.status(200).json({ message: "Sepet temizlendi" });
    } catch (error) {
        console.error("Sepet temizleme işlemi sırasında hata:", error);
        res.status(500).json({ message: "Sepet temizlenirken bir hata oluştu" });
    }
};


// Sepetin toplam fiyatını hesaplama
exports.get_total_price = async (req, res) => {
    const cartId = req.user.id;//cartId yi linkten çekiyoruz
    const cartProducts = await CartProduct.findAll({//cartId'ye göre cartProduct'ları buluyoruz
        where: {
            cartId: cartId
        }
    });
    if (!cartProducts) {//cartProducts yoksa hata döndürüyoruz
        return res.status(404).json({ message: "Sepet bulunamadı" });
    }
    let total = 0;//toplam fiyatı 0 olarak atıyoruz
    for (let i = 0; i < cartProducts.length; i++) {
        const cartProduct = cartProducts[i];//cartProduct'ları döngüye sokuyoruz
        const product = await Product.findByPk(cartProduct.productId);//product'ı buluyoruz
        total += product.price * cartProduct.quantity;//product'ın fiyatını cartProduct'ın quantity'ı ile çarpıyoruz
    }
    await Cart.update({ price: total }, { where: { id: cartId } });//toplam fiyatı cart'ın price'ına atıyoruz
    res.status(200).json({ total: total });//toplam fiyatı döndürüyoruz
}
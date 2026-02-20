const Order = require("../models/order");
const OrderProduct = require("../models/orderProduct");
const CartProduct = require("../models/cartProduct");
const Product = require("../models/product");
const Cart = require("../models/cart");

//kişisel sipariş detayı getirme
exports.get_my_order_details = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    // Kullanıcının bu siparişe sahip olup olmadığını kontrol et
    const order = await Order.findOne({
      where: { id: orderId, userId: userId },
    });

    if (!order) {
      return res
        .status(403)
        .json({ message: "Bu sipariş size ait değil veya bulunamadı!" });
    }

    // Siparişe ait tüm ürünleri getir
    const orderProducts = await OrderProduct.findAll({
      where: { orderId: orderId },
      include: [
        {
          model: Product,
          as: "product",
        },
      ],
    });

    const products = await Product.findAll({
      where: { id: orderProducts.map((op) => op.productId) },
    });

    res.json({ order, orderProducts, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu", error });
  }
};

//kişisel tüm siparişleri getirme
exports.get_my_orders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId: userId },
      order: [["createdAt", "DESC"]], // En yeni sipariş en üstte
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Henüz siparişiniz bulunmamaktadır!" });
    }

    res.json({ orders });
  } catch (error) {
    console.error("Siparişleri getirirken hata oluştu:", error);
    res
      .status(500)
      .json({ message: "Siparişler getirilirken bir hata oluştu!", error });
  }
};

//tüm siparişleri getirme
exports.get_orders = async (req, res) => {
  try {
    const orders = await Order.findAll({});
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu", error });
  }
};

//id ye göre sipariş getirme
exports.get_order_by_id = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Sipariş ID geçerli mi diye kontrol edelim
    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Geçersiz sipariş ID'si." });
    }
    // Siparişi bulalım
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: "Sipariş bulunamadı." });
    }

    res.json(order);
  } catch (error) {
    console.error("Hata:", error.message); // Hata mesajını logluyoruz
    res.status(500).json({ message: "Bir hata oluştu." });
  }
};

//sipariş detayını getirme
exports.get_order_details = async (req, res) => {
  try {
    // Parametreyi al
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Bu sipariş bulunamadı." });
    }

    // Sipariş ürünlerini al
    const orderProducts = await OrderProduct.findAll({
      where: { orderId: id },
      include: [
        {
          model: Order,
          as: "order",
        },
        {
          model: Product,
          as: "product",
        },
      ],
    });

    // Eğer sipariş ürünleri yoksa, uygun bir mesaj dön
    if (orderProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "Bu sipariş için ürün bulunamadı." });
    }

    // Sipariş ürünleri bulunduysa, veriyi döndür
    res.json(orderProducts);
  } catch (error) {
    console.error(error); // Hata ayıklama için konsola yazdır
    res
      .status(500)
      .json({ message: "Bir hata oluştu, lütfen tekrar deneyin.", error });
  }
};

//sipariş oluşturma
exports.create_order = async (req, res) => {
  const userId = req.user.id;
  try {
    const order = await Order.create({
      userId: userId, // Sipariş, doğrulanan kullanıcıya ait
      status: "pending", // Siparişin durumu (başlangıçta beklemede)
      totalPrice: 0, // Siparişin toplam fiyatı başlangıçta 0
    });

    const cartProducts = await CartProduct.findAll({
      where: { cartId: userId }, // Kullanıcının sepetine ait ürünleri alıyoruz
    });

    if (cartProducts.length === 0) {
      return res.status(404).json({ message: "Sepet boş!" });
    }

    let totalPrice = 0;
    for (let cartProduct of cartProducts) {
      const orderProduct = await OrderProduct.create({
        quantity: cartProduct.quantity,
        priceAtPurchase: cartProduct.price,
        productId: cartProduct.productId, // Ürün ID'si
        orderId: order.id, // Oluşturduğumuz siparişin ID'si
      });

      // Toplam fiyatı hesapla
      totalPrice += orderProduct.priceAtPurchase * orderProduct.quantity;
    }

    await order.update({ totalPrice: totalPrice });

    await Cart.update(
      {
        price: 0, // Sepetin toplam fiyatını sıfırlıyoruz
      },
      {
        where: { id: userId }, // Kullanıcının sepetini temizliyoruz
      }
    );

    res.status(201).json({ message: "Sipariş başarıyla oluşturuldu", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu", error });
  }
};

// Bu fonksiyon, siparişin tamamlanması için kullanılır. Ödeme işlemi tamamlandıktan sonra çağrılır.
exports.complete_order_after_payment = async (orderId) => {
  try {
    console.log(
      "complete_order_after_payment fonksiyonu çalıştı, orderId:",
      orderId
    );
    const order = await Order.findByPk(orderId);

    if (!order) {
      throw new Error("Sipariş bulunamadı.");
    }

    // Siparişin durumunu kontrol et
    if (order.status === "completed" || order.status === "cancelled") {
      throw new Error("Bu sipariş zaten tamamlanmış veya iptal edilmiştir.");
    }

    // Siparişi tamamla
    order.status = "completed";

    // Değişiklikleri veritabanına kaydet
    await order.save();

    const cartId = order.userId;
    await CartProduct.destroy({ where: { cartId: cartId } });
    await Cart.update(
      {
        price: 0, // Sepetin toplam fiyatını sıfırlıyoruz
      },
      {
        where: { id: cartId }, // Kullanıcının sepetini temizliyoruz
      }
    );

    return order;
  } catch (error) {
    console.error("complete_order_after_payment hatası:", error);
    throw error;
  }
};

//sipariş güncelleme
exports.update_order = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Sipariş bulunamadı." });
    }

    // Status'un geçerli bir değer olup olmadığını kontrol et
    const validStatuses = ["pending", "completed", "cancelled"];
    const { status } = req.body;

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Geçersiz sipariş durumu." });
    }

    // Siparişi güncelle
    order.status = status;
    await order.save();

    // Güncellenmiş siparişi döndür
    res.json(order);
  } catch (error) {
    console.error(error); // Hata ayıklamak için loglama
    res
      .status(500)
      .json({ message: "Bir hata oluştu, lütfen tekrar deneyin.", error });
  }
};

//sipariş silme
exports.delete_order = async (req, res) => {
  const { id } = req.params;
  try {
    // Siparişi sil
    const deletedRows = await Order.destroy({
      where: { id: id },
    });

    // Eğer hiçbir satır silinmediyse, siparişin bulunamadığını belirt
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Sipariş bulunamadı." });
    }

    // Silme işlemi başarılı
    res.json({ message: "Sipariş silindi." });
  } catch (error) {
    console.error(error); // Hata ayıklama
    res
      .status(500)
      .json({ message: "Bir hata oluştu, lütfen tekrar deneyin." });
  }
};

//siparişi iptal etme
exports.cancel_order = async (req, res) => {
  const { id } = req.params;
  try {
    // Siparişin varlığını kontrol et
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Sipariş bulunamadı." });
    }

    // Siparişi iptal et
    await Order.update({ status: "cancelled" }, { where: { id: id } });

    res.json({ message: "Sipariş iptal edildi" });
  } catch (error) {
    console.error(error); // Hata ayıklama
    res
      .status(500)
      .json({ message: "Bir hata oluştu, lütfen tekrar deneyin." });
  }
};

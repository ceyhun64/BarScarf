require('dotenv').config();
const Iyzipay = require('iyzipay');
const { complete_order_after_payment } = require('./order');

const iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY,
    secretKey: process.env.IYZICO_SECRET_KEY,
    uri: process.env.IYZICO_BASE_URL
});

// Shopier ödeme linki oluşturma fonksiyonu
exports.createPayment = (req, res) => {
    const { price, paidPrice, currency, basketId, paymentCard, buyer, shippingAddress, billingAddress, basketItems } = req.body;
    const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: "123456789",
        price: price,
        paidPrice: paidPrice,
        currency: currency,
        installment: 1,
        basketId: basketId,
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: paymentCard,
        buyer: buyer,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        basketItems: basketItems
    }

    iyzipay.payment.create(request, async (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.status == 'success') {
            // Ödeme başarılıysa, siparişi tamamla
            try {
                const id=basketId-1
                console.log("basketId:", basketId);
                console.log("id:", id);
                const order = await complete_order_after_payment(id); // basketId burada orderId olarak geliyor olmalı

                return res.status(200).json({
                    message: "Ödeme başarılı ve sipariş tamamlandı.",
                    order
                });
            } catch (err) {
                return res.status(500).json({ message: "Sipariş güncellenemedi.", error: err.message });
            }
        } else {
            return res.status(400).json({ message: "Ödeme başarısız.", result });
        }
    });
}
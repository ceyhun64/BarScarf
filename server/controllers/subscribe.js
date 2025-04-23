const Subscribe = require('../models/subscribe');
const sendMail = require('../helpers/sendMail');

exports.createSubscribe = async (req, res) => {
    try {
        const { email } = req.body;

        // 1. E-posta zaten kayıtlı mı kontrol et
        const existingSubscriber = await Subscribe.findOne({ where: { email } });

        if (existingSubscriber) {
            return res.status(400).json({ message: "Bu e-posta zaten abone olmuş." });
        }

        // 2. Değilse kaydet
        const subscribe = await Subscribe.create({ email });
        res.status(201).json(subscribe);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sunucu hatası." });
    }
};


exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscribe.findAll();
        res.status(200).json(subscribers);
    } catch (error) {
        console.error(error);
    }
}

exports.sendMailToSubscribers = async (req, res) => {
    const { subject, text } = req.body;
    try {
        const subscribers = await Subscribe.findAll();

        await Promise.all(subscribers.map((subscriber) => {
            const mailOptions = {
                to: subscriber.email,
                subject: subject,
                text: text
            };
            return sendMail(mailOptions);
        }));

        res.status(200).json({ message: "Tüm abonelere e-posta gönderildi." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "E-posta gönderilirken hata oluştu." });
    }
};


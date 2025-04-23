require('dotenv').config();
const axios = require('axios');

exports.send_cargo = async (req, res) => {
    const { order, recipient, orderPieceList } = req.body;

    const payload = {
        order,
        recipient,
        orderPieceList
    };

    try {
        const response = await axios.post(
            'https://testapi.mngkargo.com.tr/mngapi/api/standardcmdapi/createOrder',
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.MNG_JWT_TOKEN}`,
                    'X-IBM-Client-Id': process.env.MNG_CLIENT_ID,
                    'X-IBM-Client-Secret': process.env.MNG_CLIENT_SECRET,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-api-version': '1.0'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: 'Kargo gönderimi başarısız', error: error.response?.data || error.message });
    }
}

exports.get_token = async (req, res) => {
    const apiKey = process.env.MNG_ANAHTAR; // MNG Kargo API Anahtarı
    const securityString = process.env.MNG_GUVENLIK_DIZGISI; // MNG Kargo Güvenlik Dizgisi

    try {
        // JWT token almak için Identity API'ye istek gönderiyoruz
        const response = await axios.post(
            'https://testapi.mngkargo.com.tr/mngapi/api/identityapi/v1/token',
            {
                apiKey,
                securityString
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        // JWT token'ı başarıyla aldıysak client'a gönderiyoruz
        res.json({ token: response.data.token });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: 'Token alma başarısız', error: error.response?.data || error.message });
    }
}

exports.create_order = async (req, res) => {
    const JWT_TOKEN = process.env.JWT_TOKEN;
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;

    // Sipariş verisi (orderData)
    const orderData = {
        order: {
            referenceId: 'SIPARIS34567',
            barcode: 'SIPARIS34567',
            billOfLandingId: 'İrsaliye 1',
            isCOD: 0,
            codAmount: 0,
            shipmentServiceType: 1,
            packagingType: 1,
            content: 'İçerik 1',
            smsPreference1: 1,
            smsPreference2: 0,
            smsPreference3: 0,
            paymentType: 1,
            deliveryType: 1,
            description: 'Açıklama 1',
            marketPlaceShortCode: '',
            marketPlaceSaleCode: '',
            pudoId: '',
        },
        orderPieceList: [
            {
                barcode: 'SIPARIS34567_PARCA1',
                desi: 2,
                kg: 1,
                content: 'Parça açıklama 1',
            },
            {
                barcode: 'SIPARIS34567_PARCA2',
                desi: 2,
                kg: 3,
                content: 'Parça açıklama 2',
            },
        ],
        recipient: {
            customerId: 58513278,
            refCustomerId: '',
            cityCode: 0,
            cityName: '',
            districtName: '',
            districtCode: 0,
            address: '',
            bussinessPhoneNumber: '',
            email: '',
            taxOffice: '',
            taxNumber: '',
            fullName: '',
            homePhoneNumber: '',
            mobilePhoneNumber: '',
        },
    };

    // API'ye yapılacak istek için gerekli ayarları yapıyoruz.
    const options = {
        method: 'POST',
        url: 'https://testapi.mngkargo.com.tr/mngapi/api/standardcmdapi/createOrder',
        headers: {
            'X-IBM-Client-Id': CLIENT_ID,
            'X-IBM-Client-Secret': CLIENT_SECRET,
            'x-api-version': 'zucjutpo', // Versiyonu doğru kullanmalısınız.
            'Authorization': `Bearer ${JWT_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(orderData),
    };

    // Dış API'ye istek gönderiyoruz
    request(options, function (error, response, body) {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (response.statusCode === 200) {
            return res.status(200).json({ message: 'Order Created Successfully', data: JSON.parse(body) });
        } else {
            return res.status(response.statusCode).json({ error: body });
        }
    });
}


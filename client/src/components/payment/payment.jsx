import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createPaymentThunk } from '../../features/thunks/paymentThunk';
import { getCartThunk } from '../../features/thunks/cartThunk';
import { getMyUserDetailsThunk } from '../../features/thunks/userDetailsThunk';
import { getMyOrderDetailsThunk } from '../../features/thunks/orderThunk';
import { clearAlert } from '../../features/slices/paymentSlice';
import image from '../../assets/images/payment.png'

export default function Payment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { order } = useSelector(state => state.order);
    const { userDetails } = useSelector(state => state.userDetails);
    const { cart } = useSelector((state) => state.cart);
    const { alert } = useSelector((state) => state.payment)

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getMyUserDetailsThunk()).unwrap();
            if (order?.order?.id) {
                await dispatch(getMyOrderDetailsThunk(order.order.id)).unwrap();
            }
            await dispatch(getCartThunk()).unwrap();
        };
        fetchData();
    }, [dispatch, order?.order?.id]);  // Bağımlılık dizisi eklendi


    const [cardNumber, setCardNumber] = useState('');
    const [expireMonth, setExpireMonth] = useState('');
    const [expireYear, setExpireYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [holderName, setHolderName] = useState('');
    const [response, setResponse] = useState('');


    const handlePayment = async (e) => {
        e.preventDefault();
        const paymentCard = {
            cardHolderName: holderName,
            cardNumber: cardNumber,
            expireMonth: expireMonth,
            expireYear: expireYear,
            cvc: cvc,
            registerCard: '0'
        };

        const buyer = {
            id: userDetails.id,
            name: userDetails.firstName,
            surname: userDetails.lastName,
            gsmNumber: userDetails.phoneNumber,
            email: userDetails.email,
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: userDetails.address,
            ip: '**.**.**.**',
            city: userDetails.city,
            country: 'Turkey',
            zipCode: userDetails.zipCode
        };

        const shippingAddress = {
            contactName: userDetails.firstName,
            city: userDetails.city,
            country: 'Turkey',
            address: userDetails.address,
            zipCode: userDetails.zipCode
        };

        const billingAddress = {
            contactName: userDetails.firstName,
            city: userDetails.city,
            country: 'Turkey',
            address: userDetails.address,
            zipCode: userDetails.zipCode
        };

        const basketItems = [
            {
                id: 'BI101',
                name: 'Binocular',
                category1: 'Collectibles',
                category2: 'Accessories',
                itemType: 'PHYSICAL',
                price: '0.3'
            }
        ];

        const paymentData = {
            price: '0.3',
            paidPrice: '0.3',
            currency: 'TRY',
            basketId: cart[0].id,
            paymentCard: paymentCard,
            buyer: buyer,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            basketItems: basketItems
        };

        const action = await dispatch(createPaymentThunk(paymentData)).unwrap();
        console.log("Ödeme Başarılı:", action);
        setTimeout(() => {
            navigate('/'); // Ana sayfaya yönlendir
            dispatch(clearAlert()); // Alerti temizle
        }, 1000);
        setResponse(action);
    };

    const totalPrice = cart.reduce((total, item) => total + item.products?.price * item.quantity, 0);
    const shippingFee = 15; // Kargo ücreti
    const grandTotal = totalPrice + shippingFee; // Genel toplam (Sepet + Kargo)

    // Genel Toplam Hesaplaması
    const allItemsTotal = cart.reduce((total, item) => total + (item.products?.price * item.quantity), 0);
    const generalTotal = allItemsTotal + shippingFee;

    return (
        <div className='container mt-5' >
            <div className='row'>
                <div className='col-md-8'>
                    <h2 className='mb-4 text-center'>Ödeme Bilgileri</h2>
                    <div className='card p-4 mb-3' style={{ backgroundColor: '#2a2a2a', color: '#fff', borderRadius: '10px', position: 'relative' }}>
                        <div className='mb-2'>CARDHOLDER</div>
                        <div className='fs-5'>{cardNumber ? cardNumber.replace(/\d{4}(?=\d)/g, '$& ') : '**** **** **** ****'}</div>
                        <div className='d-flex justify-content-between mt-3'>
                            <div>
                                <small>Expire</small>
                                <div>{expireMonth && expireYear ? `${expireMonth}/${expireYear}` : 'MM/YY'}</div>
                            </div>
                            <div>
                                <small>CVC</small>
                                <div>{cvc ? cvc : '***'}</div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <small>Holder Name</small>
                            <div>{holderName ? holderName : 'Full Name'}</div>
                        </div>
                        <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '24px' }}>💳</div>
                    </div>
                    <form className='shadow p-4 rounded bg-light'>
                        <div className='mb-3'>
                            <label className='form-label'>Kart Numarası</label>
                            <input type='text' className='form-control' placeholder='**** **** **** ****' maxLength='16' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label className='form-label'>Son Kullanma Ayı</label>
                                <input type='text' className='form-control' placeholder='MM' maxLength='2' value={expireMonth} onChange={(e) => setExpireMonth(e.target.value)} />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>Son Kullanma Yılı</label>
                                <input type='text' className='form-control' placeholder='YY' maxLength='2' value={expireYear} onChange={(e) => setExpireYear(e.target.value)} />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>CVC</label>
                            <input type='text' className='form-control' placeholder='***' maxLength='3' value={cvc} onChange={(e) => setCvc(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Kart Sahibi</label>
                            <input type='text' className='form-control' placeholder='Ad Soyad' value={holderName} onChange={(e) => setHolderName(e.target.value)} />
                        </div>
                        <button className='btn btn-success w-100' onClick={handlePayment}>Ödemeyi Tamamla</button>
                    </form>
                    {alert.message && (
                        <div className={`alert alert-${alert.type}`} role="alert">
                            {alert.message}
                        </div>
                    )}
                </div>
                <div className='col-md-4 mt-5 mt-md-0'>
                    <div className='card shadow-lg p-4'>
                        <h3 className='mb-4 fw-bold text-dark border-bottom pb-2' style={{ borderColor: '#ddd' }}>Sepet Özeti</h3>
                        <ul className='list-unstyled'>
                            {cart.length > 0 ? cart.map((item) => (
                                <li key={item.id} className='mb-3'>
                                    <div className='d-flex align-items-center shadow-sm p-2 rounded' style={{ backgroundColor: '#f9f9f9' }} onClick={() => navigate(`/product/${item.productId}`)}>
                                        <img
                                            src={item.products?.images[0]?.imageUrl || "/placeholder.jpg"}
                                            alt={item.products.name}
                                            className='rounded me-3'
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                                        />
                                        <div>
                                            <h6 className='fw-bold mb-1'>{item.products.name}</h6>
                                            <p className='mb-1 text-muted'>Beden: {item.sizes.name}</p>
                                            <p className='mb-1 text-muted'>Adet: {item.quantity}</p>
                                            <p className='mb-1 text-muted'>Fiyat: {item.products?.price}₺</p>
                                            <p className='mb-0 fw-bold text-dark'>Toplam: {(item.products?.price * item.quantity).toFixed(2)}₺</p>
                                        </div>
                                    </div>
                                </li>
                            )) : <li className='text-muted'>Sepetiniz boş.</li>}
                        </ul>
                        <Link to='/cart' className='btn btn-outline-dark w-100 mt-1'>
                            Siparişi Düzenle
                        </Link>
                    </div>
                    <div className='card shadow-lg p-4 mt-4' style={{ backgroundColor: '#fff' }}>
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <p className='mb-0' style={{ fontSize: "1.1rem", color: "#777" }}>Sepet Toplamı:</p>
                            <strong style={{ fontSize: "1.3rem", color: "#333" }}>{totalPrice.toFixed(2)}₺</strong>
                        </div>

                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <p className='mb-0' style={{ fontSize: "1.1rem", color: "#777" }}>Kargo Ücreti:</p>
                            <strong style={{ fontSize: "1.1rem", color: "#333" }}>15₺</strong>
                        </div>

                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0' style={{ fontSize: "1.1rem", color: "#777" }}>Genel Toplam:</p>
                            <strong style={{ fontSize: "1.3rem", color: "#000" }}>
                                {grandTotal.toFixed(2)}₺
                            </strong>
                        </div>
                    </div>



                </div>
            </div>
            <div className="text-center mt-5">
                <img src={image} alt="Güvenli Ödeme" style={{ width: "100%", maxHeight: "100px", objectFit: "cover" }} />
                <p className="text-muted mt-4">Ödemeleriniz SSL ile korunmaktadır.</p>
            </div>

        </div >
    )
}
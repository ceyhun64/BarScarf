import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartThunk } from '../../features/thunks/cartThunk';
import { useNavigate, Link } from 'react-router-dom';
import { createOrderThunk } from '../../features/thunks/orderThunk';
import UserDetailsForm from '../../components/user/userDetails';

export default function Order() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCartThunk());
    }, [dispatch]);

    const handleCreateOrder = async () => {
        const action = await dispatch(createOrderThunk()).unwrap();
        if (action.message === "Sipariş başarıyla oluşturuldu") {
            navigate('/payment');
        }
    };

    const { cart } = useSelector((state) => state.cart);

    // Sepet toplamını hesapla
    const totalPrice = cart.reduce((total, item) => total + item.products?.price * item.quantity, 0);
    const shippingFee = 15; // Kargo ücreti
    const grandTotal = totalPrice + shippingFee; // Genel toplam (Sepet + Kargo)

    // Genel Toplam Hesaplaması
    const allItemsTotal = cart.reduce((total, item) => total + (item.products?.price * item.quantity), 0);
    const generalTotal = allItemsTotal + shippingFee;

    return (
        <div className='container mt-5'>
            <div className='row'>
                {/* Kullanıcı Bilgileri */}
                <div className='col-md-8 mb-5 mb-md-0'>
                    <div className='p-4 rounded shadow-lg' style={{ backgroundColor: '#fffbe6', border: '1px solid #f0d98c' }}>
                        <h3 className='fw-bold mb-4' style={{ color: '#B8860B' }}>Teslimat Bilgileri</h3>
                        <UserDetailsForm />
                    </div>
                </div>

                {/* Sepet Özeti */}
                <div className='col-md-4'>
                    <div className='card shadow-lg p-4' style={{ backgroundColor: '#fff' }}>
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
                                            <p className='mb-1 text-muted'>Adet: {item.quantity}</p>
                                            <p className='mb-1 text-muted'>Fiyat: {item.products?.price}₺</p>
                                            <p className='mb-0 fw-bold text-dark'>Toplam: {(item.products?.price * item.quantity).toFixed(2)}₺</p>
                                        </div>
                                    </div>
                                </li>
                            )) : <li className='text-muted'>Sepetiniz boş.</li>}
                        </ul>

                        <Link to='/cart' className='btn btn-outline-dark w-100 mt-3'>
                            Sepeti Düzenle
                        </Link>
                    </div>

                    {/* Sepet Toplamı */}
                    <div className='card shadow-lg p-4 mt-4' style={{ backgroundColor: '#fff' }}>
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <p className='mb-0' style={{ fontSize: "1.1rem", color: "#333" }}>Sepet Toplamı:</p>
                            <strong style={{ fontSize: "1.3rem" }}>{totalPrice.toFixed(2)}₺</strong>
                        </div>

                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <p className='mb-0' style={{ fontSize: "1.1rem", color: "#333" }}>Kargo Ücreti:</p>
                            <strong style={{ fontSize: "1.1rem" }}>15₺</strong>
                        </div>

                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0' style={{ fontSize: "1.1rem", color: "#333" }}>Genel Toplam:</p>
                            <strong style={{ fontSize: "1.3rem", color: "#D3AF37" }}>
                                {grandTotal.toFixed(2)}₺
                            </strong>
                        </div>
                    </div>


                    {/* Siparişi Onayla Butonu */}
                    <div className='mt-4'>
                        <button
                            className='btn w-100 py-3 fw-bold'
                            onClick={handleCreateOrder}
                            style={{
                                backgroundColor: '#964B00',
                                color: '#fff',
                                fontSize: '1.1rem',
                                border: 'none',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                transition: '0.3s',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#b7912f')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#964B00')}
                        >
                            Ödeme Sayfasına Git
                            <i className='bi bi-credit-card ms-2'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

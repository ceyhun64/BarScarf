import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams,Link } from "react-router-dom";
import { getOrderDetailsThunk } from '../../features/thunks/orderThunk';
import { getUserDetailsByIdThunk } from '../../features/thunks/userDetailsThunk';
import AdminSidebar from './adminSideBar';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function OrderDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state.order);
    const { userDetails } = useSelector((state) => state.userDetails);  // Kullanıcı bilgilerini Redux'tan alıyoruz

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderAction = await dispatch(getOrderDetailsThunk(id)).unwrap();
                if (orderAction && orderAction.length > 0) {
                    const userId = orderAction[0].order.userId;
                    await dispatch(getUserDetailsByIdThunk(userId)).unwrap();
                } else {
                    console.error('Sipariş verisi alınamadı.');
                }
            } catch (error) {
                console.error('Veri çekerken hata oluştu:', error);
            }
        };
        fetchOrderDetails();
    }, [dispatch, id]);

    const orderInfo = order?.[0]?.order;

    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return <span className="badge bg-warning text-dark">Beklemede</span>;
            case "shipped":
                return <span className="badge bg-info text-dark">Kargoda</span>;
            case "delivered":
                return <span className="badge bg-success">Teslim Edildi</span>;
            case "cancelled":
                return <span className="badge bg-danger">İptal Edildi</span>;
            default:
                return <span className="badge bg-secondary">{status}</span>;
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
            <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                                <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                            </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-4">
                            <h2 className="mb-4 border-bottom pb-2">Sipariş Detayları</h2>

                            {orderInfo ? (
                                <div className="mb-4">
                                    <p><strong>Sipariş ID:</strong> #{orderInfo.id}</p>
                                    <p><strong>Durum:</strong> {getStatusBadge(orderInfo.status)}</p>
                                    <p><strong>Toplam Tutar:</strong> {orderInfo.totalPrice} ₺</p>
                                    <p><strong>Sipariş Tarihi:</strong> {orderInfo.createdAt.slice(0, 10)}</p>
                                </div>
                            ) : (
                                <p>Sipariş bilgileri yükleniyor...</p>
                            )}

                            {userDetails ? (
                                <div className="mt-4">
                                    <h5 className="border-bottom pb-2">Kullanıcı Bilgileri</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Ad:</strong> {userDetails.firstName}</p>
                                            <p><strong>Soyad:</strong> {userDetails.lastName}</p>
                                            <p><strong>Email:</strong> {userDetails.email}</p>
                                            <p><strong>Telefon:</strong> {userDetails.phoneNumber}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Adres:</strong> {userDetails.address}</p>
                                            <p><strong>Şehir:</strong> {userDetails.city}</p>
                                            <p><strong>İlçe:</strong> {userDetails.district}</p>
                                            <p><strong>Posta Kodu:</strong> {userDetails.zipCode}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Kullanıcı bilgileri yükleniyor...</p>
                            )}

                            <h5 className="mt-4 border-bottom pb-2">Ürünler</h5>
                            <div className="table-responsive">
                                <table className="table table-bordered align-middle mt-3">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Ürün Adı</th>
                                            <th>Renk</th>
                                            <th>Adet</th>
                                            <th>Birim Fiyat</th>
                                            <th>Ara Toplam</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.product.name}</td>
                                                <td>{item.product.color}</td>
                                                <td>{item.quantity}</td>
                                                <td>{parseFloat(item.priceAtPurchase).toFixed(2)} ₺</td>
                                                <td>{(item.quantity * parseFloat(item.priceAtPurchase)).toFixed(2)} ₺</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate ,Link} from 'react-router-dom';
import { getOrdersThunk } from '../../features/thunks/orderThunk';
import AdminSidebar from './adminSideBar';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function Orders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector((state) => state.order);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getOrdersThunk()).unwrap();
        };
        fetchData();
    }, [dispatch]);

    const handleClick = (id) => {
        navigate(`/admin/order/${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete order with ID: ${id}`);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return <span className="badge bg-warning text-dark">Beklemede</span>;
            case "shipped":
                return <span className="badge bg-info text-dark">Kargoda</span>;
            case "completed":
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
                    <h2 className="text-center mb-4">Sipariş Yönetimi</h2>

                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h5 className="card-title">Tüm Siparişler</h5>
                            <p className="mb-3">
                                Toplam Sipariş: <strong>{orders.length}</strong>
                            </p>

                            <div className="table-responsive">
                                <table className="table table-bordered table-hover align-middle">
                                    <thead className="table-light text-center">
                                        <tr>
                                            <th>ID</th>
                                            <th className="d-none d-sm-table-cell">Kullanıcı</th>
                                            <th>Toplam</th>
                                            <th>Durum</th>
                                            <th className="d-none d-md-table-cell">Tarih</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.length > 0 ? (
                                            orders.map((order) => (
                                                <tr key={order.id}>
                                                    <td>#{order.id}</td>
                                                    <td className="d-none d-sm-table-cell">{order.userId}</td>
                                                    <td>{parseFloat(order.totalPrice).toFixed(2)} ₺</td>
                                                    <td>{getStatusBadge(order.status)}</td>
                                                    <td className="d-none d-md-table-cell">
                                                        {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-wrap gap-1 justify-content-center">
                                                            <button
                                                                className="btn btn-outline-primary btn-sm"
                                                                onClick={() => handleClick(order.id)}
                                                            >
                                                                <i className="bi bi-eye"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                onClick={() => handleDelete(order.id)}
                                                            >
                                                                <i className="bi bi-trash-fill"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">Sipariş bulunamadı</td>
                                            </tr>
                                        )}
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

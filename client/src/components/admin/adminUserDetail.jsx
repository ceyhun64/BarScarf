import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getUserDetailsByIdThunk } from "../../features/thunks/userDetailsThunk";
import AdminSidebar from './adminSideBar';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function AdminUserDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();

    // Kullanıcı detaylarını store'dan çekiyoruz
    const { userDetails } = useSelector((state) => state.userDetails);

    useEffect(() => {
        dispatch(getUserDetailsByIdThunk(id));
    }, [dispatch, id]);

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <Link className="fs-2 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4 text-dark font-weight-bold">Kullanıcı Detayları</h2>
                    <div className="card shadow-lg p-4">
                        {/* Close Button */}
                        <Link to="/admin/users" className="text-end">
                            <i
                                className="bi bi-x-circle-fill text-dark"
                                style={{
                                    fontSize: "30px",
                                    cursor: "pointer",
                                    transition: "color 0.3s ease",
                                }}
                                onMouseEnter={(e) => (e.target.style.color = '#dc3545')}
                                onMouseLeave={(e) => (e.target.style.color = '#000')}
                            ></i>
                        </Link>

                        {/* Kullanıcı bilgileri gelene kadar loading gösterebiliriz */}
                        {!userDetails ? (
                            <div className="d-flex justify-content-center align-items-center flex-column">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Yükleniyor...</span>
                                </div>
                                <p className="mt-3">Veriler yükleniyor...</p>
                            </div>
                        ) : (
                            <div>
                                <div className="row">
                                    {/* Kullanıcı Detayları */}
                                    {[
                                        { label: "Ad", value: userDetails.firstName },
                                        { label: "Soyad", value: userDetails.lastName },
                                        { label: "Telefon Numarası", value: userDetails.phoneNumber },
                                        { label: "E-posta", value: userDetails.email },
                                        { label: "Adres", value: userDetails.address },
                                        { label: "Şehir", value: userDetails.city },
                                        { label: "İlçe", value: userDetails.district },
                                        { label: "Posta Kodu", value: userDetails.zipCode },
                                    ].map((field, index) => (
                                        <div className="col-md-6 mb-3" key={index}>
                                            <div className="d-flex justify-content-between">
                                                <label className="form-label fw-bold" htmlFor={field.label}>
                                                    {field.label}
                                                </label>
                                            </div>
                                            <div className="form-control-plaintext p-3 bg-light rounded">
                                                {field.value || "Bilgi bulunamadı"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

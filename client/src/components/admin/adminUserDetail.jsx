import React, { useEffect } from 'react';//react ve useffect dahil ettik
import { useDispatch, useSelector } from "react-redux";//useDispatch ve useSelector hook'larını dahil ettik
import { useParams, Link } from "react-router-dom";//useParams ve Link bileşenlerini dahil ettik
import { getUserDetailsByIdThunk } from "../../features/thunks/userDetailsThunk";//getUserDetailsByIdThunk fonksiyonunu dahil ettik
import AdminSidebar from './adminSideBar';//AdminSidebar bileşenini dahil ettik
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function AdminUserDetail() {
    const dispatch = useDispatch();//useDispatch hook'unu kullanarak dispatch fonksiyonunu oluşturduk
    const { id } = useParams();

    // Kullanıcı detaylarını store'dan çekiyoruz
    const { userDetails } = useSelector((state) => state.userDetails);//userDetails state'ini kullanarak kullanıcı detaylarını çektik

    //useEffect hook'unu kullanarak kullanıcı detaylarını çektik
    useEffect(() => {
        dispatch(getUserDetailsByIdThunk(id));//getUserDetailsByIdThunk fonksiyonunu kullanarak kullanıcı detaylarını çektik
    }, [dispatch, id]);//dispatch ve id'ydeğiştiğinde useEffect hook'u çalışacak

    return (
        
        <div className="container mt-5 mb-5">
            {/* Row */}
            <div className="row">
                {/* logo */}
                <Link className="fs-2 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    {/* Kullanıcı Detayları */}
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

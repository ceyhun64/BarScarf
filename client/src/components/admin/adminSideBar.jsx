import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';

export default function AdminSidebar() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("favorites");
        navigate("/admin");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="d-md-none mb-3">
                <button
                    className="btn btn-dark w-100"
                    onClick={toggleMenu}
                >
                    <i className="bi bi-list me-2"></i> Menü
                </button>
            </div>

            {/* Sidebar */}
            <div className={`col-md-3 ${menuOpen ? 'd-block' : 'd-none'} d-md-block`}>
                <div className="mt-3">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-body text-center">
                            <h4 className="mb-3 fw-bold text-black">Merhaba, {username}!</h4>
                        </div>
                        <div className="list-group list-group-flush">
                            <Link to="/admin/products" className="list-group-item list-group-item-action d-flex align-items-center">
                                <i className="bi bi-box me-3 fs-5"></i> Ürünler
                            </Link>
                            <Link to="/admin/users" className="list-group-item list-group-item-action d-flex align-items-center">
                                <i className="bi bi-person me-3 fs-5"></i> Kullanıcılar
                            </Link>
                            <Link to="/admin/categories" className="list-group-item list-group-item-action d-flex align-items-center">
                                <i className="bi bi-cart me-3 fs-5"></i> Kategoriler
                            </Link>
                            <Link to="/admin/orders" className="list-group-item list-group-item-action d-flex align-items-center">
                                <i className="bi bi-inbox-fill me-3 fs-5"></i> Siparişler
                            </Link>
                            <Link to="/admin/subscribe" className="list-group-item list-group-item-action d-flex align-items-center">
                                <i className="bi bi-envelope-plus me-3 fs-5"></i> Aboneler
                            </Link>
                        </div>
                        <div className="card-footer bg-white text-center">
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-dark w-100 fw-bold"
                                style={{ borderRadius: "6px" }}
                            >
                                <i className="bi bi-box-arrow-right me-2"></i> Çıkış Yap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

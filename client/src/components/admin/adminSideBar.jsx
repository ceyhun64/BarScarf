import React, { useState } from "react";//react ve useState eklendi
import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
    const navigate = useNavigate();//useNavigate hook'unu kullanarak navigate fonksiyonunu oluşturduk
    const username = localStorage.getItem("username");//username'i localStorage'dan aldık
    const [menuOpen, setMenuOpen] = useState(false);//menuOpen'u useState ile oluşturduk ve başlangıçta false olarak ayarladık

    const handleLogout = () => {//logout fonksiyonu oluşturduk
        localStorage.removeItem("token");//token'ı localStorage'dan kaldırdık
        localStorage.removeItem("username");//username'ı localStorage'dan kaldırdık
        localStorage.removeItem("favorites");//favorites'ı localStorage'dan kaldırdık
        navigate("/admin");//admin sayfasına yönlendirdik
    };

    const toggleMenu = () => {//menuOpen'u toggle etmek için fonksiyon oluşturduk
        setMenuOpen(!menuOpen);//menuOpen'u tersine çeviriyoruz
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="d-md-none mb-3">
                {/* menuOpen'u toggle etmek için fonksiyonu çağırdık */}
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
                            <Link to="/admin/home" className="list-group-item list-group-item-action d-flex align-items-center">
                                <i className="bi bi-house me-3 fs-5"></i>Anasayfa
                            </Link>
                        </div>
                        {/* Logout button */}
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

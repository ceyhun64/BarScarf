import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetailsForm from "./userDetails";
import Favorites from "../favorites/favorites";
import Login from "../auth/login";

export default function Panel() {
    const [activeTab, setActiveTab] = useState('userdetails');
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("favorites");
        navigate("/");
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const activeTabStyle = {
        backgroundColor: '#D3AF37', // Altın rengi
        color: 'white',
        fontWeight: 'bold',
        border: 'none',
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Mobil Menü */}
                <div className="col-12 d-md-none mb-3">
                    <select
                        className="form-select"
                        value={activeTab}
                        onChange={(e) => handleTabClick(e.target.value)}
                    >
                        <option value="userdetails">👤 Kullanıcı Bilgilerim</option>
                        <option value="orders">📦 Geçmiş Siparişlerim</option>
                        <option value="favorites">❤️ Favorilerim</option>
                        <option value="account">🔐 Giriş Bilgilerim</option>
                    </select>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-dark w-100 mt-2"
                    >
                        Oturumu Kapat
                    </button>
                </div>

                {/* Sol Menü (sadece büyük ekranlarda gösterilir) */}
                <div className="col-md-3 d-none d-md-block mb-4">
                    <h5 className="text-center text-md-start mb-4">Merhaba <strong>{username}</strong>!</h5>
                    <div className="list-group">
                        <button
                            className={`list-group-item list-group-item-action ${activeTab === 'userdetails' ? 'active' : ''}`}
                            onClick={() => handleTabClick('userdetails')}
                            style={activeTab === 'userdetails' ? activeTabStyle : {}}
                        >
                            <i className="bi bi-person me-2"></i> Kullanıcı Bilgilerim
                        </button>
                        <button
                            className={`list-group-item list-group-item-action ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => handleTabClick('orders')}
                            style={activeTab === 'orders' ? activeTabStyle : {}}
                        >
                            <i className="bi bi-box me-2"></i> Geçmiş Siparişlerim
                        </button>
                        <button
                            className={`list-group-item list-group-item-action ${activeTab === 'favorites' ? 'active' : ''}`}
                            onClick={() => handleTabClick('favorites')}
                            style={activeTab === 'favorites' ? activeTabStyle : {}}
                        >
                            <i className="bi bi-heart me-2"></i> Favorilerim
                        </button>
                        <button
                            className={`list-group-item list-group-item-action ${activeTab === 'account' ? 'active' : ''}`}
                            onClick={() => handleTabClick('account')}
                            style={activeTab === 'account' ? activeTabStyle : {}}
                        >
                            <i className="bi bi-person-circle me-2"></i> Giriş Bilgilerim
                        </button>
                    </div>
                    <div className="d-grid mt-3">
                        <button onClick={handleLogout} className="btn btn-outline-dark">Oturumu Kapat</button>
                    </div>
                </div>

                {/* Sağ İçerik */}
                <div className="col-12 col-md-9">
                    <div className="p-3 shadow-sm bg-white rounded-3">
                        {activeTab === 'userdetails' && <UserDetailsForm />}
                        {activeTab === 'orders' && (
                            <div>
                                <h2>Siparişlerim</h2>
                                <p>Sipariş geçmişinizi burada görüntüleyebilirsiniz.</p>
                            </div>
                        )}
                        {activeTab === 'favorites' && <Favorites />}
                        {activeTab === 'account' && <Login />}
                    </div>
                </div>
            </div>
        </div>
    );
}

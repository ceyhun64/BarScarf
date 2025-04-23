import React from 'react';

export default function ShopServices() {
    return (
        <div
            style={{
                background: "linear-gradient(45deg, #ffffff, rgba(194, 134, 5, 0.2))",
                padding: "40px 0", // Yukarı ve aşağı boşluk artırıldı
                minHeight: "250px", // Minimum yükseklik eklendi
            }}
        >
            <div className="row text-center">
                {/* Ücretsiz Kargo */}
                <div className="col-md-3">
                    <i className="bi bi-truck" style={{ fontSize: "50px", color: "#D3AF37", marginBottom: "10px" }}></i>
                    <h5 style={{ color: "#D3AF37" }}>Ücretsiz Kargo</h5>
                    <p style={{ color: "#D3AF37" }}>Türkiye’nin her yerine ücretsiz kargo</p>
                </div>

                {/* Ücretsiz İade */}
                <div className="col-md-3">
                    <i className="bi bi-arrow-return-left" style={{ fontSize: "50px", color: "#D3AF37", marginBottom: "10px" }}></i>
                    <h5 style={{ color: "#D3AF37" }}>Ücretsiz İade</h5>
                    <p style={{ color: "#D3AF37" }}>Türkiye’nin her yerinden ücretsiz iade</p>
                </div>

                {/* Güvenli Ödeme */}
                <div className="col-md-3">
                    <i className="bi bi-credit-card" style={{ fontSize: "50px", color: "#D3AF37", marginBottom: "10px" }}></i>
                    <h5 style={{ color: "#D3AF37" }}>Güvenli Ödeme</h5>
                    <p style={{ color: "#D3AF37" }}>İyzico, Visa, Mastercard, Troy</p>
                </div>

                {/* İletişim */}
                <div className="col-md-3">
                    <i className="bi bi-telephone-fill" style={{ fontSize: "50px", color: "#D3AF37", marginBottom: "10px" }}></i>
                    <h5 style={{ color: "#D3AF37" }}>İletişim</h5>
                    <p style={{ color: "#D3AF37" }}>Showroom: 0216 318 18 18</p>
                </div>
            </div>
        </div>
    );
}

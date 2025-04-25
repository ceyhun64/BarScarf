import React from "react";

export default function Whatsapp() {
    const handleClick = () => {
        window.open("https://wa.me/+905432266322", "_blank", "noopener noreferrer");
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: 'fixed',
                bottom: '40px',
                left: '40px',
                width: '50px',
                height: '50px',
                backgroundColor: '#25D366',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s',
                zIndex: 9999,
                display: 'flex',           // Flexbox eklendi
                alignItems: 'center',      // Dikeyde ortala
                justifyContent: 'center',  // Yatayda ortala
                padding: 0,                // Varsayılan padding kaldırıldı
            }}>
            <i className="bi bi-whatsapp" style={{ color: 'white', fontSize: '28px' }}></i>
        </button>

    );
}

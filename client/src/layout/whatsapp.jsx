import React from "react";

export default function Whatsapp() {
    const handleClick = () => {
        window.open("https://wa.me/+905432266322", "_blank", "noopener noreferrer");
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: 'fixed',  // Sabit konumda olacak
                bottom: '40px',     // Alt kısımdan 30px uzaklık
                left: '40px',      // Sol kısımdan 30px uzaklık
                width: '50px',      // Butonun genişliği
                height: '50px',     // Butonun yüksekliği
                backgroundColor: '#25D366', // Butonun rengi
                color: '#white',     // İkonun rengi, WhatsApp yeşili
                border: 'none',      // Kenarlık yok
                borderRadius: '50%', // Tam daire şekli için borderRadius %50
                fontSize: '24px',    // Font boyutu
                cursor: 'pointer',   // Farenin el simgesi olması için
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Gölgelendirme efekti
                transition: 'background-color 0.3s', // Buton üzerine gelince renk değişimi
                zIndex: 9999,        // Butonu en üstte tutmak için
            }}>
            <i className="bi bi-whatsapp" style={{ color: 'white', fontSize: '28px' }}></i>
        </button>
    );
}

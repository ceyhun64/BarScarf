import React from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/images/payment.png"

export default function Footer() {
  return (
    <footer className="text-dark border-top pt-5 pb-3"
      style={{
        background: "linear-gradient(45deg, #ffffff, rgba(255, 255, 255, 0.36))",
        padding: "40px 0", // Yukarı ve aşağı boşluk artırıldı
        minHeight: "250px", // Minimum yükseklik eklendi
      }}
    >
      <div className="container">

        <div className="row gy-4">
          {/* Marka ve Açıklama */}
          <div className="col-md-4">
            <h3 className="fw-bold" style={{ color: "#964B00" }}>BARSCARF</h3> {/* Daha koyu renk */}
            <p style={{ color: "#D3AF37" }}>
              Barscarf, eşarp ve kadın kıyafetleri konusunda uzmanlaşmış, en kaliteli ürünleri uygun fiyatlarla sunan bir online alışveriş platformudur. Şıklığı ve zarafeti bir arada sunarak, kadınların tarzını yansıtan modern koleksiyonlar ile moda dünyasında fark yaratıyoruz.
            </p>
          </div>

          {/* Linkler */}
          <div className="col-md-4">
            <h5 className="fw-semibold mb-3" style={{ color: "#D3AF37" }}>Bağlantılar</h5>
            <ul className="list-unstyled" style={{ lineHeight: '1.8' }}>
              <li><Link to="/about" className="text-decoration-none" style={{ color: "#D3AF37" }}>Biz Kimiz</Link></li>
              <li><Link to="/contact" className="text-decoration-none" style={{ color: "#D3AF37" }}>İletişim</Link></li>
              <li><Link to="/privacy" className="text-decoration-none" style={{ color: "#D3AF37" }}>Gizlilik Politikası</Link></li>
              <li><Link to="/terms" className="text-decoration-none" style={{ color: "#D3AF37" }}>Kullanım Şartları</Link></li>
            </ul>
          </div>

          {/* İletişim ve Sosyal */}
          <div className="col-md-4">
            <h5 className="fw-semibold mb-3" style={{ color: "#D3AF37" }}>Bize Ulaşın</h5>
            <p style={{ color: "#D3AF37" }}>
              <i className="bi bi-telephone-fill me-2"></i> +90 543 226 63 22 <br />
              <i className="bi bi-envelope-fill me-2"></i> support@barscarf.com
            </p>

            <div className="d-flex gap-3 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook" style={{ fontSize: '1.5rem', color: "#D3AF37" }}></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter" style={{ fontSize: '1.5rem', color: "#D3AF37" }}></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram" style={{ fontSize: '1.5rem', color: "#D3AF37" }}></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin" style={{ fontSize: '1.5rem', color: "#D3AF37" }}></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-4 mt-5">
        <img
          src={image}
          alt="Payment"
          style={{
            width: "100%",      // Görselin genişliğini %100 yapıyoruz
            maxWidth: "500px",  // Maksimum genişlik 500px olacak
            height: "auto",     // Yükseklik orantılı olarak ayarlanacak
            objectFit: "contain" // Görselin kesilmesini engellemek için
          }}
        />
      </div>
      {/* Alt Bilgi ve Çizgi Ayırıcı */}
      <div className="border-top mt-3 pt-3">
        <div className="text-center">
          <p style={{ color: "#B38B00" }}>
            © 2025 Barscarf.com Tüm Hakları Saklıdır. | Powered by  <a href="https://bionluk.com/ceyhunturkmen" target="_blank" style={{ color: "#964B00", textDecoration: "none", fontWeight: "bold" }}>Ceyhun Türkmen</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";  // useNavigate importu
import banner1 from "../../assets/images/11.jpg";
import banner2 from "../../assets/images/12.jpg";
import banner3 from "../../assets/images/14.jpg";

export default function HomeSlider() {
  const navigate = useNavigate();  // useNavigate hook'unu kullanıyoruz

  const slides = [
    {
      img: banner1,
      title: "Şıklığın Yeni Adresi",
      subtitle: "Yeni sezon ürünlerle tarzını yansıt!",
    },
    {
      img: banner2,
      title: "Moda Tutkunları İçin",
      subtitle: "Her tarza uygun şıklık burada.",
    },
    {
      img: banner3,
      title: "BARSCARF ile Işılda",
      subtitle: "Altın dokunuşlarla stilini tamamla.",
    },
  ];

  const handleSlideClick = () => {
    // Yönlendirme işlemi, /products sayfasına yönlendirir
    navigate("/products");
  };

  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{
              height: "80vh",
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
            }}
            onClick={handleSlideClick} // Tıklama olayı ile yönlendirme
          >
            <div
              className="d-flex h-100 align-items-center justify-content-center text-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            >
              <div
                className="text-light"
                style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
              >
                <h1 className="display-3 fw-bold" style={{ color: "#D3AF37" }}>
                  {slide.title}
                </h1>
                <p className="lead fs-5">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Göstergeler */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Önceki</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Sonraki</span>
      </button>
    </div>
  );
}

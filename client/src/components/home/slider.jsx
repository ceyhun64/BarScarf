import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";  // useNavigate importu
import { getSlidersThunk } from "../../features/thunks/sliderThunk";
import { useDispatch, useSelector } from "react-redux";

export default function HomeSlider() {
  const navigate = useNavigate();  // useNavigate hook'unu kullanıyoruz
  const dispatch = useDispatch();
  const { sliders } = useSelector((state) => state.slider);

   useEffect(() => {
        dispatch(getSlidersThunk());
    }, [dispatch]);

  const handleSlideClick = () => {
    navigate("/products");
  };

  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {sliders.map((slide, index) => (
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
                <p className="lead fs-5">{slide.description}</p>
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

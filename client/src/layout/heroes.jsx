import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getHeroesThunk } from "../features/thunks/sliderThunk";

export default function Heroes() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch();
    const { heroes } = useSelector((state) => state.slider); // Redux store'dan heroes verisi

    // Sayfa yüklendiğinde hero'ları getir
    useEffect(() => {
        dispatch(getHeroesThunk());
    }, [dispatch]);

    // 3 saniyede bir index güncelleme (slider)
    useEffect(() => {
        if (heroes.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % heroes.length);
            }, 3000); // 3 saniyede bir değişsin
            return () => clearInterval(interval); // Temizleme
        }
    }, [heroes]); // Hero sayısı değişirse yeniden başlat

    return (
        <div
            className="heroes-slider"
            style={{
                width: "100%",
                aspectRatio: "16/9", // Oranı koru
                overflow: "hidden",
                position: "relative",
                borderRadius: "10px",
                marginBottom: "20px",
            }}
        >
            <Link to="/products" style={{ textDecoration: "none" }}>
                {/* Verilerin geldiğinden emin olduktan sonra slider'ı render et */}
                {heroes.length > 0 ? (
                    heroes.map((hero, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundImage: `url(${hero.imageUrl})`, // hero'nun resmini kullan
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                opacity: currentIndex === index ? 1 : 0,
                                transition: "opacity 1s ease-in-out", // Geçiş animasyonu
                            }}
                        />
                    ))
                ) : (
                    <div>Loading...</div> // Veriler henüz gelmediyse loading gösterebilirsin
                )}
            </Link>
        </div>
    );
}

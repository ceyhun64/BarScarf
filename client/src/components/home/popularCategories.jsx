import React from "react";
import { Link } from "react-router-dom";
import image2 from "../../assets/images/category2.jpg";
import image3 from "../../assets/images/category3.jpg";
import image4 from "../../assets/images/category4.jpg";
import image5 from "../../assets/images/category5.jpg";

const popularCategories = [
    { id: 1, name: "Saten Eşarplar", image: image2 },
    { id: 2, name: "Desenli Baskılar", image: image3 },
    { id: 3, name: "Giyim Koleksiyonu", image: image4 },
    { id: 4, name: "Düz Renkler", image: image5 },
];

export default function PopularCategories() {
    return (
        <div className="py-1">
            <h4 className="text-center mb-4 mt-4" style={{ color: "#D3AF37", fontWeight: "600", fontSize: "24px" }}>
                Popüler Kategoriler
            </h4>
            <div className="row g-4 ms-2 me-2">
                {popularCategories.map((category) => (
                    <div className="col-12 col-md-3" key={category.id}>
                        <Link to={`/category/${category.id}`} className="text-decoration-none">
                            <div
                                className="card shadow-lg border-1 rounded-1 overflow-hidden"
                                style={{
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    position: "relative",
                                    height: "500px",  // Kart yüksekliği
                                }}
                            >
                                <img
                                    src={category.image}
                                    className="card-img-top"
                                    alt={category.name}
                                    style={{
                                        height: "100%",  // Resmin tam olarak kartı doldurması için
                                        objectFit: "cover",
                                        transition: "transform 0.3s ease",
                                    }}
                                />
                                <div
                                    className="card-body text-center"
                                    style={{
                                        position: "absolute",
                                        bottom: "0",
                                        left: "0",
                                        right: "0",
                                        background: "linear-gradient(45deg, #ffffff, rgba(194, 134, 5, 0.4))",
                                        padding: "20px",
                                    }}
                                >
                                    <h5
                                        className="card-title"
                                        style={{
                                            color: "#964B00",
                                            fontWeight: "500",
                                            fontSize: "1.2rem",
                                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.32)",
                                        }}
                                    >
                                        {category.name}
                                    </h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

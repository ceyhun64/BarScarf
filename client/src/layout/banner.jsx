import React from "react";
import { Link } from "react-router-dom";
import bannerImage from "../assets/images/banner.jpg";

export default function Banner() {
    return (
        <div className="banner" style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Link to="/products" style={{ textDecoration: "none" }}>
                <div
                    style={{
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: "10px",
                        position: "relative",
                    }}
                >
                    <img
                        src={bannerImage}
                        alt="Banner"
                        style={{
                            width: "100%",
                            height: "auto", // Genişliğe göre yükseklik ayarlanır
                            display: "block",
                        }}
                    />

                </div>
            </Link>
        </div>
    );
}

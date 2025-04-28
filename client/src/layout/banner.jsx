import React from "react";
import { Link } from "react-router-dom";
import bannerImage from "../assets/images/banner.jpg";

export default function Banner() {
  return (
    <div className="banner" style={{ marginTop: "20px" }}>
      <Link to="/products" style={{ textDecoration: "none" }}>
        <div
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            borderRadius: "10px",
          }}
        >
          Şimdi İndirimi Kaçırma!
        </div>
      </Link>
    </div>
  );
}

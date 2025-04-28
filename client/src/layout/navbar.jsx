import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import image from "../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png";
import Menu from "./menu"; // Menü bileşeni eklendi
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  const { cart } = useSelector((state) => state.cart);
  const cartItemCount = cart.length;

  useEffect(() => {
    const getUserName = () => {
      const user = localStorage.getItem("username");
      if (user) {
        setUserName(user);
      }
    };
    getUserName();
  }, []);

  return (
    <nav className="bg-white shadow-sm py-3" style={{ maxWidth: "100%" }}>
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        {/* Sol Menü + Logo ve Sağ Menü */}
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Menü Butonu ve Logo */}
          <div className="d-flex align-items-center gap-2">
            <Menu />
            <Link to="/" className="d-flex align-items-center">
              <img src={image} alt="Logo" width="200" height="60" />
            </Link>
          </div>

          {/* Sağ Menü: Favori, Sepet ve Kullanıcı */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/favorites" className="text-decoration-none me-1" style={{ color: "#D3AF37", fontSize: "1.3rem" }}>
              <i className="bi bi-heart-fill"></i>
            </Link>

            <Link to="/cart" className="position-relative text-decoration-none me-1" style={{ color: "#D3AF37", fontSize: "1.3rem" }}>
              <i className="bi bi-cart-fill"></i>
              {cartItemCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    backgroundColor: "#D3AF37",
                    fontSize: "12px",
                    color: "#fff",
                    padding: "0.25em 0.4em",
                  }}
                >
                  {cartItemCount}
                </span>
              )}
            </Link>

            <Link
              to={userName ? "/user" : "/login"}
              className="d-flex align-items-center text-decoration-none"
              style={{ color: "#964B00", fontSize: "0.95rem" }}
            >
              <i className="bi bi-person-fill me-1" style={{ fontSize: "1.2rem" }}></i>
              <span className="d-none d-sm-inline">{userName || "Oturum Aç"}</span>
            </Link>
          </div>
        </div>

        {/* Arama Kutusu */}
        <div className="search-bar w-100">
          <div className="flex-grow-1 position-relative" style={{ maxWidth: "500px" }}>
            <input
              type="text"
              className="form-control ps-5 py-2"
              placeholder="Ürün Ara"
              readOnly
              onClick={() => navigate("/search")}
              style={{
                cursor: "pointer",
                color: "#B0B0B0",
                border: "1px solid #D3AF37",
                backgroundColor: "white",
                borderRadius: "5px",
                fontSize: "0.9rem",
              }}
            />
            <i
              className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"
              style={{ pointerEvents: "none", color: "#D3AF37", fontSize: "1.1rem" }}
            ></i>
          </div>
        </div>
      </div>
    </nav>
  );
}

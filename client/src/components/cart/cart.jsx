import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductCartThunk, clearCartThunk, getCartThunk } from "../../features/thunks/cartThunk";
import { clearAlert } from "../../features/slices/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, alert, cartLoading } = useSelector((state) => state.cart); // cartLoading state'i burada

  const totalPrice = cart.reduce((total, item) => {
    return total + (parseFloat(item.products?.price || 0) * item.quantity);
  }, 0);

  // Verinin düzgün şekilde yüklenip yüklenmediğini kontrol et
  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await dispatch(getCartThunk()).unwrap();
        console.log("action:", action); // Veriyi kontrol et
      } catch (error) {
        console.error("Veri çekme hatası:", error); // Hata durumunda console'a yazdır
      }
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProductCartThunk(productId));
    setTimeout(() => {
      dispatch(clearAlert());
      dispatch(getCartThunk());
    }, 1000);
  };

  const handleUpdate = (productId) => {
    navigate(`/cart/edit/${productId}`);
  };

  const handleClearCart = async () => {
    dispatch(clearCartThunk());
    setTimeout(() => {
      dispatch(clearAlert());
      dispatch(getCartThunk());
    }, 1000);
  };

  // Yükleme durumunu kontrol et
  if (cartLoading) {
    return (
      <div className="text-center p-5">
        <h4>Yükleniyor...</h4>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='card shadow-lg p-4' style={{
      borderRadius: '15px',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="row justify-content-center">
        <div className="col-md-9">
          {alert.message && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}

          <div className="row">
            <div className="col-md-6 text-start mb-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-cart4 me-2" style={{ color: "#D3AF37", fontSize: "1.5rem" }}></i>
                <h2 className="m-0">Sepetim</h2>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <Link
                to="/products"
                className="btn text-white fw-semibold shadow-sm"
                style={{ backgroundColor: '#D3AF37' }}
              >
                <i className="bi bi-arrow-left me-2"></i> Alışverişe Devam Et
              </Link>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="text-center p-4">
              <h5 className="text-muted">Sepetiniz boş</h5>
            </div>
          ) : (
            <div className="row g-3">
              {cart.map((item) => (
                <div key={item.id} className="col-md-6 shadow-sm">
                  <div
                    className="card border-0 p-3 d-flex flex-row align-items-center cursor-pointer"
                    onClick={() => navigate(`/product/${item.productId}`)}
                  >
                    <img
                      src={item.products?.images[0]?.imageUrl || "/placeholder.jpg"}
                      alt={item.products?.name || "Ürün"}
                      className="rounded img-fluid"
                      style={{ width: "80px", height: "120px", objectFit: "cover", cursor: "pointer" }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="fw-bold ms-3">{item.products?.name || "Ürün Adı"}</h6>
                      <p className="mb-1 text-muted ms-3">Beden: {item.sizes?.name || "Beden Bilgisi Yok"}</p>
                      <p className="mb-1 text-muted ms-3">
                        Fiyat: {item.products?.price}₺
                      </p>
                      <p className="mb-1 text-muted ms-3">Adet: {item.quantity}</p>
                      <p className="mb-1 text-muted ms-3">Toplam: {(item.products?.price * item.quantity).toFixed(2)}₺</p>
                    </div>
                    <div className="d-flex flex-column">
                      <button
                        className="btn btn-outline-danger btn-sm mb-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.productId);
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdate(item.productId);
                        }}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sepet özeti - sağ panel */}
        {cart.length > 0 && (
          <div className="col-md-3 d-flex flex-column align-items-end gap-3 mt-5">
            <div className="w-100 p-4 border rounded-3 shadow-lg mb-3 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0" style={{ fontSize: "1.1rem", color: "#333" }}>Sepet Toplamı:</p>
                <strong style={{ fontSize: "1.3rem" }}>{totalPrice.toFixed(2)}₺</strong>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0" style={{ fontSize: "1.1rem", color: "#333" }}>Kargo Ücreti:</p>
                <strong style={{ fontSize: "1.1rem" }}>15₺</strong> {/* Kargo ücreti burada sabit olarak verilmiş */}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0" style={{ fontSize: "1.1rem", color: "#333" }}>Genel Toplam:</p>
                <strong style={{ fontSize: "1.3rem", color: "#D3AF37" }}>
                  {(totalPrice + 15).toFixed(2)}₺ {/* Genel Toplam = Sepet Toplamı + Kargo */}
                </strong>
              </div>
            </div>

            <Link to="/order" className="btn w-100"
              style={{ backgroundColor: '#964B00', color: 'white', fontSize: '1.2rem' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#b7912f')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#964B00')}
            >
              Sepeti Onayla
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

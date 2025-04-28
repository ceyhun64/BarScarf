import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductByIdThunk, getProductsThunk } from '../../features/thunks/productThunk';
import { addToCartThunk } from '../../features/thunks/cartThunk';
import { clearAlert } from '../../features/slices/cartSlice';
import './details.css'

export default function Details() {
    const [selectedSize, setSelectedSize] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const { alert } = useSelector(state => state.cart);
    const { product } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductByIdThunk(id)).unwrap().catch((err) =>
            console.error("Ürün alınamadı:", err)
        );
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getProductsThunk())
            .unwrap()
            .then(res => setAllProducts(res.products))
            .catch(err => console.error("Tüm ürünler alınamadı:", err));
    }, []);

    const otherColorVariants = allProducts.filter(
        (p) => p.name === product.name && p.id !== product.id
    );

    const handleAddToCart = () => {
        if (selectedSize) {
            dispatch(addToCartThunk({ productId: id, size: selectedSize, quantity }));
            setTimeout(() => dispatch(clearAlert()), 1000);
        } else {
            console.error("Lütfen beden seçin.");
        }
    };

    const handleNextImage = () => {
        if (product.images && currentImageIndex < product.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (product.images && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleImageClick = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Ürün yeni mi kontrolü
    const isProductNew = () => {
        const currentDate = new Date();
        const createdAtDate = new Date(product.createdAt);
        const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
        return createdAtDate >= oneWeekAgo;
    };

    return (
        <div className="container my-4">
            <div className="row">
                {alert.message && (
                    <div className={`alert alert-${alert.type}`} role="alert">
                        {alert.message}
                    </div>
                )}

                {/* Ürün Görseli ve Geçiş Okları */}
                <div className="col-md-6 col-12 position-relative product-image-spacing">
                    <img
                        src={product.images?.[currentImageIndex]?.imageUrl || product.mainImage}
                        alt={product.name}
                        className="img-fluid rounded-3 shadow-sm"
                        style={{ cursor: 'pointer' }}
                        onClick={handleImageClick}
                    />
                    {product.images?.length > 1 && (
                        <>
                            {/* Sol ok */}
                            <button
                                onClick={handlePrevImage}
                                className="position-absolute top-50 start-0 translate-middle-y text-white border-0 rounded-circle shadow-lg"
                                style={{
                                    left: '10px',
                                    zIndex: 2,
                                    transition: 'transform 0.3s ease',
                                    backgroundColor: '#D3AF37',
                                    width: '30px',
                                    height: '30px',
                                    padding: '0',
                                    fontSize: '14px',
                                }}
                            >
                                <i className="bi bi-arrow-left"></i>
                            </button>

                            {/* Sağ ok */}
                            <button
                                onClick={handleNextImage}
                                className="position-absolute top-50 end-0 translate-middle-y text-white border-0 rounded-circle shadow-lg"
                                style={{
                                    right: '10px',
                                    zIndex: 2,
                                    transition: 'transform 0.3s ease',
                                    backgroundColor: '#D3AF37',
                                    width: '30px',
                                    height: '30px',
                                    padding: '0',
                                    fontSize: '14px',
                                }}
                            >
                                <i className="bi bi-arrow-right"></i>
                            </button>
                        </>
                    )}
                </div>

                <div className="col-md-5 mt-3 ms-md-5 ms-0">
                    <h2 className="text-dark mb-2" style={{ fontSize: '1.8rem' }}>{product.name}</h2>
                    <div className="border-top mb-3" style={{ borderTop: '1px solid #dee2e6' }}></div>

                    <p className="fw-bold text-dark" style={{ fontSize: '1.4rem' }}>{product.price} TL</p>

                    {/* Diğer Renkler */}
                    {otherColorVariants.length > 0 && (
                        <div className="pt-4 mt-4 border-top">
                            <h6 className="fw-semibold">Ürünün Diğer Renkleri</h6>
                            <div className="d-flex gap-3 flex-wrap">
                                {otherColorVariants.map((variant) => (
                                    <div
                                        key={variant.id}
                                        onClick={() => navigate(`/product/${variant.id}`)}
                                        className="p-1"
                                        style={{
                                            cursor: "pointer",
                                            width: "100px",
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                    >
                                        <img
                                            src={variant.mainImage}
                                            alt="Varyant"
                                            style={{ width: "100%", borderRadius: "4px" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Beden Seçimi */}
                    <div className="pt-4 mt-4 border-top" style={{ borderTop: '1px solid #dee2e6' }}>
                        <h5 className="fw-semibold">Beden Seçin</h5>
                        <div className="d-flex gap-2 flex-wrap">
                            {product.sizes?.map((size) => (
                                <div
                                    key={size.id}
                                    onClick={() => setSelectedSize(size.name)}
                                    className={`px-3 py-2 rounded-pill border fw-medium shadow-sm ${selectedSize === size.name ? 'bg-dark text-white' : 'bg-light text-dark'}`}
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease-in-out',
                                        transform: selectedSize === size.name ? 'scale(1.05)' : 'scale(1)',
                                    }}
                                >
                                    {size.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Adet Seçimi */}
                    <div className="pt-4 mt-4 border-top" style={{ borderTop: '1px solid #dee2e6' }}>
                        <h6 className="fw-semibold mb-1">Adet</h6>
                        <div className="input-group" style={{ maxWidth: '130px' }}>
                            <button className="btn btn-outline-dark" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                                <i className="bi bi-dash"></i>
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="form-control text-center"
                                style={{ backgroundColor: 'white' }}
                            />
                            <button className="btn btn-outline-dark" onClick={() => setQuantity(q => q + 1)}>
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>

                    {/* Sepete Ekle ve Favori */}
                    <div className="pt-4 mt-4 border-top" style={{ borderTop: '1px solid #dee2e6' }}>
                        <div className="d-flex gap-2">
                            <button
                                onClick={handleAddToCart}
                                className="btn btn-dark flex-grow-1 shadow-sm d-flex align-items-center justify-content-center gap-2"
                            >
                                <i className="bi bi-cart-plus"></i> Sepete Ekle
                            </button>
                            <button
                                className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-dark'} shadow-sm rounded-circle`}
                                style={{ width: '42px', height: '42px', padding: 0 }}
                                onClick={() => setIsFavorite(!isFavorite)}
                            >
                                <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                            </button>
                        </div>
                    </div>

                    {/* Ürün Açıklaması */}
                    <div className="pt-4 mt-4 border-top" style={{ borderTop: '1px solid #dee2e6' }}>
                        <h6 className="fw-semibold mb-2">Ürün Açıklaması</h6>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>
                            {product.description}
                        </p>
                    </div>

                    {/* Geri Dön */}
                    <div className="pt-4 mt-4 border-top" style={{ borderTop: '1px solid #dee2e6' }}>
                        <Link to="/products" className="btn btn-outline-secondary rounded-pill d-flex align-items-center justify-content-center gap-2">
                            <i className="bi bi-arrow-left"></i> Ürünlere Dön
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" style={{
                    display: 'block',
                    position: 'fixed',
                    top: '0', left: '0', width: '100%', height: '100%', zIndex: '9999'
                }} role="dialog" onClick={closeModal}>
                    <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={product.images?.[currentImageIndex]?.imageUrl || product.mainImage}
                                    alt={product.name}
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

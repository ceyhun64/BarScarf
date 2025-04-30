import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavoritesThunk, deleteFavoriteThunk, getFavoritesThunk } from '../../features/thunks/favoriteThunk';
import { clearAlert } from '../../features/slices/favoriteSlice';

export default function Card({ product }) {
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);
    const { favorites } = useSelector(state => state.favorite);

    // Sayfa yüklendiğinde favori olup olmadığını kontrol et
    useEffect(() => {
        // Favorilerde olup olmadığını kontrol et
        setIsFavorite(favorites.some(fav => fav.productId === product.id));
    }, [favorites, product.id]); // Bu, favoriler değiştiğinde ve ürün id'si değiştiğinde tetiklenir.

    const handleFavoriteClick = async () => {
        if (isFavorite) {
            // Favoriden çıkar
            const action = await dispatch(deleteFavoriteThunk(product.id));
            if (action.meta.requestStatus === "fulfilled") {
                setTimeout(() => {
                    dispatch(clearAlert());
                }, 1000);
                dispatch(getFavoritesThunk());
            }
        } else {
            // Favorilere ekle
            const action = await dispatch(addToFavoritesThunk(product.id));
            if (action.meta.requestStatus === "fulfilled") {
                setTimeout(() => {
                    dispatch(clearAlert());
                }, 1000);
                dispatch(getFavoritesThunk());
            }
        }
    };

    // Ürün yeni mi kontrolü
    const isProductNew = () => {
        const currentDate = new Date();
        const createdAtDate = new Date(product.createdAt);
        const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
        return createdAtDate >= oneWeekAgo;
    };

    // İlk resmi almak için `images[0].imageUrl` kullanıyoruz.
    const mainImage = product.images && product.images.length > 0 ? product.images[0].imageUrl : '';

    return (
        <div
            className="card custom-card shadow-lg mt-4 position-relative"
            style={{
                border: 'none',
                borderRadius: '15px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out'
            }}
        >
            <Link to={`/product/${product.id}`} className="text-decoration-none">
                {/* Ana resmi göster */}
                <img
                    src={mainImage}
                    className="card-img-top rounded-top"
                    alt={product.name}
                    style={{
                        borderRadius: '5px 5px 0 0'
                    }}
                />
            </Link>

            {/* Yeni Etiketi */}
            {isProductNew() && (
                <div
                    className="position-absolute top-0 start-0 p-2"
                    style={{
                        zIndex: 2,
                        backgroundColor: '#D3AF37', // Daha koyu yeşil tonu
                        color: 'white',
                        padding: '6px 12px',
                        fontSize: '13px',
                        fontWeight: '600',
                        borderRadius: '5px', // Daha keskin köşeler
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    Yeni
                </div>
            )}

            <div
                className="card-body text-center p-2 d-flex justify-content-between align-items-center"
                style={{
                    background: "linear-gradient(45deg, #ffffff, rgba(223, 154, 6, 0.26))",
                    padding: "8px 0",
                    maxHeight:"60px"
                }}
            >
                <div className="text-start" style={{ maxWidth: '70%' }}>
                    <p
                        className="card-title text-dark text-truncate"
                        style={{
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            color: '#333',
                            marginBottom: '5px',
                        }}
                    >
                        {product.name}
                    </p>
                    <p
                        className="card-title fw-bold text-dark text-start"
                        style={{
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            color: '#333',
                            marginTop: '5px',
                        }}
                    >
                        {product.price} TL
                    </p>
                </div>
                {/* Favori İkonu */}
                <i
                    onClick={handleFavoriteClick}
                    className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'} me-3`}
                    style={{
                        fontSize: '1.1rem',
                        color: isFavorite ? '#964B00' : '#333',
                        cursor: 'pointer',
                    }}
                />
            </div>
        </div>
    );
}

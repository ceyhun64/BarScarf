import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getFavoritesThunk, deleteFavoriteThunk } from '../../features/thunks/favoriteThunk';
import { getProductsThunk } from '../../features/thunks/productThunk';
import { clearAlert } from '../../features/slices/favoriteSlice';

export default function Favorites() {
    const dispatch = useDispatch();
    const { favorites, loading, alert } = useSelector((state) => state.favorite);
    const { products } = useSelector((state) => state.product);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getFavoritesThunk());
    }, [dispatch]);

    // Favori verilerini ve ürünleri eşleştirmek
    useEffect(() => {
        if (favorites.length > 0 && products.length > 0) {
            const matchedFavorites = favorites
                .map(fav => {
                    // Ürünü favori verileriyle eşleştir
                    const product = products.find(product => product.id === fav.productId);
                    if (product) {
                        // Product nesnesinin bir kopyasını oluştur ve image özelliğini ekle
                        const updatedProduct = {
                            ...product, // Orijinal ürünün tüm özelliklerini kopyala
                            image: product.images && product.images.length > 0 ? product.images[0].imageUrl : '', // İlk resmi al
                        };
                        return updatedProduct; // Güncellenmiş ürünü döndür
                    }
                    return null;
                })
                .filter(product => product !== null); // Null olanları filtrele
            setFavoriteProducts(matchedFavorites); // Eşleşmiş favori ürünlerini state'e set et
        }
    }, [favorites, products]);

    // Eğer loading durumu varsa veya favoriler yüklenmediyse loading mesajı göster
    if (loading || !favorites || !products) {
        return <p>Loading...</p>;
    }

    const handleFavoriteClick = async (favoriteId) => {
        const action = await dispatch(deleteFavoriteThunk(favoriteId));
        if (action.meta.requestStatus === "fulfilled") {
            // Favori silme işlemi başarılıysa, favorileri yeniden almak için API çağrısı
            setTimeout(() => {
                dispatch(clearAlert()); // Alerti temizle
            }, 1000);
            dispatch(getFavoritesThunk());
            setFavoriteProducts(favoriteProducts.filter(fav => fav.id !== favoriteId));
        }
    };

    return (
        <div className="container">
            <div className="row">
                {favoriteProducts.length > 0 ? (
                    favoriteProducts.map((favorite) => (
                        <div key={favorite.id} className="col-md-4">
                            <div
                                className="card custom-card shadow-lg mt-4 position-relative"
                                style={{
                                    border: 'none',
                                    borderRadius: '15px',
                                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s ease-in-out'
                                }}
                            >
                                {/* Favori İkonu */}
                                <i
                                    onClick={() => handleFavoriteClick(favorite.id)} // Favori silme işlemi
                                    className={`bi ${favorites.some(fav => fav.productId === favorite.id) ? 'bi-heart-fill' : 'bi-heart'} position-absolute top-0 end-0 m-3`}
                                    style={{
                                        fontSize: '1.1rem', // Font boyutunu küçültüyoruz
                                        color: favorites.some(fav => fav.productId === favorite.id) ? '#964B00' : '#B0B0B0',
                                        cursor: 'pointer',
                                    }}
                                />
                                <Link to={`/product/${favorite.id}`} className="text-decoration-none">
                                    <img
                                        src={favorite.image}  // Burada favori ürünün ilk resmini alıyoruz
                                        className="card-img-top rounded-top"
                                        alt={favorite.name}
                                        style={{
                                            borderRadius: '15px 15px 0 0'
                                        }}
                                    />
                                    <div
                                        className="card-body text-center p-2 d-flex justify-content-between align-items-center"
                                        style={{
                                            background: "linear-gradient(45deg, #ffffff, rgba(223, 154, 6, 0.26))",
                                            padding: "8px 0",
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
                                                {favorite.name}
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
                                                {favorite.price} TL
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center fw-bold">Favori ürününüz bulunmamaktadır.</p> // Eğer favori ürün yoksa
                )}
            </div>
        </div>
    );
}

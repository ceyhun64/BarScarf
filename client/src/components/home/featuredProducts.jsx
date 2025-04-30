import React, { useEffect } from 'react';
import Card from '../product/card';
import { getProductsThunk } from '../../features/thunks/productThunk';
import { useSelector, useDispatch } from 'react-redux';

export default function FeaturedProducts() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.product);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getProductsThunk()).unwrap();
            } catch (error) {
                console.error("Ürünler alınırken bir hata oluştu:", error);
            }
        };
        fetchData();
    }, [dispatch]);

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div>Bir hata oluştu: {error.message}</div>;
    }

    const productList = (products || []).slice(0, 10); // 🔥 İlk 10 ürünü al

    if (productList.length === 0) {
        return <div>Ürün Bulunamadı</div>;
    }

    return (
        <div className="container" style={{ marginTop: "10px", marginBottom: "20px" }}>
            <div
                className="product-list d-flex overflow-auto"
                style={{
                    display: "flex",
                    overflowX: "auto",
                    gap: "15px",
                    padding: "20px 0",
                }}
            >
                {productList.map((product) => (
                    <div key={product.id} style={{ minWidth: "200px" }}>
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

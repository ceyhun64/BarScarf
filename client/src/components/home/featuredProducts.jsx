import React, { useEffect } from 'react';
import Card from '../product/card'; // Card bileşenini import et
import { getProductsThunk } from '../../features/thunks/productThunk'; // getProductsThunk fonksiyonunu import ediyoruz
import { useSelector, useDispatch } from 'react-redux'; // useSelector hook'unu import ediyoruz

export default function FeaturedProducts() {
    const dispatch = useDispatch(); // useDispatch hook'unu kullanarak dispatch fonksiyonunu alıyoruz
    const { products, loading, error } = useSelector(state => state.product); // products dizisini ve loading durumunu alıyoruz
    console.log("productlist :", products); // products dizisini konsola yazdırıyoruz

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getProductsThunk()).unwrap();
            } catch (error) {
                console.error("Ürünler alınırken bir hata oluştu:", error);
            }
        };
        fetchData(); // Async fonksiyonu çağır
    }, [dispatch]); // `dispatch` bağımlılığı eklenmeli!

    // Eğer loading durumu varsa, yükleniyor mesajı göster
    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    // Eğer bir hata oluştuysa, hata mesajı göster
    if (error) {
        return <div>Bir hata oluştu: {error.message}</div>;
    }

    // Eğer products dizisi boş veya undefined ise, boş bir dizi atayın
    const productList = products || [];

    // Eğer ürünler yoksa, "Ürün Bulunamadı" mesajı göster
    if (productList.length === 0) {
        return <div>Ürün Bulunamadı</div>;
    }

    // products dizisini map ile render ediyoruz
    return (
        <div className="container" style={{ marginTop: "10px", marginBottom: "20px" }}>
            <div
                className="product-list d-flex overflow-auto"
                style={{
                    display: "flex",
                    overflowX: "auto",  // Yatay kaydırma için
                    gap: "15px", // Ürünler arasına boşluk ekledik
                    padding: "20px 0", // Üst ve alt boşluk
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

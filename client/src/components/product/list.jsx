import React, { useEffect } from 'react';
import Card from './card';
import { getProductsThunk } from '../../features/thunks/productThunk';
import { useSelector, useDispatch } from 'react-redux';

export default function ProductList() {
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

    const productList = products || [];

    if (productList.length === 0) {
        return <div>Ürün Bulunamadı</div>;
    }

    return (
        <div className="">
            <div className="row">
                {productList.map((product) => (
                    <div key={product.id} className="col-6 col-md-3 mb-4">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

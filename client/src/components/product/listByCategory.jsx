import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { getProductsByCategoryThunk } from '../../features/thunks/productThunk'; // getProductsThunk fonksiyonunu import ediyoruz
import Card from './card'; // Card bileşenini import et

export default function ListByCategory() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getProductsByCategoryThunk(categoryId)).unwrap();
            } catch (error) {
                console.error("Ürünler alınırken bir hata oluştu:", error);
            }
        };
        fetchData(); // Async fonksiyonu çağır
    },[useDispatch, categoryId]);

    return (
        <div >
            <div className="row">
               {products.map((product) => (
                    <div key={product.id} className="col-md-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}
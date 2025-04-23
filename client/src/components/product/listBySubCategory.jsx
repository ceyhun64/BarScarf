import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { getProductsBySubcategoryThunk } from '../../features/thunks/productThunk'; // getProductsThunk fonksiyonunu import ediyoruz
import Card from './card'; // Card bileşenini import et

export default function ListByCategory() {
    const { subCategoryId } = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getProductsBySubcategoryThunk(subCategoryId)).unwrap();
            } catch (error) {
                console.error("Ürünler alınırken bir hata oluştu:", error);
            }
        };
        fetchData(); // Async fonksiyonu çağır
    },[useDispatch, subCategoryId]);

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
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProductCartThunk, getProductCartThunk } from "../../features/thunks/cartThunk";
import { clearAlert } from "../../features/slices/cartSlice";

export default function CartEdit() {
    const [selectedSize, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const { productCart, alert } = useSelector((state) => state.cart);
    const { product } = useSelector((state) => state.product); // Store'dan ürün bilgilerini al

    useEffect(() => {
        dispatch(getProductCartThunk(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (productCart) {
            setSize(productCart.sizeId);
            setQuantity(productCart.quantity);
        }
    }, [productCart]);

    const handleUpdate = () => {
        dispatch(updateProductCartThunk({ productId, quantity, sizeId: selectedSize }))
        setTimeout(() => {
            dispatch(clearAlert());
            navigate("/cart");
        }, 1000);
    };

    return (
        <div className="container mt-5">
            {alert?.message && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.message}
                </div>
            )}
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card p-4 shadow-sm d-flex flex-row">
                        {/* Ürün Resmi */}
                        {productCart?.products?.image && (
                            <div className="me-4">
                                <img src={productCart.products.image} alt="Ürün" className="img-fluid rounded shadow" style={{ maxWidth: "200px" }} />
                            </div>
                        )}
                        <div className="flex-grow-1">

                            <h2>{productCart?.products?.name || "Sepet Ürününü Düzenle"}</h2>
                            <div className="mb-3">
                                <label>Beden Seçin:</label>
                                <select className="form-select" value={selectedSize} onChange={(e) => setSize(e.target.value)}>
                                    {product?.sizes?.map((size) => (
                                        <option key={size.id} value={size.id}>{size.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Miktar:</label>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                    <span className="mx-3 fs-5 fw-bold">{quantity}</span>
                                    <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                            </div>
                            <button className="btn btn-outline-success w-100" onClick={handleUpdate}>Güncelle</button>
                            <Link to="/cart" className="btn btn-dark w-100 mt-2">İptal</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

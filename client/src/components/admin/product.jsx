import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk, deleteProductThunk, getProductsByCategoryThunk } from '../../features/thunks/productThunk';
import { getCategoriesThunk } from '../../features/thunks/categoryThunk';
import { useNavigate, Link } from 'react-router-dom';
import AdminSidebar from './adminSideBar';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';

export default function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector((state) => state.category);
    const { products } = useSelector((state) => state.product);
    console.log("products", products);

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch]);

    const handleDelete = (productId) => {
        dispatch(deleteProductThunk(productId));
        setTimeout(() => {
            dispatch(getProductsThunk());
        }, 1000);
    };

    const handleUpdate = (productId) => {
        navigate(`/admin/product/${productId}`);
    };

    const handleCategory = (category) => {
        dispatch(getProductsByCategoryThunk(category));
    };

    // İlk 4 kategori "cinsiyet", diğerleri normal kategori olarak ayrılıyor
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Ürün Yönetimi</h2>
                    {/* Filtreleme ve Yeni Ürün Ekle Butonu */}
                    <div className="card shadow-lg p-4 mb-2">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                            {/* Kategoriye Göre Filtreleme */}
                            <div className="btn-group">
                                <button className="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown">
                                    Kategoriye Göre Filtrele
                                </button>
                                <ul className="dropdown-menu">
                                    {categories.map((category, index) => (
                                        <li key={index}>
                                            <button className="dropdown-item" onClick={() => handleCategory(category.id)}>
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Yeni Ürün Ekleme Butonu */}
                            <Link to={"/admin/products/create"} className="btn btn-dark mt-2 mt-sm-0">
                                <i className="bi bi-arrow-right me-1"></i> Yeni Ürün Ekle
                            </Link>
                        </div>
                    </div>

                    {/* Ürün Listesi */}
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <p>Toplam Ürün: <strong>{products.length}</strong></p>
                            <div className="table-responsive">

                                <table className="table table-striped table-bordered table-hover">
                                    <thead >
                                        <tr>
                                            <th>ID</th>
                                            <th>Resim</th>
                                            <th>Ad</th>
                                            <th>Fiyat</th>
                                            <th>Renk</th>
                                            <th>Stok</th>
                                            <th>Grup</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>
                                                    <img
                                                        src={product.mainImage} // Direkt tam URL
                                                        alt={product.name}
                                                        style={{ width: '70px', height: '90px', objectFit: 'cover' }}
                                                    />
                                                </td>
                                                <td>{product.name}</td>
                                                <td>{product.price} TL</td>
                                                <td>{product.color}</td>
                                                <td>{product.stock}</td>
                                                <td>{product.group}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm me-2"
                                                        onClick={() => handleUpdate(product.id)}
                                                    >
                                                        <img
                                                            style={{ width: "20px", height: "20px" }}
                                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABG0lEQVR4nO2VPUpDQRSFPwPp09hFCy1dgbgICUljk8WomEItJLiLlEEQBFNkBdlESIJaiCH6DJGr58ElkC5zsZgDw8y8ucx35s7Pg6ysNDoBBkABzIEecECQWsAXsALegU+1Z8BhBLwQ8AaoAjXgQd96UfApsOvGzMQC+AB2UsNnqkfORFXbYVtTSQnvCDpaM3Gr/nNqeClvYqraVn9MANybKLejUPzW1HRX7XpDzKXGv4GzDN+Gmjnt5AMXeNVa7pHpbojppHpkTBNNbuUFaBAIr2vyV+BJ7aUzkRRuOhXgUf/uC5eJbmq46VyQq9/en4kyE8nhpr5A9zJhmXiLgpvGbrW+TCLg++4ADoE7oA0cEaQasBcFy/oX+gHC8pMH0EF+PAAAAABJRU5ErkJggg=="
                                                            alt="edit"
                                                        />
                                                    </button>
                                                    <button
                                                        className="btn"
                                                        onClick={() => handleDelete(product.id)}
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

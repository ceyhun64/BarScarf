import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryThunk, createSubCategoryThunk, getCategoriesThunk, getAllSubCategoriesThunk } from '../../features/thunks/categoryThunk';
import { Link } from 'react-router-dom';
import AdminSidebar from './adminSideBar';
import { clearAlert } from '../../features/slices/categorySlice';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function CategoryAndSubCategoryAddPage() {
    const dispatch = useDispatch();
    const { categories, subCategories, alert } = useSelector((state) => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getCategoriesThunk()).unwrap();
            await dispatch(getAllSubCategoriesThunk()).unwrap();
        };
        fetchData();
    }, [dispatch]);

    // Yeni Kategori Ekle
    const handleAddCategory = async () => {
        const isDuplicate = categories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        if (isDuplicate || !categoryName.trim()) return;

        const categoryData = { name: categoryName };
        await dispatch(createCategoryThunk(categoryData)).unwrap();
        setTimeout(() => {
            dispatch(clearAlert());
            dispatch(getCategoriesThunk());
            dispatch(getAllSubCategoriesThunk());
            setCategoryName('');
        }, 1000);
    };

    // Yeni Alt Kategori Ekle
    const handleAddSubCategory = async (e) => {
        e.preventDefault();

        const subCategoryData = {
            name: subCategoryName.trim(),
            categoryId: Number(selectedCategoryId),
        };

        try {
            await dispatch(createSubCategoryThunk(subCategoryData)).unwrap();
            setTimeout(() => {
                dispatch(clearAlert());
                dispatch(getCategoriesThunk());
                dispatch(getAllSubCategoriesThunk());
                setSubCategoryName('');
                setSelectedCategoryId('');
            }, 1000);
        } catch (error) {
            console.error("Alt kategori eklenirken hata:", error);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>

                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Kategori ve Alt Kategori Ekle</h2>

                    {alert?.message && (
                        <div className={`alert alert-${alert?.type}`} role="alert">
                            {alert?.message}
                        </div>
                    )}

                    {/* Yeni Kategori Ekle */}
                    <div className="card shadow-lg mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Yeni Kategori Ekle</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <div className="flex-fill me-2">
                                    <input
                                        type="text"
                                        id="categoryName"
                                        className="form-control"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        placeholder="Kategori ismini girin"
                                    />
                                </div>
                                <div className="d-flex align-items-end">
                                    <button
                                        className="btn btn-dark"
                                        type="button"
                                        onClick={handleAddCategory}
                                    >
                                        Ekle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Yeni Alt Kategori Ekle */}
                    <div className="card shadow-lg mt-4 mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Yeni Alt Kategori Ekle</h5>
                            <form onSubmit={handleAddSubCategory}>
                                <div className="row g-2 align-items-end">
                                    <div className="col-md-5">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Alt kategori adı"
                                            value={subCategoryName}
                                            onChange={(e) => setSubCategoryName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-5">
                                        <select
                                            className="form-select"
                                            value={selectedCategoryId}
                                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                                            required
                                        >
                                            <option value="">Ana Kategori Seçin</option>
                                            {categories
                                                .filter((cat) => cat && cat.id && cat.name) // Boş ya da eksik nesneleri filtrele
                                                .map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <button type="submit" className="btn btn-dark w-100">
                                            Ekle
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Kategori Listesi */}
                    <Link to="/admin/categories" className="btn btn-secondary">Kategoriler</Link>
                </div>
            </div>
        </div>
    );
}

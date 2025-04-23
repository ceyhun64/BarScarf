import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesThunk, createCategoryThunk, deleteCategoryThunk, getAllSubCategoriesThunk, createSubCategoryThunk, deleteSubCategoryThunk, updateCategoryThunk, } from '../../features/thunks/categoryThunk';
import AdminSidebar from './adminSideBar';
import { Link } from 'react-router-dom';
import { clearAlert } from '../../features/slices/categorySlice';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';



export default function Categories() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(getCategoriesThunk());
    };

    const handleDelete = (id) => {
        dispatch(deleteCategoryThunk(id));
        setTimeout(() => {
            dispatch(clearAlert());
            dispatch(getCategoriesThunk());
            dispatch(getAllSubCategoriesThunk()); // alt kategorileri de yenile
        }, 1000);
    };

    const handleCategoryNameChange = (e) => setCategoryName(e.target.value);

    const handleAddCategory = () => {
        const isDuplicate = categories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        if (isDuplicate || !categoryName.trim()) return;

        const categoryData = { name: categoryName };
        dispatch(createCategoryThunk(categoryData)).unwrap();
        setTimeout(() => {
            dispatch(clearAlert());
            dispatch(getCategoriesThunk());
            dispatch(getAllSubCategoriesThunk()); // alt kategorileri de yenile
        }, 1000);
        setCategoryName('');
    };

    const handleAddSubCategory = async (e) => {
        e.preventDefault();

        const subCategoryData = {
            name: subCategoryName.trim(),
            categoryId: Number(selectedCategoryId), // burada string yerine number olarak gönderiyoruz
        };

        try {
            await dispatch(createSubCategoryThunk(subCategoryData)).unwrap();
            setTimeout(() => {
                dispatch(clearAlert());
                dispatch(getCategoriesThunk());

                dispatch(getAllSubCategoriesThunk());
            }, 1000);
            setSubCategoryName('');
            setSelectedCategoryId('');
        } catch (error) {
            console.error("Alt kategori eklenirken hata:", error);
        }
    };

    const handleDeleteSubCategory = (id) => {
        dispatch(deleteSubCategoryThunk(id));
        setTimeout(() => {
            dispatch(clearAlert());
            dispatch(getCategoriesThunk());
            dispatch(getAllSubCategoriesThunk()); // alt kategorileri de yenile
        }, 1000);
    }


    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>

                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Kategori Yönetimi</h2>
                    {alert?.message && (
                        <div className={`alert alert-${alert?.type}`} role="alert">
                            {alert?.message}
                        </div>
                    )}

                    {/* Yeni Kategori Ekle */}
                    <div className="card shadow-lg mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Yeni Kategori Ekle</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="flex-fill me-2">
                                        <input
                                            type="text"
                                            id="categoryName"
                                            className="form-control"
                                            value={categoryName}
                                            onChange={handleCategoryNameChange}
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
                            </form>
                        </div>
                    </div>

                    {/* Kategori Listesi */}
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h5 className="card-title">Kategori Listesi</h5>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Ad</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(categories) && categories.length > 0 ? (
                                            categories.map((category) => (
                                                <tr key={category.id}>
                                                    <td className="col-md-2">{category.id}</td>
                                                    <td className="col-md-8">{category.name}</td>
                                                    <td className="col-md-2">
                                                        <Link to={`/admin/category/${category.id}`} className="btn btn-sm ms-2">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm ms-3"
                                                            onClick={() => handleDelete(category.id)}
                                                        >
                                                            <i className="bi bi-trash-fill"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">Kategori bulunamadı</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
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

                    {/* Alt Kategori Listesi */}
                    <div className="card shadow-lg mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Alt Kategoriler</h5>
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ad</th>
                                        <th>Ana Kategori</th>
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(subCategories) && subCategories.length > 0 ? (
                                        subCategories.map((sub) => (
                                            <tr key={sub.id}>
                                                <td>{sub.id}</td>
                                                <td>{sub.name}</td>
                                                <td>{categories.find(cat => cat.id === sub.categoryId)?.name || sub.categoryId}</td>
                                                <td className="col-md-2">
                                                    <Link to={`/admin/subcategory/${sub.id}`} className="btn btn-sm ms-2">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Link>
                                                    <button
                                                        className="btn btn-sm ms-3"
                                                        onClick={() => handleDeleteSubCategory(sub.id)}
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">Alt kategori bulunamadı</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


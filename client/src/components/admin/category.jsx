import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesThunk, deleteCategoryThunk, getAllSubCategoriesThunk, deleteSubCategoryThunk } from '../../features/thunks/categoryThunk';
import AdminSidebar from './adminSideBar';
import { Link, useNavigate } from 'react-router-dom';
import { clearAlert } from '../../features/slices/categorySlice';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';

export default function Categories() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories, subCategories, alert } = useSelector((state) => state.category);
    const [isLoading, setIsLoading] = useState(true); // Veri yüklenip yüklenmediğini kontrol etmek için

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getCategoriesThunk()).unwrap();
                await dispatch(getAllSubCategoriesThunk()).unwrap();
                setIsLoading(false); // Veriler başarıyla yüklendiğinde loading'i false yapıyoruz
            } catch (error) {
                console.error("Veri yüklenirken hata oluştu:", error);
                setIsLoading(false); // Yükleme hatası olsa da loading'i false yapıyoruz
            }
        };
        fetchData();
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteCategoryThunk(id));
        setTimeout(() => {
            dispatch(clearAlert());
            dispatch(getCategoriesThunk());
            dispatch(getAllSubCategoriesThunk());
        }, 1000);
    };

    const handleDeleteSubCategory = (id) => {
        dispatch(deleteSubCategoryThunk(id));
        setTimeout(() => {
            dispatch(clearAlert());
            dispatch(getCategoriesThunk());
            dispatch(getAllSubCategoriesThunk());
        }, 1000);
    };

    const handleNavigateToCreatePage = () => {
        navigate('/admin/category/create');
    };

    if (isLoading) {
        return <div className="container mt-5 mb-5 text-center"><h3>Yükleniyor...</h3></div>;
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

                    {/* Yeni Ekle Butonu */}
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-dark" onClick={handleNavigateToCreatePage}>
                            Yeni Ekle
                        </button>
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
                                                    <td>{category.id}</td>
                                                    <td>{category.name}</td>
                                                    <td>
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
                                                <td colSpan="3" className="text-center">Kategori bulunamadı</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
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
                                                <td>
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
                                            <td colSpan="4" className="text-center">Alt kategori bulunamadı</td>
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

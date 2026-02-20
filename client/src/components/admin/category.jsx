import React, { useEffect, useState } from 'react';//react ve useEffect dahil ettik
import { useDispatch, useSelector } from 'react-redux';//useDispatch ve useSelector hook'larını dahil ettik
import { getCategoriesThunk, deleteCategoryThunk, getAllSubCategoriesThunk, deleteSubCategoryThunk } from '../../features/thunks/categoryThunk';
import AdminSidebar from './adminSideBar';//AdminSidebar bileşenini dahil ettik
import { Link, useNavigate } from 'react-router-dom';//Link ve useNavigate hook'larını dahil ettik
import { clearAlert } from '../../features/slices/categorySlice';//clearAlert fonksiyonunu dahil ettik
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';//image dosyasını dahil ettik

export default function Categories() {
    const dispatch = useDispatch();//useDispatch hook'unu kullanarak dispatch fonksiyonunu oluşturduk
    const navigate = useNavigate();//useNavigate hook'unu kullanarak navigate fonksiyonunu oluşturduk
    const { categories, subCategories, alert } = useSelector((state) => state.category);//category state'ini kullanarak kategorileri ve alt kategorileri çektik
    const [isLoading, setIsLoading] = useState(true); // Veri yüklenip yüklenmediğini kontrol etmek için

    //bileşen yenilendiğinde ve güncellendiğinde çalışır
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getCategoriesThunk()).unwrap();//getCategoriesThunk fonksiyonunu kullanarak kategorileri çektik
                await dispatch(getAllSubCategoriesThunk()).unwrap();//getAllSubCategoriesThunk fonksiyonunu kullanarak alt kategorileri çektik
                setIsLoading(false); // Veriler başarıyla yüklendiğinde loading'i false yapıyoruz
            } catch (error) {
                console.error("Veri yüklenirken hata oluştu:", error);
                setIsLoading(false); // Yükleme hatası olsa da loading'i false yapıyoruz
            }
        };
        fetchData();
    }, [dispatch]);//dispatch ve category state'i değiştiğinde useEffect hook'u çalışacak

    const handleDelete = (id) => {//deleteCategoryThunk fonksiyonunu kullanarak kategoriyi siler
        dispatch(deleteCategoryThunk(id));//id parametresi ile kategoriyi siler
        setTimeout(() => {//1 sn sonra yapılacaklar
            dispatch(clearAlert());//clearAlert fonksiyonunu kullanarak alert'i temizler
            dispatch(getCategoriesThunk());//getCategoriesThunk fonksiyonunu kullanarak kategorileri çeker
            dispatch(getAllSubCategoriesThunk());//getAllSubCategoriesThunk fonksiyonunu kullanarak alt kategorileri çeker
        }, 1000);
    };

    const handleDeleteSubCategory = (id) => {//deleteSubCategoryThunk fonksiyonunu kullanarak alt kategoriyi siler
        dispatch(deleteSubCategoryThunk(id));//id parametresi ile alt kategoriyi siler
        setTimeout(() => {//1 sn sonra yapılacaklar
            dispatch(clearAlert());//clearAlert fonksiyonunu kullanarak alert'i temizler
            dispatch(getCategoriesThunk());//getCategoriesThunk fonksiyonunu kullanarak kategorileri çeker
            dispatch(getAllSubCategoriesThunk());//getAllSubCategoriesThunk fonksiyonunu kullanarak alt kategorileri çeker
        }, 1000);
    };

    const handleNavigateToCreatePage = () => {//createPage'a yönlendirir(category/create)
        navigate('/admin/category/create');
    };

    if (isLoading) {//Veriler yüklenirken gösterilecek
        return <div className="container mt-5 mb-5 text-center"><h3>Yükleniyor...</h3></div>;
    }

    return (
        <div className="container mt-5 mb-5">
            {/* Üst Kısım */}
            <div className="row">
                {/* Logo */}
                <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>
                <AdminSidebar />

                {/* sağ kısım */}
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Kategori Yönetimi</h2>

                    {/* Alert */}
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

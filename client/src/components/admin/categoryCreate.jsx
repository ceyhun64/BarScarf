import React, { useState, useEffect } from 'react';//react ve useState ve useEffect hook'larını dahil ettik
import { useDispatch, useSelector } from 'react-redux';//useDispatch ve useSelector hook'larını dahil ettik
import { createCategoryThunk, createSubCategoryThunk, getCategoriesThunk, getAllSubCategoriesThunk } from '../../features/thunks/categoryThunk';
import { Link } from 'react-router-dom';//Link bileşenini dahil ettik
import AdminSidebar from './adminSideBar';//AdminSidebar bileşenini dahil ettik
import { clearAlert } from '../../features/slices/categorySlice';//clearAlert fonksiyonunu dahil ettik
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function CategoryAndSubCategoryAddPage() {
    const dispatch = useDispatch();//useDispatch hook'unu kullanarak dispatch fonksiyonunu oluşturduk
    const { categories, subCategories, alert } = useSelector((state) => state.category);//category state'ini kullanarak kategorileri ve alt kategorileri çektik
    const [categoryName, setCategoryName] = useState('');//categoryName state'ini oluşturduk
    const [subCategoryName, setSubCategoryName] = useState('');//subCategoryName state'ini oluşturduk
    const [selectedCategoryId, setSelectedCategoryId] = useState('');//selectedCategoryId state'ini oluşturduk

    //bileşen yenilendiğinde ve güncellendiğinde çalışır    
    useEffect(() => {
        const fetchData = async () => {//getCategoriesThunk fonksiyonunu kullanarak kategorileri çektik
            await dispatch(getCategoriesThunk()).unwrap();//getCategoriesThunk fonksiyonunu kullanarak kategorileri çektik
            await dispatch(getAllSubCategoriesThunk()).unwrap();//getAllSubCategoriesThunk fonksiyonunu kullanarak alt kategorileri çektik
        };
        fetchData();
    }, [dispatch]);//dispatch ve category state'i değiştiğinde useEffect hook'u çalışacak

    // Yeni Kategori Ekle
    const handleAddCategory = async () => {
        //aynı kategori adı varsa ekleme yapma  
        //categoryName'i boşlukları kaldırıp küçük harfe çeviriyoruz

        const isDuplicate = categories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        if (isDuplicate || !categoryName.trim()) return;

        const categoryData = { name: categoryName };//name değerine categoryName'i atıyoruz
        await dispatch(createCategoryThunk(categoryData)).unwrap();//createCategoryThunk fonksiyonunu kullanarak kategori ekliyoruz
        setTimeout(() => {//1 saniye sonra ne olacağını yazıyoruz
            dispatch(clearAlert());//clearAlert fonksiyonunu kullanarak alert'i temizliyoruz
            dispatch(getCategoriesThunk());//getCategoriesThunk fonksiyonunu kullanarak kategorileri çekiyoruz
            dispatch(getAllSubCategoriesThunk());//getAllSubCategoriesThunk fonksiyonunu kullanarak alt kategorileri çekiyoruz
            setCategoryName('');//categoryName'i temizliyoruz
        }, 1000);
    };

    // Yeni Alt Kategori Ekle
    const handleAddSubCategory = async (e) => {
        e.preventDefault();//formun submit edilmesini engelliyoruz

        const subCategoryData = {//subCategoryName'i trim() ile boşlukları kaldırıyoruz
            name: subCategoryName.trim(),//subCategoryName'i trim() ile boşlukları kaldırıyoruz
            categoryId: Number(selectedCategoryId),//selectedCategoryId'i Number() ile sayıya çeviriyoruz
        };

        try {
            await dispatch(createSubCategoryThunk(subCategoryData)).unwrap();//createSubCategoryThunk fonksiyonunu kullanarak alt kategori ekliyoruz
            setTimeout(() => {//1 saniye sonra ne olacağını yazıyoruz
                dispatch(clearAlert());//clearAlert fonksiyonunu kullanarak alert'i temizliyoruz
                dispatch(getCategoriesThunk());//getCategoriesThunk fonksiyonunu kullanarak kategorileri çekiyoruz
                dispatch(getAllSubCategoriesThunk());//getAllSubCategoriesThunk fonksiyonunu kullanarak alt kategorileri çekiyoruz
                setSubCategoryName('');//subCategoryName'i temizliyoruz
                setSelectedCategoryId('');//selectedCategoryId'i temizliyoruz
            }, 1000);
        } catch (error) {
            console.error("Alt kategori eklenirken hata:", error);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            {/* Row */}
            <div className="row">
                {/* Logo */}
                <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>

                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Kategori ve Alt Kategori Ekle</h2>
                    
                    {/* Alert */}
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

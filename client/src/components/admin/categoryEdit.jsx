import React, { useEffect, useState } from "react";//react ve useEffect dahil ettik
import { useDispatch, useSelector } from "react-redux";//useDispatch ve useSelector hook'larını dahil ettik
import { useNavigate, useParams, Link } from "react-router-dom";//useNavigate ve useParams hook'larını dahil ettik
import { updateCategoryThunk, getCategoryByIdThunk } from "../../features/thunks/categoryThunk";
import { clearAlert } from "../../features/slices/categorySlice";
import AdminSidebar from "./adminSideBar";
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function CategoryEdit() {
    const [name, setName] = useState("");//useState hook'unu kullanarak name state'ini oluşturduk
    const dispatch = useDispatch();//useDispatch hook'unu kullanarak dispatch fonksiyonunu oluşturduk
    const navigate = useNavigate();//useNavigate hook'unu kullanarak navigate fonksiyonunu oluşturduk
    const { id } = useParams();//useParams hook'unu kullanarak id'yi aldık
    const { alert } = useSelector((state) => state.category);//category state'ini kullanarak alert'i çektik

    //bileşen yenilendiğinde ve güncellendiğinde çalışır
    useEffect(() => {
        const fetchData = async () => {
            const action = await dispatch(getCategoryByIdThunk(id)).unwrap();//getCategoryByIdThunk fonksiyonunu kullanarak kategoriyi çektik
            console.log("Kategori verisi:", action);//kategoriyi konsola yazdırdık

            if (action.category) {// Eğer kategori verisi varsa
                setName(action.category.name);  // Kategori adını state'e set et
            }
        };
        fetchData();
    }, [dispatch, id]);//bağımlılıklar dispatch ve id değiştiğinde useEffect hook'u çalışacak


    const handleSubmit = (e) => {//form submit edildiğinde çalışır
        e.preventDefault();//form submit edilmesini engeller
        dispatch(updateCategoryThunk({ id, name }));//updateCategoryThunk fonksiyonunu kullanarak kategoriyi günceller
        setTimeout(() => {//1 saniye sonra çalışır
            dispatch(clearAlert());//alert'i temizler
            navigate("/admin/categories");///admin/categories sayfasına yönlendir
        }, 1000);
    };

    return (
        <div className="container mt-5 mb-5">
            {/* Row */}
            <div className="row">
                
                {/* logo */}
                <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Kategori Yönetimi</h2>

                    {/* Alert */}
                    {alert?.message && (
                        <div className={`alert alert-${alert?.type}`} role="alert">
                            {alert?.message}
                        </div>
                    )}

                    {/* New Category Form */}
                    <div className="card shadow-lg mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Kategori Güncelle</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="flex-fill me-2">
                                        <input
                                            type="text"
                                            id="categoryName"
                                            className="form-control"
                                            value={name}  // name state'ini burada gösteriyoruz
                                            onChange={(e) => setName(e.target.value)}  // name state'ini güncelliyoruz
                                            placeholder="Kategori ismini girin"
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-success">
                                        Güncelle
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

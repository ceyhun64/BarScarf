import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBannersThunk, getSlidersThunk, getHeroesThunk, deleteBannerThunk, deleteHeroesThunk, deleteSliderThunk } from '../../features/thunks/sliderThunk';
import AdminSidebar from './adminSideBar';
import { Link, useNavigate } from 'react-router-dom';
import { clearAlert } from '../../features/slices/sliderSlice';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';

export default function AdminHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { banners, heroes, sliders, alert } = useSelector((state) => state.slider);
    const [isLoading, setIsLoading] = useState(true); // Veri yüklenip yüklenmediğini kontrol etmek için
    console.log("banners:", banners);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getBannersThunk()).unwrap();
                await dispatch(getHeroesThunk()).unwrap();
                await dispatch(getSlidersThunk()).unwrap();
                setIsLoading(false); // Veriler başarıyla yüklendiğinde loading'i false yapıyoruz
            } catch (error) {
                console.error("Veri yüklenirken hata oluştu:", error);
                setIsLoading(false); // Yükleme hatası olsa da loading'i false yapıyoruz
            }
        };
        fetchData();
    }, [dispatch]);

    const handleDeleteBanner = (id) => {
        dispatch(deleteBannerThunk(id));
        setTimeout(() => {
            dispatch(clearAlert());
            dispatch(getBannersThunk());
            dispatch(getHeroesThunk());
            dispatch(getSlidersThunk());
        }, 1000);
    };

    const handleDeleteHeroes = (id) => {
        dispatch(deleteHeroesThunk(id));
        setTimeout(() => {
            dispatch(clearAlert());
            dispatch(getBannersThunk());
            dispatch(getHeroesThunk());
            dispatch(getSlidersThunk());
        }, 1000);
    };

    const handleDeleteSliders = (id) => {
        dispatch(deleteSliderThunk(id));
        setTimeout(() => {
            dispatch(clearAlert());
            dispatch(getBannersThunk());
            dispatch(getHeroesThunk());
            dispatch(getSlidersThunk());
        }, 1000);
    };

    const handleNavigateToCreatePage = () => {
        navigate('/admin/home/create');
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
                    <h2 className="text-center mb-4">Ana Sayfa Yönetimi</h2>

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
                            <h5 className="card-title">Banner Listesi</h5>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Resim</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(banners) && banners.length > 0 ? (
                                            banners.map((banner) => (
                                                <tr key={banner.id}>
                                                    <td>{banner.id}</td>
                                                    <td><img src={banner.imageUrl} alt={banner.id} style={{height: '60px', objectFit: 'cover'}} /></td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm ms-3"
                                                            onClick={() => handleDeleteBanner(banner.id)}
                                                        >
                                                            <i className="bi bi-trash-fill"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center">Banner bulunamadı</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Alt Kategori Listesi */}
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h5 className="card-title">Heroes Listesi</h5>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Resim</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(heroes) && heroes.length > 0 ? (
                                            heroes.map((hero) => (
                                                <tr key={hero.id}>
                                                    <td>{hero.id}</td>
                                                    <td><img src={hero.imageUrl} alt={hero.id} style={{height: '60px', objectFit: 'cover'}} /></td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm ms-3"
                                                            onClick={() => handleDeleteHeroes(hero.id)}
                                                        >
                                                            <i className="bi bi-trash-fill"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center">Heroes bulunamadı</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h5 className="card-title">Slider Listesi</h5>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Resim</th>
                                            <th>Başlık</th>
                                            <th>Açıklama</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(sliders) && sliders.length > 0 ? (
                                            sliders.map((slider) => (
                                                <tr key={slider.id}>
                                                    <td>{slider.id}</td>
                                                    <td><img src={slider.imageUrl} alt={slider.id} style={{height: '60px', objectFit: 'cover'}} /></td>
                                                    <td>{slider.title}</td>
                                                    <td>{slider.description}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm ms-3"
                                                            onClick={() => handleDeleteSliders(slider.id)}
                                                        >
                                                            <i className="bi bi-trash-fill"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center">Slider bulunamadı</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

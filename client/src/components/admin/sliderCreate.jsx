import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBannerThunk, createHeroesThunk, createSliderThunk } from '../../features/thunks/sliderThunk';
import { clearAlert } from '../../features/slices/sliderSlice';
import AdminSidebar from './adminSideBar';
import { Link } from 'react-router-dom';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';

export default function ProductCreateForm() {
    const dispatch = useDispatch();
    const { alert } = useSelector((state) => state.slider);

    const [bannerFormData, setBannerFormData] = useState({ images: [] });
    const [heroesFormData, setHeroesFormData] = useState({ images: [] });
    const [sliderFormData, setSliderFormData] = useState({
        images: [],
        title: '',
        description: '',
    });

    // Ortak görsel seçici
    const handleImageChange = (e, type) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        if (type === 'banner') {
            setBannerFormData({ images: files });
        } else if (type === 'heroes') {
            setHeroesFormData({ images: files });
        } else if (type === 'slider') {
            setSliderFormData((prev) => ({ ...prev, images: files }));
        }
    };

    // Ortak submit handler
    const handleSubmit = async (e, type) => {
        e.preventDefault();
        const formData = new FormData();

        if (type === 'banner') {
            bannerFormData.images.forEach((file) => formData.append('images', file));
            await dispatch(createBannerThunk(formData)).unwrap();
        } else if (type === 'heroes') {
            heroesFormData.images.forEach((file) => formData.append('images', file));
            await dispatch(createHeroesThunk(formData)).unwrap();
        } else if (type === 'slider') {
            sliderFormData.images.forEach((file) => formData.append('images', file));
            formData.append('title', sliderFormData.title);
            formData.append('description', sliderFormData.description);
            await dispatch(createSliderThunk(formData)).unwrap();
        }

        dispatch(clearAlert());
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Slider Yönetimi</h2>

                    {/* Banner Form */}
                    <div className="card shadow-sm p-4 mb-4">
                        <h4 className="mb-3 fw-bold text-dark">Banner Ekle</h4>
                        <form onSubmit={(e) => handleSubmit(e, 'banner')}>
                            <div className="mb-3">
                                <label className="form-label">Görsel Seç</label>
                                <input
                                    type="file"
                                    multiple
                                    className="form-control"
                                    onChange={(e) => handleImageChange(e, 'banner')}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Kaydet</button>
                        </form>
                    </div>
                    {alert?.message && (
                        <div className={`alert alert-${alert.type} mt-3`} role="alert">
                            {alert.message}
                        </div>
                    )}

                    {/* Heroes Form */}
                    <div className="card shadow-sm p-4 mb-4">
                        <h4 className="mb-3 fw-bold text-dark">Heroes Ekle</h4>
                        <form onSubmit={(e) => handleSubmit(e, 'heroes')}>
                            <div className="mb-3">
                                <label className="form-label">Görsel Seç</label>
                                <input
                                    type="file"
                                    multiple
                                    className="form-control"
                                    onChange={(e) => handleImageChange(e, 'heroes')}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Kaydet</button>
                        </form>
                    </div>
                    {alert?.message && (
                        <div className={`alert alert-${alert.type} mt-3`} role="alert">
                            {alert.message}
                        </div>
                    )}

                    {/* Slider Form */}
                    <div className="card shadow-sm p-4 mb-4">
                        <h4 className="mb-3 fw-bold text-dark">Slider Ekle</h4>
                        <form onSubmit={(e) => handleSubmit(e, 'slider')}>
                            <div className="mb-3">
                                <label className="form-label">Başlık</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={sliderFormData.title}
                                    onChange={(e) => setSliderFormData({ ...sliderFormData, title: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Açıklama</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={sliderFormData.description}
                                    onChange={(e) => setSliderFormData({ ...sliderFormData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Görsel Seç</label>
                                <input
                                    type="file"
                                    multiple
                                    className="form-control"
                                    onChange={(e) => handleImageChange(e, 'slider')}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Kaydet</button>
                        </form>
                    </div>

                    {/* Alert Mesajı */}
                    {alert?.message && (
                        <div className={`alert alert-${alert.type} mt-3`} role="alert">
                            {alert.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

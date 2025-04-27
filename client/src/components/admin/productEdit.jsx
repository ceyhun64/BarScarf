import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
    updateProductThunk,
    getProductByIdThunk
} from '../../features/thunks/productThunk';
import { getCategoriesThunk, getSubCategoryThunk } from '../../features/thunks/categoryThunk';
import { getSizesThunk } from '../../features/thunks/colorsizeThunk';
import { clearAlert } from '../../features/slices/productSlice';
import AdminSidebar from './adminSideBar';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';

export default function ProductEditForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { categories, subCategories } = useSelector((state) => state.category);
    const { sizes } = useSelector((state) => state.colorSize);
    const { alert, product } = useSelector((state) => state.product);

    const [formData, setFormData] = useState({
        subCategoryId: '',
        categoryId: '',
        name: '',
        images: [],
        price: '',
        stock: '',
        color: '',
        sizeIds: [],
        description: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(getCategoriesThunk()).unwrap(),
                    dispatch(getSizesThunk()).unwrap(),
                    dispatch(getProductByIdThunk(id)).unwrap(),
                ]);
            } catch (error) {
                console.error('Veri alınırken hata oluştu:', error);
            }
        };
        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setFormData({
                categoryId: product.categoryId || '',
                subCategoryId: product.subCategoryId || '',
                name: product.name || '',
                price: product.price || '',
                stock: product.stock || '',
                color: product.color || '',
                sizeIds: product.sizes ? product.sizes.map(size => size.id) : [],
                description: product.description || '',
                images: [],  // Mevcut görselleri burada alıp, kullanıcı yeni resim ekleyecek
            });
        }
    }, [product]);

    const filteredSubCategories = formData.categoryId
        ? subCategories.filter((sub) => sub.categoryId === Number(formData.categoryId))
        : [];

    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        if (name === 'categoryId') {
            setFormData((prevData) => ({
                ...prevData,
                categoryId: value,
                subCategoryId: '', // Alt kategori sıfırlanır
            }));

            if (value) {
                try {
                    await dispatch(getSubCategoryThunk(value)).unwrap();
                } catch (error) {
                    console.error('Alt kategori alınamadı:', error);
                }
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSelectionChange = (e, field) => {
        const value = e.target.value;

        if (field === 'color') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [field]: value,
            }));
        } else {
            const id = Number(value);
            const isChecked = e.target.checked;
            setFormData((prevFormData) => {
                const updatedIds = isChecked
                    ? [...prevFormData[field], id]
                    : prevFormData[field].filter((item) => item !== id);
                return { ...prevFormData, [field]: updatedIds };
            });
        }
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files.length) {
            const imageArray = Array.from(files);
            setFormData({
                ...formData,
                images: imageArray,
            });
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const productData = new FormData();

        const { images, ...dataToSend } = formData;

        for (const key in dataToSend) {
            if (Array.isArray(dataToSend[key])) {
                dataToSend[key].forEach((item) => {
                    productData.append(key, item);
                });
            } else {
                productData.append(key, dataToSend[key]);
            }
        }

        images.forEach((file) => {
            productData.append('images', file);
        });

        try {
            await dispatch(updateProductThunk({ productId: id, productData }));
            dispatch(clearAlert());
            navigate('/admin/products');
        } catch (error) {
            console.error('Ürün güncellenirken bir hata oluştu:', error);
        }
    };

    const colors = [
        { id: 1, name: 'red' },
        { id: 2, name: 'blue' },
        { id: 3, name: 'green' },
        { id: 4, name: 'yellow' },
        { id: 5, name: 'black' },
        { id: 6, name: 'white' },
        { id: 7, name: 'purple' },
        { id: 8, name: 'orange' },
        { id: 9, name: 'pink' },
    ];

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Ürün Güncelle</h2>

                    <div className="card shadow-lg p-4">
                        <form onSubmit={handleUpdateProduct}>
                            <div className="row">
                                {/* Kategori */}
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="category" className="form-label fw-bold">
                                        Kategori
                                    </label>
                                    <select
                                        id="category"
                                        className="form-select"
                                        value={formData.categoryId}
                                        onChange={handleInputChange}
                                        name="categoryId"
                                    >
                                        <option value="">Kategori Seç</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Alt Kategori */}
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="subCategory" className="form-label fw-bold">
                                        Alt Kategori
                                    </label>
                                    <select
                                        id="subCategory"
                                        className="form-select"
                                        value={formData.subCategoryId}
                                        onChange={handleInputChange}
                                        name="subCategoryId"
                                    >
                                        <option value="">Alt Kategori Seç</option>
                                        {filteredSubCategories.map((subCategory) => (
                                            <option key={subCategory.id} value={subCategory.id}>
                                                {subCategory.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Ürün Adı */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold" htmlFor="name">
                                        Ürün Adı
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Fiyat */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold" htmlFor="price">
                                        Fiyat
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Stok */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold" htmlFor="stock">
                                        Stok
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="stock"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Açıklama */}
                                <div className="col-md-12 mb-3">
                                    <label className="form-label fw-bold" htmlFor="description">
                                        Açıklama
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                    ></textarea>
                                </div>

                                {/* Renk Seçimi */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Renk</label>
                                    <div className="d-flex flex-wrap">
                                        {colors.map((color) => (
                                            <div key={color.id} style={{ margin: '5px', position: 'relative' }}>
                                                <input
                                                    type="radio"
                                                    name="color"
                                                    value={color.name}
                                                    checked={formData.color === color.name}
                                                    onChange={(e) => handleSelectionChange(e, 'color')}
                                                    id={`color-${color.id}`}
                                                    style={{ position: 'absolute', opacity: 0 }}
                                                />
                                                <label
                                                    htmlFor={`color-${color.id}`}
                                                    style={{
                                                        display: 'inline-block',
                                                        width: '40px',
                                                        height: '40px',
                                                        backgroundColor: color.name,
                                                        borderRadius: '50%',
                                                        border: formData.color === color.name ? '3px solid black' : '1px solid #ccc',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Beden Seçimi */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Bedenler</label>
                                    <div className="d-flex flex-wrap">
                                        {sizes.map((size) => (
                                            <div key={size.id} style={{ position: 'relative' }}>
                                                <input
                                                    type="checkbox"
                                                    value={size.id}
                                                    checked={formData.sizeIds.includes(size.id)}
                                                    onChange={(e) => handleSelectionChange(e, 'sizeIds')}
                                                    id={`size-${size.id}`}
                                                    style={{ position: 'absolute', opacity: 0 }}
                                                />
                                                <label
                                                    htmlFor={`size-${size.id}`}
                                                    className={`px-3 py-2 rounded-pill border fw-medium shadow-sm ${formData.sizeIds.includes(size.id) ? 'bg-dark text-white' : 'bg-light text-dark'
                                                        }`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease-in-out',
                                                        transform: formData.sizeIds.includes(size.id) ? 'scale(1.05)' : 'scale(1)',
                                                        userSelect: 'none',
                                                    }}
                                                >
                                                    {size.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Görsel Seçimi */}
                                <div className="col-md-12 mb-3">
                                    <label className="form-label fw-bold" htmlFor="images">
                                        Ürün Görseli
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="images"
                                        name="images"
                                        onChange={handleImageChange}
                                        multiple
                                    />
                                </div>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                    Ürün Güncelle
                                </button>
                            </div>
                        </form>
                    </div>

                    {alert?.message && (
                        <div className={`alert alert-${alert?.type}`} role="alert">
                            {alert?.message}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

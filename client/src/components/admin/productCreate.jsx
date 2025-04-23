import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createProductThunk } from '../../features/thunks/productThunk';
import { getCategoriesThunk, getSubCategoryThunk } from '../../features/thunks/categoryThunk';
import { getSizesThunk } from '../../features/thunks/colorsizeThunk';
import { clearAlert } from '../../features/slices/productSlice';
import AdminSidebar from './adminSideBar';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function ProductCreateForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories, subCategories } = useSelector((state) => state.category);
    const { sizes } = useSelector((state) => state.colorSize);
    const { alert } = useSelector((state) => state.product);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([dispatch(getCategoriesThunk()).unwrap(), dispatch(getSizesThunk()).unwrap()]);
            } catch (error) {
                console.error('Veri alınırken bir hata oluştu:', error);
            }
        };
        fetchData();
    }, [dispatch]);

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

    const [errorMessage, setErrorMessage] = useState('');

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
                [field]: value, // artık value = color.name
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
                images: imageArray, // Yalnızca images alanını güncelliyoruz
            });
        }
    };

    const validateFormData = () => {
        const { categoryId, subCategoryId, name, price, stock, color, sizeIds, description, images } = formData;

        // Boş alan kontrolleri
        if (!categoryId || !subCategoryId || !name || !price || !stock || !color || sizeIds.length === 0 || !description || images.length === 0) {
            setErrorMessage('Lütfen tüm alanları doldurun ve bir görsel seçin.');
            return false;
        }

        setErrorMessage('');
        return true;
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();

        // Form verilerini doğrula
        if (!validateFormData()) return;

        const productData = new FormData();

        const { images, ...dataToSend } = formData; // imagePreviews kaldırıldı

        // Diğer verileri FormData'ya ekleyelim
        for (const key in dataToSend) {
            if (Array.isArray(dataToSend[key])) {
                dataToSend[key].forEach((item) => {
                    productData.append(key, item);
                });
            } else {
                productData.append(key, dataToSend[key]);
            }
        }

        // Resimleri FormData'ya ekleyelim
        images.forEach((file) => {
            productData.append('images', file);
        });

        try {
            console.log("productData", productData);  // FormData'nın içeriğini kontrol et
            await dispatch(createProductThunk(productData)).unwrap();
            setTimeout(() => {
                dispatch(clearAlert());
                navigate('/admin/products');
            }, 1000);
        } catch (error) {
            console.error('Ürün oluşturulurken bir hata oluştu:', error);
        }
    };

    const colors = [
        { id: 1, name: 'kirmizi', kod: 'red' },
        { id: 2, name: 'mavi', kod: 'blue' },
        { id: 3, name: 'yeşil', kod: 'green' },
        { id: 4, name: 'sarı', kod: 'yellow' },
        { id: 5, name: 'siyah', kod: 'black' },
        { id: 6, name: 'beyaz', kod: 'white' },
        { id: 7, name: 'mor', kod: 'purple' },
        { id: 8, name: 'turuncu', kod: 'orange' },
        { id: 9, name: 'pembe', kod: 'pink' },
    ];

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Ürün Yönetimi</h2>
                    {alert?.message && (
                        <div className={`alert alert-${alert?.type}`} role="alert">
                            {alert?.message}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4 fw-bold text-dark">Yeni Ürün Oluştur</h2>
                        <form onSubmit={handleCreateProduct}>
                            <div className="row">
                                {/* Kategori Seçimi */}
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
                                        <option value="">Tüm Kategoriler</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Alt Kategori Seçimi */}
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
                                        <option value="">Tüm Alt Kategoriler</option>
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
                                        placeholder="Ürün Adı"
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
                                        placeholder="Fiyat"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Stok Miktarı */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold" htmlFor="stock">
                                        Stok Miktarı
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="stock"
                                        name="stock"
                                        placeholder="Stok Miktarı"
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
                                        placeholder="Ürün Açıklaması"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                    ></textarea>
                                </div>

                                {/* Renk Seçimi */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Renkler</label>
                                    <div className="d-flex flex-wrap">
                                        {colors.map((color) => (
                                            <div key={color.id} style={{ margin: '5px', position: 'relative' }}>
                                                <input
                                                    type="radio"
                                                    name="color"
                                                    value={color.name} // Veritabanına gönderilecek değer
                                                    checked={formData.color === color.name}
                                                    onChange={(e) => handleSelectionChange(e, 'color')}
                                                    id={`color-${color.id}`}
                                                    style={{ position: 'absolute', opacity: 0 }}
                                                />
                                                <label
                                                    htmlFor={`color-${color.id}`}
                                                    title={color.name} // Hover ile isim görünsün
                                                    style={{
                                                        display: 'inline-block',
                                                        width: '40px',
                                                        height: '40px',
                                                        backgroundColor: color.kod, // Görselde kod gözüksün
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
                                    <div className="d-flex gap-2 flex-wrap">
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



                                {/* Görsel Yükleme */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold" htmlFor="images">
                                        Ürün Görselleri
                                    </label>
                                    <input
                                        type="file"
                                        id="images"
                                        name="images"
                                        multiple
                                        className="form-control"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <div className="col-md-12 text-center">
                                    <button type="submit" className="btn btn-success">
                                        Ürün Oluştur
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams ,Link} from "react-router-dom";
import {
    getSubCategoryThunk,
    updateSubCategoryThunk,
} from "../../features/thunks/categoryThunk";
import { clearAlert } from "../../features/slices/categorySlice";
import AdminSidebar from "./adminSideBar";
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function CategoryEdit() {
    const [name, setName] = useState("");
    const [isPopular, setIsPopular] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { alert } = useSelector((state) => state.category);

    useEffect(() => {
        const fetchData = async () => {
            const action = await dispatch(getSubCategoryThunk(id)).unwrap();
            console.log("Alt Kategori verisi:", action);

            if (action.subCategory) {
                setName(action.subCategory.name);
                setIsPopular(action.subCategory.isPopular || false); // varsa mevcut değer, yoksa false
            }
        };
        fetchData();
    }, [dispatch, id]);

    const handleCheckboxChange = (e) => {
        setIsPopular(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSubCategoryThunk({ id, name, isPopular })); // güncellenmiş veri gönder
        setTimeout(() => {
            dispatch(clearAlert());
            navigate("/admin/categories");
        }, 1000);
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
            <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                                <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                            </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Alt Kategori Yönetimi</h2>
                    {alert?.message && (
                        <div className={`alert alert-${alert?.type}`} role="alert">
                            {alert?.message}
                        </div>
                    )}

                    <div className="card shadow-lg mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Alt Kategori Güncelle</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="categoryName" className="form-label">Alt Kategori Adı</label>
                                    <input
                                        type="text"
                                        id="categoryName"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Alt kategori ismini girin"
                                    />
                                </div>

                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="isPopular"
                                        checked={isPopular}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor="isPopular">
                                        Popüler Alt Kategori
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-success">
                                    Güncelle
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

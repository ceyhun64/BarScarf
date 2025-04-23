import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams ,Link} from "react-router-dom";
import { updateCategoryThunk, getCategoryByIdThunk } from "../../features/thunks/categoryThunk";
import { clearAlert } from "../../features/slices/categorySlice";
import AdminSidebar from "./adminSideBar";
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function CategoryEdit() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { alert } = useSelector((state) => state.category);

    useEffect(() => {
        const fetchData = async () => {
            const action = await dispatch(getCategoryByIdThunk(id)).unwrap();
            console.log("Kategori verisi:", action);

            if (action.category) {
                setName(action.category.name);  // Kategori adını state'e set et
            }
        };
        fetchData();
    }, [dispatch, id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCategoryThunk({ id, name }));
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
                    <h2 className="text-center mb-4">Kategori Yönetimi</h2>
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

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getUsersThunk, deleteUserThunk, getUserByNameThunk } from "../../features/thunks/userThunk";
import AdminSidebar from "./adminSideBar";
import { clearAlert } from "../../features/slices/userSlice";
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';


export default function Users() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const { users, alert } = useSelector((state) => state.user);

    // Kullanıcıları başlangıçta yükle
    useEffect(() => {
        if (name === "") {
            // Eğer arama yapılmadıysa tüm kullanıcıları getir
            dispatch(getUsersThunk());
        } else {
            // Arama yapılmışsa, kullanıcı adıyla eşleşen kullanıcıları getir
            const fetchUserByName = async () => {
                const action = await dispatch(getUserByNameThunk(name)).unwrap();
                console.log("search action:", action);
            };
            fetchUserByName();
        }
    }, [dispatch, name]); // name değiştikçe bu effect çalışır

    const handleDelete = (id) => {
        dispatch(deleteUserThunk(id));
        setTimeout(() => {
            dispatch(clearAlert());
            dispatch(getUsersThunk()); // Silme işlemi sonrası tüm kullanıcıları yenile
        }, 1000);
    };

    const handleInfo = (id) => {
        navigate(`/admin/userdetail/${id}`);
    };

    // Handle search (kullanıcı adı araması)
    const handleSearch = (e) => {
        setName(e.target.value);
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <Link className="fs-2 mb-4 d-block text-decoration-none text-dark" to="/admin/products">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>
                <AdminSidebar />
                <div className="col-md-9">
                    <h2 className="text-center mb-4">Kullanıcı Yönetimi</h2>
                    {alert?.message && (
                        <div className={`alert alert-${alert?.type}`} role="alert">
                            {alert?.message}
                        </div>
                    )}
                    <div className="card shadow-lg">
                        <div className="p-4">
                            <h5 className="mb-3">Kullanıcı Ara</h5>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Kullanıcı Adı"
                                    value={name}
                                    onChange={handleSearch} // Kullanıcı adı değiştikçe handleSearch çalışır
                                />
                            </div>
                        </div>

                        <div className="card-body">
                            <p>Toplam Üye: <strong>{users.length}</strong></p>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Ad</th>
                                            <th>Email</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.map((user) => (
                                            <tr key={user.id}>
                                                <td className='col-md-1'>{user.id}</td>
                                                <td className='col-md-4'>{user.name}</td>
                                                <td className='col-md-5'>{user.email}</td>
                                                <td className='col-md-2'>
                                                    <button
                                                        className="btn me-2"
                                                        onClick={() => handleInfo(user.id)}
                                                    >
                                                        <i className="bi bi-info-circle-fill"></i>
                                                    </button>
                                                    <button
                                                        className="btn ms-2"
                                                        onClick={() => handleDelete(user.id)}
                                                    >
                                                        <i className="bi bi-trash-fill"></i>                                                </button>
                                                </td>
                                            </tr>
                                        ))}
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

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../features/thunks/authThunk';
import { clearAlert } from '../../features/slices/authSlice'; // clearAlert import et
import { jwt_decode } from 'jwt-decode-es';
import image from '../../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const action = await dispatch(loginThunk({ email, password })).unwrap();
            console.log("Giriş başarılı:", action);
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token);
            const isAdmin = decodedToken.isAdmin;
            if (isAdmin === true) {
                setTimeout(() => {
                    navigate('/admin/products'); // Admin paneline yönlendir
                    dispatch(clearAlert()); // Alerti temizle
                }, 1000);
            }
        } catch (error) {
            console.error("Giriş hatası:", error);
            setTimeout(() => {
                dispatch(clearAlert()); // Alerti temizle
            }, 1000);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: '#white' }}>
            <div className="container">
                <Link className="fs-2 text-center mb-4" to="/">
                    <img src={image} alt="Logo" width="200" height="60" className="mb-2" />
                </Link>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-lg border-0 rounded-lg p-4" style={{
                            background: "linear-gradient(45deg, #ffffff, rgba(194, 134, 5, 0))",
                        }}>
                            <h3 className="text-center text-dark mb-4">
                                <i className="bi bi-person-fill-lock fs-1"></i>
                                Admin Girişi
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="form-label">Şifre *</label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Şifre"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-dark w-100 mb-3" style={{
                                    padding: '12px', fontSize: '16px', borderRadius: '8px'
                                }}>
                                    {loading ? (
                                        <div className="spinner-border text-light" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        "Giriş Yap"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

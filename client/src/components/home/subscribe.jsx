import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSubscribeThunk } from '../../features/thunks/subscribeThunk';
import { clearAlert } from '../../features/slices/subscribeSlice';
import logo from '../../../public/favicon/f87929a3-08f2-4b42-867d-f51879a8d8aa.png'; // Marka logosu

export default function Subscribe() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { alert } = useSelector((state) => state.subscribe);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createSubscribeThunk(email)).unwrap();
        setTimeout(() => {
            dispatch(clearAlert()); // Alerti temizle
            setEmail('');
        }, 1000);
    };

    return (
        <>
            {alert?.message && (
                <div className={`alert alert-${alert?.type}`} role="alert">
                    {alert?.message}
                </div>
            )}
            <div
                className="p-5 d-flex flex-column justify-content-center align-items-center"
                style={{
                    maxHeight: '400px',
                    backgroundColor: '#D3AF37',
                    position: 'relative',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                }}
            >

                <h2 className="text-light fw-bold mb-3 text-center" style={{ fontSize: '2rem' }}>Bültenimize Kaydolun</h2>
                <p className="text-light mb-4" style={{ fontSize: '1.1rem', textAlign: 'center' }}>
                    Trendler, kampanyalar ve diğer fırsatlar hakkında ilk haberleri sen al!
                </p>

                <form onSubmit={handleSubmit} className="w-100">
                    <div
                        className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-4"
                    >
                        <input
                            type="email"
                            className="form-control form-control-lg rounded-5 border-0 p-3"
                            placeholder="E-posta adresinizi girin"
                            value={email}
                            onChange={handleChange}
                            style={{
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                fontSize: '1rem',
                                width: '80%',
                                maxWidth: '400px',
                            }}
                        />
                        <button
                            className="btn btn-light btn-lg rounded-5 px-4"
                            type="submit"
                            style={{
                                backgroundColor: '#964B00',
                                color: '#fff',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#B38D2B')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#964B00')}
                        >
                            Abone Ol
                        </button>
                    </div>
                </form>


            </div>
        </>
    );
}

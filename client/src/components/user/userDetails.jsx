import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyUserDetailsThunk, createUserDetailsThunk, updateUserDetailsThunk } from '../../features/thunks/userDetailsThunk';
import { clearAlert } from '../../features/slices/userDetailsSlice';

const UserDetailsForm = () => {
    const dispatch = useDispatch();

    // FormData state'ini initialize et
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', phoneNumber: '', email: '',
        address: '', city: '', district: '', zipCode: ''
    });

    const [loading, setLoading] = useState(false);

    const { userDetails, alert } = useSelector(state => state.userDetails);

    // API'den kullanıcı detaylarını al
    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                await dispatch(getMyUserDetailsThunk());
            } catch (error) {
                console.error('Veri alınırken hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [dispatch]);

    // Kullanıcı detaylarını formData'ya aktar
    useEffect(() => {
        if (userDetails) {
            setFormData({
                firstName: userDetails.firstName || '',
                lastName: userDetails.lastName || '',
                phoneNumber: userDetails.phoneNumber || '',
                email: userDetails.email || '',
                address: userDetails.address || '',
                city: userDetails.city || '',
                district: userDetails.district || '',
                zipCode: userDetails.zipCode || ''
            });
        }
    }, [userDetails]);

    // Input değişimlerini yönet
    const handleInputChange = useCallback((e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }, []);

    // Alert mesajını göster
    const showAlert = useCallback((type, message) => {
        dispatch(clearAlert());
        dispatch({
            type: 'userDetails/setAlert',
            payload: { type, message }
        });
    }, [dispatch]);

    // Formu doğrula
    const validateForm = () => {
        const { firstName, lastName, phoneNumber, email, address, city, district, zipCode } = formData;
        if (!firstName || !lastName || !phoneNumber || !email || !address || !city || !district || !zipCode) {
            showAlert('warning', 'Lütfen tüm alanları doldurun.');
            return false;
        }

        // Email doğrulama
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('warning', 'Geçersiz e-posta formatı.');
            return false;
        }
        return true;
    };

    // Kullanıcı detaylarını oluştur
    const handleCreateUserDetails = useCallback(async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await dispatch(createUserDetailsThunk(formData)).unwrap();
            showAlert('success', 'Kullanıcı detayları başarıyla oluşturuldu.');
        } catch (error) {
            console.error('Oluşturma hatası:', error);
            showAlert('error', 'Kullanıcı detayları oluşturulurken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    }, [formData, dispatch, showAlert]);

    // Kullanıcı detaylarını güncelle
    const handleUpdateUserDetails = useCallback(async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await dispatch(updateUserDetailsThunk(formData)).unwrap();
            showAlert('success', 'Kullanıcı detayları başarıyla güncellendi.');
        } catch (err) {
            console.error('Güncelleme hatası:', err);
            showAlert('error', 'Kullanıcı detayları güncellenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    }, [formData, dispatch, showAlert]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        userDetails ? handleUpdateUserDetails(e) : handleCreateUserDetails(e);
    }, [handleCreateUserDetails, handleUpdateUserDetails, userDetails]);

    return (
        <div className='card shadow-lg p-4' style={{
            borderRadius: '15px',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            {alert?.message && (
                <div className={`alert alert-${alert?.type}`} role="alert">
                    {alert?.message}
                </div>
            )}

            {loading ? (
                <div className="text-center" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Yükleniyor...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {['firstName', 'lastName', 'phoneNumber', 'email', 'address', 'city', 'district', 'zipCode'].map((field, index) => (
                            <div key={index} className="col-md-6 mb-3">
                                <label className="form-label fw-bold" htmlFor={field} style={{
                                    color: '#d4af37',
                                    fontSize: '1rem',
                                    fontWeight: '600'
                                }}>
                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleInputChange}
                                    style={{
                                        borderColor: '#d4af37',
                                        borderWidth: '2px',
                                        borderRadius: '10px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                        padding: '10px'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="btn w-50 mt-2"
                        style={{
                            backgroundColor: '#d4af37',
                            color: 'white',
                            borderRadius: '10px',
                            padding: '12px 20px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s, box-shadow 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#c79c2e'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#d4af37'}
                    >
                        {userDetails ? 'Güncelle' : 'Kaydet'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default UserDetailsForm;

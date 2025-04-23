import React, { useState } from 'react'; // React'ı dahil ediyoruz
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Link ve useNavigate(sayfa yönlendirme) import edildi
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../../features/thunks/authThunk'; // authThunk.js dosyasından registerThunk fonksiyonunu import ediyoruz
import { clearAlert } from '../../features/slices/authSlice'; // clearAlert import et

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();

    const { alert, loading } = useSelector((state) => state.auth); // useSelector hookunu kullanarak auth slice'ındaki state'leri alıyoruz

    const dispatch = useDispatch(); // useDispatch hookunu kullanarak dispatch fonksiyonunu alıyoruz
    const navigate = useNavigate(); // useNavigate hookunu kullanarak navigate fonksiyonunu alıyoruz

    const handleRegister = async (e) => { // handleRegister fonksiyonunu oluşturuyoruz
        e.preventDefault(); // formun submit edilmesini engelliyoruz
        try {
            await dispatch(registerThunk({ name, email, password })).unwrap(); // registerThunk fonksiyonunu çağırıyoruz
            console.log("Kayıt başarılı");
            setTimeout(() => {
                navigate('/login'); // Ana sayfaya yönlendir
                dispatch(clearAlert()); // Alerti temizle
            }, 1000);
        } catch (error) {
            console.error("Kayıt hatası:", error);
            setTimeout(() => {
                dispatch(clearAlert()); // Alerti temizle
            }, 1000);
        }
    }

    const isActive = (path) => location.pathname === path;

    const linkStyle = (active) => ({
        fontWeight: "600", // Daha modern bir yazı kalınlığı
        color: active ? "#FFD700" : "#D3AF37", // Aktifse altın sarısı, değilse mevcut renk
        fontSize: "1.5rem", // Boyut biraz daha büyük
        textDecoration: "none", // Altı çizilmeyecek
        transform: active ? "scale(1.1)" : "scale(1)", // Aktifse biraz büyür
        transition: "all 0.3s ease-in-out", // Daha pürüzsüz geçiş için
        boxShadow: active ? "0 8px 16px rgba(0, 0, 0, 0.15)" : "none", // Aktif linkin köşelerinde daha güçlü gölge
        borderRadius: "8px", // Köşeleri yuvarlatmak
        padding: "5px 10px", // İç boşluk eklemek
        backgroundColor: active ? "#fff" : "transparent", // Aktif olduğunda arka plan beyaz
        cursor: "pointer", // Tıklanabilir olduğunu gösteren pointer işareti
        zIndex: active ? "10" : "1", // Aktif olduğunda linki öne çıkartmak
        boxSizing: "border-box", // İçerik hizalamalarını doğru yapmak
    });

    return (
        <div className="container">
            <div className="row justify-content-center">
                {alert.message && ( // alertin mesajı varsa
                    <div className={`alert alert-${alert.type}`} role="alert"> {/* alertin türüne göre yukarıda atadığımız alertin classını ayarlıyoruz(danger veya success) */}
                        {alert.message} {/* alertin mesajını gösteriyoruz */}
                    </div>
                )}
                <div className="col-md-6">
                    <div className="card p-4 shadow-lg"
                        style={{
                            background: "linear-gradient(45deg, #ffffff, rgba(194, 134, 5, 0))",
                            padding: "8px 0",
                        }}
                    >
                        <div className="d-flex justify-content-center gap-4 mb-4">
                            <Link to="/login" style={linkStyle(isActive("/login"))}>
                                Giriş Yap
                            </Link>
                            <Link to="/register" style={linkStyle(isActive("/register"))}>
                                Kayıt Ol
                            </Link>
                        </div>
                        <form onSubmit={handleRegister}>{/* formun kullanıcı tarafından doldurulup gönderilmesi durumunda handleRegister fonksiyonunu çalıştırıyoruz */}
                            {/* Name Input */}
                            <div className="form-group mb-3">
                                <label htmlFor="name" className="form-label">Ad</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Ad"
                                    value={name} // atadığımız name stateini value olarak atıyoruz
                                    onChange={(e) => setName(e.target.value)} // onChange olduğunda setName fonksiyonunu çalıştırıyoruz ve e.target.value ile inputun değerini alıyoruz
                                />
                            </div>

                            {/* Email Input */}
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email} // atadığımız email stateini value olarak atıyoruz
                                    onChange={(e) => setEmail(e.target.value)} // onChange olduğunda setEmail fonksiyonunu çalıştırıyoruz ve e.target.value ile inputun değerini alıyoruz
                                />
                            </div>

                            {/* Password Input */}
                            <div className="form-group mb-3">
                                <label htmlFor="password" className="form-label">Şifre *</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Şifre"
                                    value={password} // atadığımız password stateini value olarak atıyoruz
                                    onChange={(e) => setPassword(e.target.value)} // onChange olduğunda setPassword fonksiyonunu çalıştırıyoruz ve e.target.value ile inputun değerini alıyoruz
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn w-100 mb-3"
                                style={{
                                    backgroundColor: "#D3AF37",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    border: "none"
                                }}
                            >
                                {loading ? ( // loading statei true ise
                                    <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    "Kayıt Ol"
                                )}
                            </button>
                            {/* Divider */}
                            <div className="text-center mb-3">
                                <label htmlFor="veya">veya</label>
                            </div>

                            {/* Google Login Button */}
                            <button type="button" className="btn btn-outline-dark w-100 mb-3">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2Zb0wbZRzHn3taesUtRpOJYbo/DoQM5c/GMgryzxkYxbGBiQsbNBCEFGaIY8zCCuaUMSiQAQMGQWAgcSY2GeuNuzpc8NqNvRoCItE3841Dthj3ToNzbX+mVRBI197Zo2VJv8n3XZ+nn89dn6dPrwj5448/HgcoJIWqgGIoxywU4HuQTfwJSsIKBxBAKgJIQzbIJhZBhX+BE/g6VAUU2ccgXwc0UgWU4tvwNmGBJASCqiQsoMa3QRsQ433wOlk4qPEsvCkQ2llTEUAxnoEaFOIdeA3RCumEzWPwtT2IrHCK0K0f+HkUCMX4B9HBk9b0PTwNFJKJC9+NngcVfrDu8En/toJoFw9+EMnhOPGr1+DLCE40eIeAGn/vPXgsMvyHRIfgrbEMT0IlroUmaQpQaAtQKAjOSN6C05hy7Db21zgbW4pN4sI3kyGQQVh5g5+W9PJZfEChZ+ADydAqkVKR4R1vVIHv8IIvwPNwDr0oeP4aFAJ5+P76wJvl22CcfAQaCUCyC/gSPAV6JEEbLWAmdWAmwdHeAIB0wvmV35DweiQBs2x+WcDeURmACv8Hn0lYoAK9hDZiwCSPXwW/VI4E0En/ObuclPSjjRowybROBZY6FPAAyhGJNmrATF5xKWCSdQiZL1gzC2I0XDthO9rUd9e9gImccynAkRm+EAjWzMIbddcW+Qg8dCMQ6iuB3TW3rHwEHrkWQJt9JbCjehKeaoHtVd+C5x+hm7IwXwns1t60Pd2L+JNRHovYTI642UY7fSVwRDc8z0NAduZJ8A+5Z6Geif/jvF4RiEROy3D+puiPvrG4Eii/0DjqXoALVDiDnx0PBhWthENXs6HDGHtJbIGTnfX97u6Arq/iuHsBQBjMsntL4DYzCfRYOGQbDjvg7c2jlZaL11/bJhZ8W496Z2SNyeoK/vVas4XiKH5P88BENtrhfzdthrNMwjL4ylaPJi9wXIrHjwcpjpIeafxswd3VL2lrm+A9KXCBL98df+GvEjrdKfxSP2YTZjyRoDhKmt/SM+d2/6+egsbuylhBkzcwihlX8CvvRP/X4VuFwvfeiNhe1lX3E5/d51hz75zQ+RE9FvZKPq208pHIp5WWzq/2DlCDKXJ38w6PRW1qZ/b15RmU1pyRHDja2uH2FEp9ekrQl+dyutmY1iweAitFGljFdJdxL6VnIw5cGdsVdJkL2zJgjEq8aNxTV8ckTNpfs3JM1kgOFPZQsLXqO6cC77c3dSNPomPjpvkKeNKiwXLYWX1nFfy7TQM/Ik+j10fINHTqfW9IFH5RCJG1Jgd8ev2Xv53o6hJ0cHxiOG7HczVM4oI3JI7pc0HVemGeGq4MEgV+hYT8LBM/K2RN/J+eYxXTRmPo+v3m7jNGNecaMq2iX3lDprWXjWlG3sgwvSe0gY2beseQ5TF4ztXDjqt++caru5C3MzQWGdvM7L9VZDj4WCh4AZ3xuJGJm/icifb+n3xrowck6WeiC1uN+0a1TOLPajptUWVQWu13yH4IzDVk2tSGtMWqa8nzLex+ts8YU2Afg/zxxx/kaf4GzSVnCicBYF0AAAAASUVORK5CYII="
                                    alt="Google"
                                    style={{ width: '20px', marginRight: '20px' }}
                                />
                                Google ile Kaydol
                            </button>

                            <div className="text-center">
                                <label className='me-3'>Hesabınız var mı?</label>
                                <Link to="/login" className="btn btn-outline-success">Giriş Yap</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

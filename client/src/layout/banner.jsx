import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBannersThunk } from "../features/thunks/sliderThunk";

export default function Banner() {
    const dispatch = useDispatch();
    const { banners, isLoading } = useSelector((state) => state.slider);

    // Sayfa yüklendiğinde bannerları getir
    useEffect(() => {
        dispatch(getBannersThunk());
    }, [dispatch]);


    // Güvenli erişim için imageUrl'yi kontrol et
    const bannerImage = banners?.[0]?.imageUrl || "";
    console.log("Banner Image:", bannerImage);

    return (
        <div className="banner" style={{ marginTop: "10px", marginBottom: "20px" }}>
            {/* Eğer isLoading true ise, loading spinner göster */}
            {isLoading ? (
                <div style={{ textAlign: "center", padding: "50px 0" }}>
                    <div className="spinner"></div> {/* CSS spinner'ı */}
                </div>
            ) : (
                // Banner'ı göster
                bannerImage && (
                    <Link to="/products" style={{ textDecoration: "none" }}>
                        <div
                            style={{
                                width: "100%",
                                overflow: "hidden",
                                borderRadius: "10px",
                                position: "relative",
                            }}
                        >
                            <img
                                src={bannerImage}
                                alt="Banner"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    display: "block",
                                }}
                            />
                        </div>
                    </Link>
                )
            )}
        </div>
    );
}

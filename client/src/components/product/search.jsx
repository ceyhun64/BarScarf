import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "./card";
import Navbar from "../../layout/navbar";
import { getProductsByNameThunk } from "../../features/thunks/productThunk";

export default function Search() {
    const dispatch = useDispatch();
    const [name, setName] = useState(""); // input değeri için state
    const navigate = useNavigate();
    const [searchLoading, setSearchLoading] = useState(false); // arama yükleniyor mu state
    const [searchResults, setSearchResults] = useState([]); // arama sonuçları

    useEffect(() => {
        // Eğer searchResults boşsa ve name değişmediyse ürünleri almak için bir fonksiyon çağırmıyoruz.
        if (name.length > 0) {
            setSearchLoading(true);
            const fetchData = async () => {
                try {
                    const response = await dispatch(getProductsByNameThunk(name)).unwrap();
                    
                    setSearchResults(response); // Arama sonuçlarını state'e ekliyoruz.
                } catch (error) {
                    console.error("Arama hatası:", error);
                    setSearchResults([]); // Hata durumunda sonuçları sıfırlıyoruz
                } finally {
                    setSearchLoading(false); // Yükleme bitince loading state'ini sıfırlıyoruz
                }
            };
            fetchData();
        } else {
            setSearchResults([]); // Arama kutusu boşsa sonuçları sıfırlıyoruz
        }
    }, [name, dispatch]); // `name` değiştiğinde çalışacak, çünkü arama yapılırken `name`'in değişmesi gerekiyor

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // formun sayfa yeniden yüklenmesini engelliyoruz
        if (searchResults.length > 0) {
            navigate(`/product/${searchResults[0].id}`); // İlk arama sonucu sayfasına yönlendiriyoruz
        }
    };

    return (<>
        <Navbar />
        <div className="container mt-2">
            <div className="search">
                <form
                    className="d-flex me-0 position-relative"
                    onSubmit={handleSearchSubmit}
                    style={{ width: "100%", zIndex: 1 }}
                >
                    <div className="w-100 position-relative">
                        <input
                            type="text"
                            className="form-control custom-input"
                            placeholder="Ürün Adı ..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                height: "100px", // input yüksekliğini arttırdık
                                borderBottom: "2px solid #D3AF37", // altına çizgi ekledik
                                borderRadius: "0", // kenarları keskinleştirdik
                                fontSize: "30px", // font boyutunu arttırdık
                                borderLeft: "none", // sol kenarın kenarlığını kaldırdık
                                borderTop: "none", // üst kenarın kenarlığını kaldırdık
                                borderRight: "none", // sağ kenarın kenarlığını kaldırdık
                                padding: "5px", // iç padding
                                outline: "none", // etrafındaki mavi ışığı (focus) kaldırdık
                                boxShadow: "none", // box-shadow etkisini kaldırdık
                                backgroundColor: "transparent", // arka plan rengini kaldırdık
                            }}
                        />

                        <div className="row">
                            {searchResults.map((product) => (
                                <div key={product.id} className="col-md-3">
                                    <Card product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
    );

}

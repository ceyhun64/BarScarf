import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByColorThunk } from '../../features/thunks/productThunk';

export default function Filter() {
    const dispatch = useDispatch();
    const [color, setColor] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const { error } = useSelector(state => state.product);

    useEffect(() => {
        if (color) {
            dispatch(getProductsByColorThunk(color));
        }
    }, [color, dispatch]);

    const options = [
        { value: "", label: "Tüm Renkler" },
        { value: "kirmizi", label: "Kırmızı" },
        { value: "mavi", label: "Mavi" },
        { value: "sari", label: "Sarı" },
        { value: "yesil", label: "Yeşil" },
        { value: "siyah", label: "Siyah" },
        { value: "beyaz", label: "Beyaz" },
        { value: "mor", label: "Mor" },
        { value: "pembe", label: "Pembe" },
        { value: "turuncu", label: "Turuncu" },
    ];

    const selectedLabel = options.find(opt => opt.value === color)?.label || "Tüm Renkler";

    return (
        <div className="position-relative mb-3" style={{ minWidth: "150px" }}>
            <label className="form-label mb-1 fw-semibold">RENK</label>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="d-flex justify-content-between align-items-center px-3 py-2 border rounded bg-white shadow-sm"
                style={{ cursor: "pointer", userSelect: "none" }}
            >
                <span>{selectedLabel}</span>
                <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }}><i className="bi bi-arrow-down-short"></i></span>
            </div>

            {error && (
                <div style={{ color: 'red', marginTop: '8px' }}>
                    <strong>{error}</strong>
                </div>
            )}

            {isOpen && (
                <ul
                    className="position-absolute bg-white border shadow rounded mt-1 p-0"
                    style={{
                        listStyle: "none",
                        width: "100%",
                        zIndex: 20,
                        maxHeight: "220px",
                        overflowY: "auto",
                        transition: "all 0.3s ease",
                    }}
                >
                    {options.map(opt => (
                        <li
                            key={opt.value}
                            onClick={() => {
                                setColor(opt.value);
                                setIsOpen(false);
                            }}
                            className={`px-3 py-2 ${color === opt.value ? 'bg-light fw-semibold' : ''}`}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = color === opt.value ? "#f1f1f1" : "white"}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

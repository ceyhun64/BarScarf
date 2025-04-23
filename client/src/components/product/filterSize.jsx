import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSizesThunk } from '../../features/thunks/colorsizeThunk';
import { getProductsBySizeThunk } from '../../features/thunks/productThunk';

export default function SizeFilter() {
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const { sizes, error } = useSelector(state => state.colorSize);

    useEffect(() => {
        dispatch(getSizesThunk());
    }, [dispatch]);

    const handleSizeChange = (sizeId) => {
        setSelectedSize(sizeId);
        dispatch(getProductsBySizeThunk(sizeId));
    };

    const selectedLabel = sizes.find(size => size.id === selectedSize)?.name || "Tüm Bedenler";

    return (
        <div className="position-relative mb-3" style={{ minWidth: "180px" }}>
            <label className="form-label mb-1 fw-semibold">BEDEN</label>

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
                    <li
                        key="all"
                        onClick={() => {
                            handleSizeChange("");
                            setIsOpen(false);
                        }}
                        className={`px-3 py-2 ${selectedSize === "" ? 'bg-light fw-semibold' : ''}`}
                        style={{ cursor: "pointer" }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedSize === "" ? "#f1f1f1" : "white"}
                    >
                        Tüm Bedenler
                    </li>

                    {sizes.map(size => (
                        <li
                            key={size.id}
                            onClick={() => {
                                handleSizeChange(size.id);
                                setIsOpen(false);
                            }}
                            className={`px-3 py-2 ${selectedSize === size.id ? 'bg-light fw-semibold' : ''}`}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedSize === size.id ? "#f1f1f1" : "white"}
                        >
                            {size.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

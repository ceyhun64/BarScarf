import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortByNameAsc, sortByNameDesc, sortByPriceAsc, sortByPriceDesc } from "../../features/slices/productSlice";

export default function Sort() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("");

    const handleSortChange = (value) => {
        setSelectedSort(value);
        setIsOpen(false);

        if (value === "name-asc") dispatch(sortByNameAsc());
        if (value === "name-desc") dispatch(sortByNameDesc());
        if (value === "price-asc") dispatch(sortByPriceAsc());
        if (value === "price-desc") dispatch(sortByPriceDesc());
    };

    const options = [
        { value: "name-asc", label: "Alfabetik A-Z" },
        { value: "name-desc", label: "Alfabetik Z-A" },
        { value: "price-asc", label: "Fiyat Artan" },
        { value: "price-desc", label: "Fiyat Azalan" },
    ];

    const selectedLabel = options.find(opt => opt.value === selectedSort)?.label || "Sıralama";

    return (
        <div className="position-relative mb-3" style={{ minWidth: "150px" }}>
            <label className="form-label mb-1 fw-semibold">SIRALA</label>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="d-flex justify-content-between align-items-center px-3 py-2 border rounded bg-white shadow-sm"
                style={{ cursor: "pointer", userSelect: "none" }}
            >
                <span>{selectedLabel}</span>
                <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }}>
                    <i className="bi bi-arrow-down-short"></i>
                </span>
            </div>

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
                            onClick={() => handleSortChange(opt.value)}
                            className={`px-3 py-2 ${selectedSort === opt.value ? 'bg-light fw-semibold' : ''}`}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedSort === opt.value ? "#f1f1f1" : "white"}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

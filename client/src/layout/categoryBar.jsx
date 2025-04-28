import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesThunk, getSubCategoryThunk } from "../features/thunks/categoryThunk";

export default function CategoryBar() {
    const dispatch = useDispatch();
    const { categories, subCategories } = useSelector((state) => state.category);
    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    const handleCategoryHover = (categoryId) => {
        setHoveredCategoryId(categoryId);
        const fetchData = async () => {
            await dispatch(getSubCategoryThunk(categoryId)).unwrap();
        }
        fetchData();
    };

    const handleMouseLeave = () => {
        setHoveredCategoryId(null);
    };

    return (
        <div
            style={{
                background: "linear-gradient(45deg, #ffffff, rgba(194, 134, 5, 0.26))",
                padding: "4px 0", // daha az boşluk
                position: "relative",
            }}
        >
            <div className="container">
                <ul className="nav justify-content-center flex-wrap">
                    <li className="nav-item mb-1 mb-md-0">
                        <Link
                            to="/products"
                            className="nav-link"
                            style={{
                                fontSize: "0.9rem", // font boyutunu biraz küçülttük
                                color: "#964B00",
                                fontWeight: "500",
                                textShadow: "1px 1px 2px rgb(255, 255, 255)",
                                padding: "4px 8px", // linklerin iç boşluğu da az olsun
                            }}
                        >
                            Tüm Ürünler
                        </Link>
                    </li>

                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="nav-item mb-1 mb-md-0 position-relative"
                            onMouseEnter={() => handleCategoryHover(category.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                to={`/category/${category.id}`}
                                className="nav-link"
                                style={{
                                    fontSize: "0.9rem", // küçültüldü
                                    color: "#D3AF37",
                                    fontWeight: "500",
                                    textShadow: "1px 1px 2px rgb(255, 255, 255)",
                                    padding: "4px 8px", // link padding azaldı
                                }}
                            >
                                {category.name}
                            </Link>

                            {hoveredCategoryId === category.id && subCategories.length > 0 && (
                                <ul
                                    className="position-absolute bg-white shadow rounded"
                                    style={{
                                        top: "100%",
                                        left: 0,
                                        zIndex: 10,
                                        minWidth: "200px",
                                        padding: "10px",
                                        listStyle: "none",
                                    }}
                                >
                                    {subCategories.map((sub) => (
                                        <li key={sub.id}>
                                            <Link
                                                to={`/subcategory/${sub.id}`}
                                                className="dropdown-item my-1"
                                                style={{
                                                    color: "#964B00",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {sub.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

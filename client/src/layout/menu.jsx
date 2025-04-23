import React, { useEffect, useState } from 'react';
import { Offcanvas, Button, ListGroup, Accordion } from 'react-bootstrap';
import { getCategoriesThunk } from '../features/thunks/categoryThunk';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function Menu() {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getCategoriesThunk()).unwrap();
            } catch (error) {
                console.error("Kategori alınırken hata:", error);
            }
        };

        fetchData(); // Async fonksiyonu çağır
    }, [dispatch]); // `dispatch` bağımlılığı eklenmeli!

    // Kategorileri cinsiyetlere göre gruplama fonksiyonu
    const groupCategoriesByGender = () => {
        const genderCategories = {
            1: { name: "Erkek", categories: [] },
            2: { name: "Kadın", categories: [] },
            3: { name: "Çocuk", categories: [] },
            4: { name: "Unisex", categories: [] },
        };

        categories.forEach(category => {
            if (genderCategories[category.genderId]) {
                genderCategories[category.genderId].categories.push(category);
            }
        });

        return genderCategories;
    };

    const genderCategories = groupCategoriesByGender();

    return (
        <>
            {/* Menü Açma Butonu */}
            <Button
                variant="light"
                onClick={() => setShowMenu(true)}
                className="border-0 bg-transparent p-0 d-flex align-items-center"
                style={{ color: '#D3AF37' }} // GOLD RENGİ

            >
                <i className="bi bi-list fs-1 text-dark"></i> {/* Bootstrap ikonu */}
            </Button>

            {/* Offcanvas Menü */}
            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start">
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title className="fw-bold fs-4">Menü</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="bg-light">
                    <Accordion>
                        {Object.keys(genderCategories).map(genderId => {
                            const genderCategory = genderCategories[genderId];
                            return genderCategory.categories.length > 0 ? (
                                <Accordion.Item key={genderId} eventKey={genderId.toString()}>
                                    <Accordion.Header>{genderCategory.name}</Accordion.Header>
                                    <Accordion.Body>
                                        <ListGroup variant="flush">
                                            {genderCategory.categories.map(category => (
                                                <ListGroup.Item key={category.id} className="border-0">
                                                    <Link to={`/category/${category.id}`} className="text-decoration-none text-dark">
                                                        <i className="bi bi-chevron-right text-muted"></i> {category.name}
                                                    </Link>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ) : null;
                        })}
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

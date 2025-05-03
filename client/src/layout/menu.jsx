import React, { useEffect, useState } from 'react';
import { Offcanvas, Button, ListGroup, Accordion } from 'react-bootstrap';
import { getCategoriesThunk, getAllSubCategoriesThunk } from '../features/thunks/categoryThunk';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function Menu() {
    const [showMenu, setShowMenu] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null); // Aktif kategori durumu
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const subCategories = useSelector((state) => state.category.subCategories);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getCategoriesThunk()).unwrap();
                await dispatch(getAllSubCategoriesThunk()).unwrap();
            } catch (error) {
                console.error("Veri alınırken hata:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    const getCategoriesWithSubs = () => {
        return categories.map(category => ({
            ...category,
            subCategories: subCategories.filter(sub => sub.categoryId === category.id)
        }));
    };

    const categoriesWithSubs = getCategoriesWithSubs();

    // Offcanvas açıldığında body'nin overflow özelliğini değiştirme
    useEffect(() => {
        if (showMenu) {
            document.body.style.overflow = 'hidden'; // Sayfa kaymasını engeller
        } else {
            document.body.style.overflow = 'auto'; // Normal kaydırma moduna döner
        }

        return () => {
            document.body.style.overflow = 'auto'; // Cleanup - Sayfa kaydırma normal haline gelir
        };
    }, [showMenu]);

    // Kategori başlıklarına tıklandığında aktif kategoriyi set et
    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
    };

    return (
        <>
            <Button
                variant="white"
                onClick={() => setShowMenu(true)}
                className="border-0 bg-transparent p-0 d-flex align-items-center"
                style={{
                    color: '#D3AF37',
                    fontSize: '2rem', // Buton yazı boyutunu büyüttük
                    transition: 'color 0.3s',
                }}
            >
                <i className="bi bi-list text-dark" style={{ fontSize: '2rem' }}></i> {/* İkonu büyüttük */}
            </Button>

            <Offcanvas
                show={showMenu}
                onHide={() => setShowMenu(false)}
                placement="start"
                style={{ width: '350px', backgroundColor: '#f8f9fa', borderRight: '1px solidrgb(255, 255, 255)', zIndex: 9999 }}
            >
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title className="fw-bold fs-4" style={{ color: '#964B00', fontSize: '2rem' }}>Menü</Offcanvas.Title> {/* Başlık büyütüldü */}
                </Offcanvas.Header>
                <Offcanvas.Body className="bg-white">
                    <Accordion flush>
                        {categoriesWithSubs.map((category, index) => (
                            <Accordion.Item key={category.id} eventKey={index.toString()} className="border-0">
                                <Accordion.Header
                                    style={{
                                        backgroundColor: 'white',
                                        color: activeCategory === category.id ? '#D3AF37' : '#964B00', // Aktif kategoriye renk ekle
                                        fontSize: '2rem', // Kategori başlık font boyutunu büyüttük
                                        fontWeight: '900', // Yazı kalınlığını artırdık
                                        borderRadius: '8px',
                                        transition: 'background-color 0.3s',
                                        cursor: 'pointer',
                                        boxShadow: 'none', // focus ve active görünümünü kaldırır
                                        outline: 'none',   // focus durumunda oluşan mavi çizgiyi kaldırır
                                    }}
                                    onClick={() => handleCategoryClick(category.id)}
                                    onFocus={(e) => e.target.style.outline = 'none'} // Focus olduğunda outline'ı kaldır
                                    onBlur={(e) => e.target.style.outline = 'none'}  // Blur olduğunda outline'ı kaldır
                                    onMouseDown={(e) => e.preventDefault()} // MouseDown durumunda odaklanmayı engeller
                                >
                                    {category.name}
                                </Accordion.Header>

                                <Accordion.Body className="py-2">
                                    <ListGroup variant="flush">
                                        {category.subCategories.map(sub => (
                                            <ListGroup.Item
                                                key={sub.id}
                                                className="border-0 ps-4"
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    color: '#555',
                                                    fontSize: '1.2rem', // Alt kategori yazı boyutunu büyüttük
                                                    paddingLeft: '30px',
                                                    transition: 'background-color 0.3s',
                                                }}
                                            >
                                                <Link
                                                    to={`/subcategory/${sub.id}`}
                                                    className="text-decoration-none text-secondary"
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        fontWeight: '500',
                                                    }}
                                                >
                                                    <i className="bi bi-chevron-right text-muted me-2" style={{ fontSize: '1.5rem' }}></i> {/* İkonu büyüttük */}
                                                    {sub.name}
                                                </Link>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

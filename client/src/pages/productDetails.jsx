import React from 'react';
import Navbar from '../layout/navbar';
import CategoryBar from '../layout/categoryBar';
import Details from '../components/product/details';
import FeaturedProducts from '../components/home/featuredProducts';
import Footer from '../layout/footer';
import ServiceInfo from '../components/home/serviceInfo';
import Subscribe from '../components/home/subscribe';

export default function ProductDetail() {
    return (
        <>
            <Navbar />
            <CategoryBar />
            <Details />
            <h4>Bunu alanlar şunları da aldı</h4>
            <FeaturedProducts />
            <ServiceInfo />
            <Subscribe />
            <Footer />
        </>
    );
}

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
            <h5 className="text-center">Bunu alanlar şunları da aldı</h5>
            <FeaturedProducts />
            <ServiceInfo />
            <Subscribe />
            <Footer />
        </>
    );
}


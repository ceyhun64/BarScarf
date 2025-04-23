import React from 'react';
import Navbar from '../layout/navbar';
import CategoryBar from '../layout/categoryBar';
import Details from '../components/product/details';
import Footer from '../layout/footer';
import ServiceInfo from '../components/home/serviceInfo';
import Subscribe from '../components/home/subscribe';

export default function ProductDetail() {
    return (
        <>
            <Navbar />
            <CategoryBar />
            <Details />
            <ServiceInfo />
            <Subscribe />
            <Footer />
        </>
    );
}

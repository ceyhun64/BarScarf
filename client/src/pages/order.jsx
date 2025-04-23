import React from 'react';
import Order from '../components/order/order';
import { Link } from 'react-router-dom';
import Navbar from '../layout/navbar';
import CategoryBar from '../layout/categoryBar';
import Footer from '../layout/footer';
import image from '../assets/images/12.jpg';


export default function OrderPage() {
    return (

        <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Navbar />
            <CategoryBar />
            <Order />
            <br />
            <br />
            <Footer />
        </div>
    );
}
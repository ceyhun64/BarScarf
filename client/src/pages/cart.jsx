import React from "react";
import Navbar from '../layout/navbar';
import Cart from "../components/cart/cart";
import CategoryBar from '../layout/categoryBar';
import Footer from '../layout/footer';
import image from '../assets/images/12.jpg';

export default function CartPage() {
  return (
    <div className="container-fluid" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <CategoryBar />
      <div className="container mt-5 mb-5">
        <Cart />
      </div>
      <Footer />
    </div>
  );
}

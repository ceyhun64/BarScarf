import React from "react";
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import CategoryBar from '../layout/categoryBar';
import CartEdit from "../components/cart/cartEdit";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <CategoryBar />
      <div className="mb-5">
        <CartEdit />
      </div>
      <Footer />
    </>
  );
}

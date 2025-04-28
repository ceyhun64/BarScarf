import React from "react";
import Navbar from "../layout/navbar";
import CategoryBar from "../layout/categoryBar";
import Banner from "../layout/banner";
import Heroes from "../layout/heroes";
import Slider from "../components/home/slider";
import FeaturedProducts from "../components/home/featuredProducts";
import ServiceInfo from "../components/home/serviceInfo";
import Subscribe from "../components/home/subscribe";
import image from '../assets/images/12.jpg' // Görselin yolunu doğru verdiğinizden emin olun
import Footer from "../layout/footer";

export default function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100" >
      <div>
        <Navbar />
        <CategoryBar />
        <Banner />
        <Heroes />
      </div>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          padding: '0', // login kutusunu biraz ortalar
        }}
      >

        <Slider />
        <FeaturedProducts />
        <ServiceInfo />
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
}

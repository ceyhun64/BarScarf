import React from "react";
import Topbar from "../components/home/topbar";
import Navbar from "../layout/navbar";
import CategoryBar from "../layout/categoryBar";
import Banner from "../layout/banner";
import Slider from "../components/home/slider";
import PopularCategories from "../components/home/popularCategories";
import FeaturedProducts from "../components/home/featuredProducts";
import ServiceInfo from "../components/home/serviceInfo";
import Subscribe from "../components/home/subscribe";
import image from '../assets/images/12.jpg' // Görselin yolunu doğru verdiğinizden emin olun

import Footer from "../layout/footer";


export default function HomePage() {
  return (


    <div className="d-flex flex-column min-vh-100" >
      <div>
        <Topbar />
        <Navbar />
        <CategoryBar />
        <Banner />

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
        <PopularCategories />
        <FeaturedProducts />
        <ServiceInfo />
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
}

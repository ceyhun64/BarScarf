import React from 'react'
import About from '../components/home/about'
import Navbar from '../layout/navbar'
import CategoryBar from '../layout/categoryBar'
import Footer from '../layout/footer'
export default function AboutPage() {
    return (
        <>
            <Navbar />
            <CategoryBar />
            <About />
            <Footer />
        </>
    )
}
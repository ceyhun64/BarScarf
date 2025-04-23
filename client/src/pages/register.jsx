import React from 'react'
import Navbar from '../layout/navbar'
import CategoryBar from '../layout/categoryBar'
import Register from '../components/auth/register'
import Footer from '../layout/footer'
import image from '../assets/images/12.jpg' // Görselin yolunu doğru verdiğinizden emin olun


export default function RegisterPage() {
    return (
            <div>
                <Navbar />
                <CategoryBar />
    
                <div
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        padding: '50px 0', // login kutusunu biraz ortalar
                    }}
                >
                    <Register />
                </div>
    
                <Footer />
            </div>
        )
}
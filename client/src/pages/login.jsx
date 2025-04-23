import React from 'react'
import Navbar from '../layout/navbar'
import Login from '../components/auth/login'
import CategoryBar from '../layout/categoryBar'
import Footer from '../layout/footer'
import image from '../assets/images/12.jpg'

export default function LoginPage() {
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
                <Login />
            </div>
            <Footer />
        </div>
    )
}

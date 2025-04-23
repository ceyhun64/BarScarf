import React from 'react'
import Navbar from '../layout/navbar'
import CategoryBar from '../layout/categoryBar'
import Footer from '../layout/footer'
import PasswordEmail from '../components/auth/passwordEmail';

export default function PasswordEmailPage() {
    return (
        <div>
            <Navbar />
            <CategoryBar />
            <br />
            <PasswordEmail />
            <br />
            <Footer />
        </div>
    )
}

import React from 'react'
import Navbar from '../layout/navbar'
import CategoryBar from '../layout/categoryBar'
import UpdatePassword from '../components/auth/updatePassword'

export default function UpdatePasswordPage() {
    return (
        <div>
            <Navbar />
            <CategoryBar />
            <UpdatePassword />
        </div>
    )
}
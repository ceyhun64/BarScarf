import React from 'react';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import CategoryBar from '../layout/categoryBar';
import Favorites from '../components/favorites/favorites';



export default function FavoritesPage() {
    return (
        <>
            <Navbar />
            <CategoryBar />
            <div className="container my-5">
                <div className="row">
                    <h2>Favoriler</h2>
                    <Favorites />
                </div>
            </div>
            <Footer />
        </>
    );
}

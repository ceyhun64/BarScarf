import React from 'react'
import Navbar from '../layout/navbar'
import CategoryBar from '../layout/categoryBar'
import ListByCategory from '../components/product/listByCategory'
import Sort from '../components/product/sort'
import ColorFilter from '../components/product/filterColor'
import Subscribe from '../components/home/subscribe'

import Footer from '../layout/footer'

export default function ProductsPageByCategory() {
    return (
        <div>
            <Navbar />
            <CategoryBar />

            <div className="mt-3">
                {/* Responsive filtre ve sıralama */}
                <div className="container">
                    <div className="row g-3 align-items-center">
                        <div className="col-6 col-md-10">
                            <div className="d-flex flex-wrap gap-2">
                                <ColorFilter />
                            </div>
                        </div>
                        <div className="col-6 col-md-2">
                            <div className="d-flex justify-content-md-end justify-content-start">
                                <Sort />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ürün listesi */}
            <div className="my-1 me-3 ms-3">
                <ListByCategory />
            </div>

            <Subscribe />
            <Footer />
        </div>
    )
}

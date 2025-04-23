import React from 'react';
import Navbar from '../layout/navbar';
import CategoryBar from '../layout/categoryBar';
import Footer from '../layout/footer';
import Panel from '../components/user/userPanel';

export default function UserPanelPage() {
    return (
        <div>
            <Navbar />
            <CategoryBar />
            <Panel />
            <div className='mt-5'>
                <Footer />
            </div>

        </div>
    );
}

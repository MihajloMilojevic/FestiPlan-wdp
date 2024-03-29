import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = () => {
    return (
        <>
            <Navbar />
            <main style={{flex: 1}}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
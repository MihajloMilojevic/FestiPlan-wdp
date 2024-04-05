import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Tabs from '../Tabs/Tabs';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Tabs />
            <main style={{flex: 1}}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
    <div className="layout">
        <Header />
        <main>{children}</main>
    </div>
);

export default Layout;
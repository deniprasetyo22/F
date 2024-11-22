import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Fragments/Header'
import Footer from '../Fragments/Footer'

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
import React from 'react'
import Footer from '../footer/Footer'

function Layout({ children }) {
    return (
        <div>
            {/* main Content  */}
            <div className="content min-h-screen">
                {children}
            </div>

            {/* Footer  */}
            <Footer />
        </div>
    )
}

export default Layout
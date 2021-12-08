import React from 'react'
import Checkout from '../../components/user/Checkout'
import Footer from '../../components/user/Footer'
import Navbar from '../../components/user/Navbar'

function CheckoutPage() {
    return (
        <>
        <div>
             <Navbar></Navbar>  
            <Checkout></Checkout>
            
        </div>
        <Footer/>
        </>
    )
}

export default CheckoutPage

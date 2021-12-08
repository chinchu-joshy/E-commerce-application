import React from 'react'
import ViewProduct from '../../components/user/ViewProduct'
import {useParams} from 'react-router-dom'
import Navbar from '../../components/user/Navbar'
import Footer from '../../components/user/Footer'
function ViewProductPage() {
    const {id}=useParams()
    return (
        <div>
            <Navbar/>
           <ViewProduct id={id}/>
           <Footer/>
        </div>
    )
}

export default ViewProductPage

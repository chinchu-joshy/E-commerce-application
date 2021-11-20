import React from 'react'
import ViewProduct from '../../components/user/ViewProduct'
import {useParams} from 'react-router-dom'
import Navbar from '../../components/user/Navbar'
function ViewProductPage() {
    const {id}=useParams()
    return (
        <div>
            <Navbar/>
           <ViewProduct id={id}/>
        </div>
    )
}

export default ViewProductPage

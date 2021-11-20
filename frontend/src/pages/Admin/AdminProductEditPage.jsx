import React from 'react'
import ProductEdits from '../../components/admin/ProductEdits'
import {useParams} from 'react-router-dom'
import Home from '../../components/admin/Home'

function AdminProductEditPage({match}) {
    
    const {id}=useParams()
   
    return (
        <div>
            <Home/>
           <ProductEdits value={id}></ProductEdits>
        </div>
    )
}

export default AdminProductEditPage

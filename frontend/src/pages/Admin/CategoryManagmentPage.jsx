import React from 'react'
import CategoryManagment from '../../components/admin/CategoryManagment'
import Home from '../../components/admin/Home'
import UserHome from '../User/UserHome'

function CategoryManagmentPage() {
    return (
        <div className="category_display">
           <Home/>
            <CategoryManagment></CategoryManagment>
        </div>
    )
}

export default CategoryManagmentPage

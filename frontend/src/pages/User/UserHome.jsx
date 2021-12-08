import React from 'react'
import Footer from '../../components/user/Footer'
import LandingPage from '../../components/user/LandingPage'
import Navbar from '../../components/user/Navbar'

function UserHome() {
    return (
        <div>
          <Navbar></Navbar>  
          <LandingPage></LandingPage>
          <Footer/>
        </div>
    )
}

export default UserHome

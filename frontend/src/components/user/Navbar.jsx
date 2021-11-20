import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthUserContext from '../../context/UserContext'
import { instance } from '../../axios/axios'
import './Navbar.css'
import PersonIcon from '@material-ui/icons/Person'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
function Navbar(props) {
    const {userlogged,getUserLoggedIn}=useContext(AuthUserContext)
    const logoutUser=async()=>{
        await instance.get('/logout')
       await getUserLoggedIn()

  }
    return (
        <div className="user_navbar">
           <div className="nav_top">
               <div className="right">
               {userlogged===true ? (<button onClick={logoutUser}>Logout</button>):<Link style={{ textDecoration: 'none' }} to='/login'>Login</Link>}
               </div>
               <div className="left">
               <PersonIcon className="nav_icon"/>
               <LocalMallIcon className="nav_icon"/>
               <FavoriteIcon></FavoriteIcon>
               
               </div>
               
          
               
              </div>
           <div className="nav_bottom">
               <button><Link style={{ textDecoration: 'none' ,color:"white"}} to='/men'>Men</Link></button>
               <input type="search" placeholder="Search your products here"/>
                <button><Link style={{ textDecoration: 'none' ,color:"white"}} to='/women'>women</Link></button>
           </div>
        </div>
    )
}

export default Navbar

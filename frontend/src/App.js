
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.min.css'
import {useEffect,useState,useContext} from 'react'
import instance from './axios/axios';
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import { AuthContextProvider } from './context/Context';
import AuthContext from './context/Context';
import AdminHome from './pages/Admin/AdminHome';
import UserLoginPage from './pages/User/UserLoginPage';
import UserHome from './pages/User/UserHome';
import UserRegisterPage from './pages/User/UserRegisterPage';
import AuthUserContext from './context/UserContext';
import UserManagmentPage from './pages/Admin/UserManagmentPage';
import CategoryManagmentPage from './pages/Admin/CategoryManagmentPage';
import ProductManagmentPage from './pages/Admin/ProductManagmentPage';
import ProductShowPages from './pages/User/ProductShowPages';
import AdminProductEditPage from './pages/Admin/AdminProductEditPage';
import WomenCategoryPage from './pages/User/WomenCategoryPage';
import MenCategoryPage from './pages/User/MenCategoryPage';
import Home from './components/admin/Home';
import ViewProductPage from './pages/User/ViewProductPage';
import ViewShowProductPage from './pages/Admin/ViewShowProductPage';
import UserCategoryPage from './pages/User/UserCategoryPage';
import UserSubcategoryPage from './pages/User/UserSubcategoryPage';
import ProductList from "./components/user/ProductList";
import UsercartPage from './pages/User/UsercartPage';
import SearchPage from './components/user/SearchPage';
import CheckoutPage from './pages/User/CheckoutPage';
import UserProfilePage from './pages/User/UserProfilePage';
import NotFound from './pages/User/NotFound';
import AdminOrderPage from './pages/Admin/AdminOrderPage';
import OfferPage from './pages/Admin/OfferPage';
import Success from "./components/user/Success"
import CoupenPage from './pages/Admin/CoupenPage';
import SalesReportPage from './pages/Admin/SalesReportPage';
function App() {
  const [state, setstate] = useState('')
  const {logged} =useContext(AuthContext)
  const {userlogged}=useContext(AuthUserContext)
  return (
   <>
   
   
    <Router>
     <Routes>
      <Route exact path='/admin' element={logged===true ?<AdminHome/>:<AdminLoginPage/>}></Route>
      <Route  path='/login' element= {userlogged===true ? <Navigate to="/" /> : <UserLoginPage></UserLoginPage>}></Route>
      <Route  path='/checkout/:id/:amount' element= {userlogged===false ? <Navigate to="/login"/>  :<CheckoutPage/>}></Route>
      <Route  path='/account' element= {userlogged===false ? <Navigate to="/login"/>  :<UserProfilePage/>}></Route>
      <Route  path='/success' element={userlogged===true ?<AdminHome/>:<Success/>}></Route>
      <Route  path='admin/sales' element={logged===false ?<AdminHome/>:<SalesReportPage/>}></Route>
      {/* <Route  path='/men' element= {<MenCategoryPage></MenCategoryPage>}></Route>
      <Route  path='/women' element= { <WomenCategoryPage></WomenCategoryPage>}></Route> */}
      <Route  path='/viewproduct/:id' element= {<ViewProductPage/> }></Route>
     {/* {userlogged===true &&<Route  path='/login' element={<UserLoginPage></UserLoginPage>}></Route>} */}
           <Route exact path='/' element={<UserHome></UserHome>}></Route>
      <Route path='/:id'element={<UserCategoryPage/>}></Route>
      <Route path='/:id/:sub'element={<UserSubcategoryPage/>}></Route>
      <Route  path='/register' element={<UserRegisterPage></UserRegisterPage>}></Route>
      <Route  path='admin/users' element={logged===false ? <Navigate to="/admin" />:<UserManagmentPage/>}></Route>
      <Route  path='admin/offer' element={logged===false ? <Navigate to="/admin" />:<OfferPage/>}></Route>
      <Route  path='admin/category' element={logged===false ? <Navigate to="/admin" />:<CategoryManagmentPage/>}></Route>
      <Route  path='admin/addproduct' element={logged===false ? <Navigate to="/admin" />:<ProductManagmentPage/>}></Route>
      <Route  path='admin/product' element={logged===false ? <Navigate to="/admin" />:<ViewShowProductPage/>}></Route>
      <Route exact path='admin/editproduct/:id' element={logged===false ? <Navigate to="/admin" />:<AdminProductEditPage/>}></Route>
      <Route  path='admin/order' element={logged===false ? <Navigate to="/admin" />:<AdminOrderPage/>}></Route>
      <Route path='/addtobag' element={userlogged===false ? <Navigate to="/login"/>  :<UsercartPage/>}/>
      <Route  path='admin/addoffer' element={logged===false ? <Navigate to="/admin" />:<CategoryManagmentPage/>}></Route>
      <Route  path='admin/coupen' element={logged===false ? <Navigate to="/admin" />:<CoupenPage/>}></Route>
      <Route path="/showsearch/:id" element={<SearchPage/>}></Route>

      {/* <Route  path="/*" element={<NotFound/>}></Route>       */}
 </Routes>
    </Router>
    </>
  );
}

export default App;

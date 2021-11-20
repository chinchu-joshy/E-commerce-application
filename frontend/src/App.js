
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <Route  path='/men' element= {userlogged===false ? <Navigate to="/" /> :<MenCategoryPage></MenCategoryPage>}></Route>
      <Route  path='/women' element= {userlogged===false ? <Navigate to="/" /> : <WomenCategoryPage></WomenCategoryPage>}></Route>
      <Route  path='/viewproduct/:id' element= {userlogged===false ? <Navigate to="/" /> :<ViewProductPage/> }></Route>
     {/* {userlogged===true &&<Route  path='/login' element={<UserLoginPage></UserLoginPage>}></Route>} */}
      <Route exact path='/' element={<UserHome></UserHome>}></Route>
      <Route  path='/register' element={<UserRegisterPage></UserRegisterPage>}></Route>
      <Route  path='admin/users' element={logged===false ? <Navigate to="/admin" />:<UserManagmentPage/>}></Route>
      <Route  path='admin/category' element={logged===false ? <Navigate to="/admin" />:<CategoryManagmentPage/>}></Route>
      <Route  path='admin/addproduct' element={logged===false ? <Navigate to="/admin" />:<ProductManagmentPage/>}></Route>
      <Route  path='admin/product' element={logged===false ? <Navigate to="/admin" />:<ViewShowProductPage/>}></Route>
      <Route exact path='admin/editproduct/:id' element={logged===false ? <Navigate to="/admin" />:<AdminProductEditPage/>}></Route>
 </Routes>
    </Router>
    </>
  );
}

export default App;

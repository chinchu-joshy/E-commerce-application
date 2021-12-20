import React,{useContext,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import AuthUserContext from '../../context/UserContext'
import { instance } from '../../axios/axios'
import './Navbar.css'
import PersonIcon from '@material-ui/icons/Person'
import LocalMallIcon from '@material-ui/icons/LocalMall';

import { ListGroup ,Accordion,Dropdown,ButtonGroup,Button,Image,Tooltip,OverlayTrigger} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

// ***************************************Material UI********************************************************
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreIcon from '@material-ui/icons/MoreVert';
import Popover from '@mui/material/Popover';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
function Navbar(props) {
    const {userlogged,getUserLoggedIn,username}=useContext(AuthUserContext)
    const [category, setcategory] = useState([])
    const [search, setsearch] = useState('')
    const navigate=useNavigate()
    const [product, setproduct] = useState([])
    const logoutUser=async()=>{
        await instance.get('/logout')
       await getUserLoggedIn()

  }
  const getAllCategory = async () => {
    const datas = await instance.get("/getallcategory");
    if(datas){
        setcategory(datas.data); 
    }
    
  };
  const searchProduct=async()=>{
      navigate(`/showsearch/${search}`)
    
  }
  const setSearchValue=(e)=>{
setsearch(e.target.value)
  }
  useEffect(() => {
      getAllCategory()
      
  }, [])



//   =====================================================Material UI style==============================

  
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
       
        <MenuItem onClick={handleMenuClose}>{userlogged===true ? (<a onClick={logoutUser}>Logout</a>):<Link style={{ textDecoration: 'none',color:"light" }} to='/login'>Login</Link>}</MenuItem>
        <MenuItem onClick={handleMenuClose}><Link style={{ textDecoration: 'none',color:"light" }} to='/register'>Signup</Link></MenuItem>
        <MenuItem onClick={handleMenuClose}><Link to="/account">{userlogged===true ? username.username:"Account"}</Link></MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            {/* <Badge badgeContent={4} color="error"> */}
            <Link style={{textDecoration:"none",color:"white"}} to='/addtobag'> <ShoppingCartIcon/></Link>
            {/* </Badge> */}
          </IconButton>
          <p>Cart </p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            {/* <Badge badgeContent={17} color="error"> */}
             <FavoriteIcon/>
            {/* </Badge> */}
          </IconButton>
          <p>Wishlist</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
    // ***********************************************************popover**********************************************
    
    return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
           <Link style={{textDecoration:"none",color:"white"}} to="/"> SHOPPY</Link>
          </Typography>
          <Search onChange={setSearchValue}>
            <SearchIconWrapper>
              <SearchIcon onClick={searchProduct} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           

         
         
           
         {
  category.map((data)=>{
     return(


      <>
      
      <div className="category_container">
      <Link style={{ textDecoration: 'none' }} to={`/${data.category}`}> {data.category}</Link>
      <div className="subcategory_container">

{data.subcategory.map((sub)=>{
          return(
          <>
          <p><Link style={{ textDecoration: 'none' }} to={`/${data.category}/${sub}`}>{sub}</Link></p>
          </>
          )
      })}
</div>   
</div>

     </>
      

     )
})
} 






















            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
              <Link style={{textDecoration:"none",color:"white"}} to='/addtobag'> <ShoppingCartIcon/></Link>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <FavoriteIcon/>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
//         <div className="user_navbar">
//            <div className="nav_top">
//                <div className="right">
//              <Link to="/"> <img className="img_main_brand" src="data:image/jpeg;base64,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"/></Link>
//                </div>
//                <div className="search_container_box">
//                <input type="search" placeholder="Search your products here" onChange={setSearchValue}/>
//                <Button className="search_btn" onClick={searchProduct}>Search</Button>
//                </div>
               
//                <div className="left">
//                {userlogged===true && <p>{username.username}</p>}
//                    <div className="nav_icon_head">
                    
//                <PersonIcon className="nav_icon"/>
//                <ul className="user_detail">
//                    <li> {userlogged===true ? (<a onClick={logoutUser}>Logout</a>):<Link style={{ textDecoration: 'none',color:"light" }} to='/login'>Login</Link>}</li>
//                    <li><Link style={{ textDecoration: 'none',color:"light" }} to='/register'>Signup</Link></li>
//                    <li><Link to="/account">Account</Link></li>
//                </ul>
//                </div>
//               <Link to='/addtobag'> <LocalMallIcon className="nav_icon_bag"/></Link>
//                <FavoriteIcon></FavoriteIcon>
               
//                </div>
               
          
               
//               </div>
//            <div className="nav_bottom">
//                <div className="category">

             



//                {
//                    category.map((data)=>{
//                        return(


//                        <>
//                        <div className="category_container">
//                        <Link style={{ textDecoration: 'none' }} to={`/${data.category}`}> {data.category}</Link>
//                        <div className="subcategory_container">

// {data.subcategory.map((sub)=>{
//                            return(
//                            <>
//                            <p><Link style={{ textDecoration: 'none' }} to={`/${data.category}/${sub}`}>{sub}</Link></p>
//                            </>
//                            )
//                        })}
// </div>   
//               </div>
              
//                        </>
                        
                
//                        )
//                    })
//                }

               

//                </div>
               
               
//            </div>
//         </div>
    )
}

export default Navbar

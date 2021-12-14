import React,{useState,useEffect} from 'react'

import { instance } from '../../axios/axios'
import {Card,Button,Spinner} from 'react-bootstrap'
import {useParams,Link} from 'react-router-dom'
import Navbar from '../../components/user/Navbar'
import Footer from '../../components/user/Footer'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
function UserSubcategoryPage() {
    const [category, setcategory] = useState([])
    const [spin, setspin] = useState(false)
    const {id,sub}=useParams()
   
    const getSubCategory=async()=>{
        setspin(true)
        await instance.get(`/getSelectedCategory/${id}/${sub}`).then((response)=>{
           console.log("ifkjhdjk")
            if(response){
               
                // console.log(response.data)
                setcategory(response.data)
                setspin(false)
                
            }
      
        })

    }
  
useEffect(() => {
    getSubCategory()
   
}, [id,sub])
    return (
        <>
       <Navbar/>
        {spin===true ?  <Spinner className="spinner" animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>:<>

        <div className="get_women_head">
           
            <div className="body_subcategory">

                <ImageList sx={{ width: 450, height: 350 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      {category.map((item) => (
            <Link className="link_subcategory" style={{textDecoration:"none"}} to={`/viewproduct/${item._id}`}>
        <ImageListItem key={item.img}>
          <img
            src={`${item.url[0].image1}?w=248&fit=crop&auto=format`}
            srcSet={`${item.url[0].image1}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.productname}
            subtitle={item.price}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.productname}`}
              >
                {/* <InfoIcon /> */}
              </IconButton>
              
            }
          />
        </ImageListItem>
        </Link>
      ))}
    </ImageList>
            
            </div>
           
            
        </div>
        <Footer/>
        </>
}
        </>
    )
}

export default UserSubcategoryPage

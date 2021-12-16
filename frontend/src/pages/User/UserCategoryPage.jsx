import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'
import { instance } from '../../axios/axios'
import {Card,Button,Spinner} from 'react-bootstrap'
import Navbar from '../../components/user/Navbar'
import './Page.css'
import Footer from '../../components/user/Footer'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
function UserCategoryPage() {
    const [category, setcategory] = useState([])
    const [spin, setspin] = useState(false)
    const {id}=useParams()
   
    const getCategory=()=>{
        setspin(true)
        instance.get(`/getSelectedCategory/${id}`).then((response)=>{
            console.log(response.data)
            if(response){
                setspin(false)
                setcategory(response.data)
                
            }
      
        })

    }
  
useEffect(() => {
getCategory()
   
}, [id])
    return (
        <>
        <Navbar/>
        {spin===true ?  <Spinner className="spinner" animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>:<>

        <div className=" ">
           
            <div className="body_category">
{/* 
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
                
              </IconButton>
              
            }
          />
        </ImageListItem>
        </Link>
      ))}
    </ImageList> */}
{/* {category.map((item) => (
    <ImageList sx={{ width: 450, height: 350 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      
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
              </IconButton>
              
            }
          />
        </ImageListItem>
        </Link>
    
    </ImageList>
    ))}
                 */}

                {category.map((data)=>{ 
                    return(
                        

                       
                        <Link className="link_category" style={{textDecoration:"none"}} to={`/viewproduct/${data._id}`}>
                           
                      <Card className="card-main-category" >
                          
                      <Card.Img className="image" variant="top" src={data.url[0].image1}/>
                      <Card.Body className="card-body-category">
                        <Card.Text className="cart_name_size">{data.productname}</Card.Text>
                       
                 { data.offer && <div className="offer__box__user">
                        <Card.Text className="price_category"><p>Rs.{data.price}</p><p>Rs.{Math. trunc(data.price-data.offer)}</p></Card.Text>
                        <Card.Text className="price_category_offer">Rs.{Math. trunc(data.price-data.offer)}</Card.Text>

                        </div>}
                        { !data.offer && <div className="offer__box__user">
                        <Card.Text className="price_category__without__offer">Rs.{data.price}</Card.Text>
                        

                        </div>}
                        
                        
                       
                      </Card.Body>
                    </Card>
                    </Link>
                   
                    )
                
                })}
            
            </div>
           
            
        </div>
        <Footer/>
        </>
}
        </>
    )
}

export default UserCategoryPage

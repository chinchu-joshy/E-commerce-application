import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'
import { instance } from '../../axios/axios'
import {Card,Button,Spinner} from 'react-bootstrap'
import Navbar from '../../components/user/Navbar'
import './Page.css'
import Footer from '../../components/user/Footer'
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

        <div className="get_women_head ">
           
            <div className="body_category">

                {category.map((data)=>{
                    return(
                        

                       
                        <Link className="link_category" style={{textDecoration:"none"}} to={`/viewproduct/${data._id}`}>
                           
                      <Card className="card" >
                          
                      <Card.Img className="image" variant="top" src={data.url[0].image1}/>
                      <Card.Body>
                        <Card.Text className="cart_name_size">{data.productname}</Card.Text>
                        {/* <Card.Text className="category_description">
                          {data.description}
                        </Card.Text> */}
                 { data.offer && <div className="offer__box__user">
                        <Card.Text className="price_category">Rs.{data.price}</Card.Text>
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

import React,{useState,useEffect} from 'react'

import { instance } from '../../axios/axios'
import {Card,Button,Spinner} from 'react-bootstrap'
import {useParams,Link} from 'react-router-dom'
import Navbar from '../../components/user/Navbar'
import Footer from '../../components/user/Footer'


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

                {category.map((data)=>{
                    return(
                        <Link className="link_subcategory" style={{textDecoration:"none"}} to={`/viewproduct/${data._id}`}>
                      <Card className="card" >
                          
                      <Card.Img className="subimage" variant="top" src={data.url[0].image1}/>
                      <Card.Body>
                        <Card.Text>{data.productname}</Card.Text>
                        {/* <Card.Text className="subcategory_description">
                          {data.description}
                        </Card.Text> */}
                        <Card.Text className="price_subcategory">Rs.{data.price}</Card.Text>
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

export default UserSubcategoryPage

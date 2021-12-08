import React,{useState,useEffect} from 'react'
import './Search.css'
import {Link,useParams} from 'react-router-dom'
import {Card,Spinner} from 'react-bootstrap'
import Navbar from '../../components/user/Navbar'
import { instance } from '../../axios/axios'
import {useNavigate} from 'react-router-dom'
function SearchPage() {
    const [search, setsearch] = useState([])
    const [spin, setspin] = useState(false)
    const {id}=useParams()
    const navigate=useNavigate()
    const findSearch=async()=>{
        setspin(true)
        try{
                 const products=await instance.get(`/getsearchproduct/${id}`)
                 if(products){
                     console.log(products.data)
                     setsearch(products.data)
                     setspin(false)
                     
                 }
              }catch(err){
        
              }
    }

    useEffect(() => {
       findSearch() 
       
    }, [id])
    return (
        <div>
            <Navbar/>
            <div className="search_container_banner">
  {search.map((data)=>{
                    return(
                        <>
{spin===true ? <Spinner className="spinner" animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>:
                       
                        <Link className="link_search" style={{textDecoration:"none"}} to={`/viewproduct/${data._id}`}>
                           
                      <Card className="search_card" >
                          
                      <Card.Img className="search_image" variant="top" src={data.url[0].image1}/>
                      <Card.Body>
                        <Card.Title>{data.productname}</Card.Title>
                       
                        {/* <Card.Text className="search_description">
                          {data.description}
                        </Card.Text> */}
                        
                        <Card.Text className="price_search">Rs.{data.price}</Card.Text>
                      </Card.Body>
                    </Card>
                    </Link>
  }
                    </>
                   
                    )
                
                })}
  </div> 
        </div>
    )
}

export default SearchPage

import React,{useEffect,useState} from 'react'
import { instance } from '../../axios/axios'
import {Button,Form} from 'react-bootstrap'
import './ViewProduct.css'
function ViewProduct(props) {
    const id=props.id
    console.log(id)
    const [product, setproduct] = useState([])
    const getProduct=async()=>{
        
        console.log(id+"hjdkf")
      const datas=await instance.get(`/getviewproduct/${id}`)
     
      setproduct(datas.data)
      console.log(datas.data)
    }
    useEffect(() => {
       getProduct()
    }, [])
    return (
        
        <div className="view_product_page">
            <div className="image">
                
                <div className="small_image">
                    {product.map((product)=>{
                        return(
                            <>
                            <img src={product.url[0].image2} alt="" />
                            <img src={product.url[0].image3} alt="" />
                            <img src={product.url[0].image4} alt="" />
                            <p>Only {product.totalnumber } left</p>
                            </>
                        )
                    })}
                    
                   

                </div>
                <div className="large_image">
                {product.map((product)=>{
                        return(
                            <>
                            <img src={product.url[0].image1} alt="" />
                            <Button>Add to bag</Button>
                            <p>{product.delivery==="Free" ? "Free delivery":"Free delivery not available"}</p>
                          
                            </>
                        )
                    })}
                   

                </div>
                
            </div>
            {product.map((content)=>{
                return(
                    <>
<div className="content">
              <div className="descrriptions">
                  <p>{content.description}</p>
                  <h5 >Price : {content.price}</h5>
                  <Form>
                  <Form.Select aria-label="Default select example" className="mb-3" 
               
              >
  <option selected>select size :</option>

<option>Small</option>
<option>Medium</option>
<option>Large</option>

  
</Form.Select>
                  </Form>
                  <Button className="buy_now_button">Buy now</Button>
                  </div>  
            </div>
                    </>
                )
            })
                
            
}
            
        </div>
    )
}

export default ViewProduct

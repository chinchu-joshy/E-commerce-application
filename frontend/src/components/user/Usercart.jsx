import "./Usercart.css";
import React,{useEffect,useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import swal from 'sweetalert'
import {
  Card,
  Figure,
  Row,
  Col,
  Container,
  CloseButton,
  Button,
  Form,
  ListGroup,
  ButtonGroup,
} from "react-bootstrap";
import { instance } from "../../axios/axios";
function Usercart() {
  const navigate=useNavigate()
  const [products, setproducts] = useState([])
  const [amount, setamount] = useState()
  const [delivery, setdelivery] = useState(0)
   const [err, seterr] = useState("")
  const deleteCartProduct=async(id)=>{
    try{
      instance.get(`/deletecartitem/${id}`).then((response)=>{
        if(response){
          swal("Item removed")
          getProducts()
        }
      })

    }catch(err){

    }
  }
  const getProducts=async()=>{
    try{
      const cart=await instance.get('/getcartproduct')
      console.log(cart.data)
      if(cart.data.product){
        setproducts(cart.data.product)
        setamount(cart.data.amount)
        
      }

    }catch(err){

    }
  }
  const increaseQuantity=(id)=>{
    console.log(id)
    instance.get(`/updatequantity/${id}`).then((response)=>{

      if(response.data){
        getProducts()
       
      }
    })

  }
  const decreaseQuantity=(id)=>{
    instance.get(`/updatequantitydecrease/${id}`).then((response)=>{

      if(response.status){
        getProducts()
        
        
      }
    })
    
  }
  const CheckOut=()=>{
    try{
      const id=products[0]._id
      
      if(!amount || !products[0]) return seterr(("Your cart is empty"))
      navigate(`/checkout/${id}/${amount}`)
       
    }catch(err){

    }
  }
  useEffect(async() => {
   await getProducts()
   
  }, [])
  return (
    <>
      <Container>
        <div className="caart_main_container">
         
          <Row className="d-flex p-2">
            <Col sm={12} md={6}>
              <Col sm={12} md={12}>
                <Card className="d-flex p-2 card__main__cart">
                  <Card.Body className="d-flex p-2 justify-content-center flex-column">
                    <h1>Your bag</h1>
                    <p> Your item will be preserved here for 1 month</p>
                    {!products[0] && <h2>No items found</h2>}
                  </Card.Body>
                </Card>
              </Col>
              
              {products.map((details)=>{
                return(
                  <Col sm={12} md={12}>
                <Card className="d-flex m-2 p-2 card__main__cart">
                  <Card.Body className="d-flex  p-2 justify-content-center flex-column">
                    <CloseButton className="close__cart" onClick={()=>{
                      deleteCartProduct(details.products.secreatId)
                    }}/>
                    <Figure>
                      <Figure.Image
                        width={50}
                        height={50}
                        alt="image"
                        src={details.productdetails[0].url[0].image1}
                      />
                      <Figure.Caption>
                        {details.productdetails[0].productname}
                      </Figure.Caption>
                    </Figure>

                    <p>Size : {details.products.size} </p>
                    <p>Price :{details.productdetails[0].price*details.products.quantity}</p>
                    <div className="btn__wish__count__container">
                      <Button className="add__to__bag__btn">
                        Add to wishlist
                      </Button>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={()=>{
                          increaseQuantity(details.products.secreatId)
                        }}>+</Button>
                        <Button variant="secondary">{details.products.quantity}</Button>
                        <Button variant="secondary" onClick={()=>{
                          decreaseQuantity(details.products.secreatId)
                        }}>-</Button>
                      </ButtonGroup>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
                  
                )
              })}
              
             
            </Col>

            <Col sm={12} md={6}>
              <Col sm={12} md={12}>
                <Card className="d-flex m-2 p-2 card__main__cart align-items-center">
                  <Card.Body className="d-flex   p-2 justify-content-center flex-column">
                    <h1>Price details</h1>
                    <h3>Sub total : Rs.{amount && amount} </h3>
                    
                    <br />
                    
                    <Button className="checkout__btn mt-3" onClick={()=>{
                     
                      CheckOut()
                    }}>Buy Now</Button>
                    {err && <p>{err}</p>}
                  </Card.Body>
                </Card>
              </Col>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Usercart;

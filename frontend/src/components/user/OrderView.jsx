
import React,{useState,useEffect,useContext} from 'react'
import { Card ,Row,Col,Image,Button,Spinner,Modal,Container,ProgressBar} from 'react-bootstrap'
import './UserProfile.css'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { instance } from '../../axios/axios';
import SpinContext from "../../context/spinnerContext";
import swal from 'sweetalert'
import {Link} from 'react-router-dom'
function OrderView() {
    const {spin,setspin} = useContext(SpinContext)
    const [order, setorder] = useState([])
    const [show, setShow] = useState(false)
    const [view, setview] = useState({})
    const handleClose=()=> setShow(false)
    const viewOrder=async(data)=>{
          setview(data)
          setShow(true)

    }
    const getData=async()=>{
        setspin(true)
        try{
            const orders=await instance.get('/getorders')
            if(orders.data){
                console.log(orders.data)
                setorder(orders.data)
                setspin(false)
            }

        }catch(err){

        }
    }
    const cancelOrder=(data)=>{
        console.log(data)
        
        
        try{
            swal({
                title: "Are you sure to cancel the order ?",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                    instance.post("/cancelorderuser",data).then((response)=>{
                        if(response){
                            getData()
                        }
                    })
                  swal(
                    "Order cancelled"
                    
                  )
                } else {
                  swal("Your content is safe!");
                }
              });
            

        }catch{

        }
    }
    useEffect(() => {
       getData()
    }, [])
    return (
        <>
        {spin===true ? <Spinner className="spinner" animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>:
        <div className="order__container">
            {order.map((data)=>{
                return(
                    <Card>
                    <Card.Body>
                        {data.products.orderStatus==="Delivered" ? <Row className="row__ordedr__page__user">
                       <Col md={4}>
                             <Image className="orderd__product__img" src={data.productdetails.url[0].image1}></Image> 

                       </Col>
                       <Col md={8} className="order__summery">
                           <p style={{fontWeight:"bold"}}>Deliverd on {data.date}</p>
                           
                          
                           <p>{data.productdetails.productname}</p>
                           <p>Quantity : {data.products.quantity}</p>
      
                           <div className="btn__order__look">
                          <div>
                              <StarBorderIcon/>
                              <StarBorderIcon/>
                              <StarBorderIcon/>
                              <StarBorderIcon/>
                              <StarBorderIcon/>
                              <p style={{color:"green"}}>Rate the product</p>
                          </div>
                           <p style={{color:"blue"}}>Write a review</p>
                           
                           </div>
                           
                       </Col>
                      </Row>:<Row className="row__ordedr__page__user"> 
                       <Col md={4}>
                             <Image className="orderd__product__img" src={data.productdetails.url[0].image1}></Image> 
                       </Col>
                       <Col md={8} className="order__summery">
                          {data.products.orderStatus==="Cancelled" ? <p style={{color:"red"}}>Your order cancelled</p>:<p style={{fontWeight:"bold"}}>Your product will be deliver on {data.date}</p>} 
                           <p>{data.productdetails.productname}</p>
                           
                           <p>Quantity : {data.products.quantity}</p>
      
                           <div className="btn__order__look">
                         {data.products.orderStatus==="Cancelled" ? null : <Button className="btn" onClick={()=>{
                                const datas={
                                    id:data._id,
                                productId:data.productId,
                                quantity:data.products.quantity,
                                productname:data.productdetails.productname,
                                size:data.products.size,
                                status:data.products.orderStatus,
                                src:data.productdetails.url[0].image1,
                                description:data.productdetails.description

                                }
                                viewOrder(datas)

                           }}>View order</Button>} 
                          
                          
                         {data.products.orderStatus==="Cancelled" ? <Button>Order again</Button> : <Button className="btn" onClick={()=>{
                               const datas={
                                
                                id:data._id,
                                productId:data.productId,
                                size:data.products.size
                          
                              }
                               cancelOrder(datas)
                           }}>cancel order</Button>}
                          {/* <Button className="btn" onClick={()=>{
                               const datas={
                                
                                id:data._id,
                                productId:data.productId,
                                size:data.products.size
                          
                              }
                               cancelOrder(datas)
                           }}>cancel order</Button> */}
                           </div>
                           
                       </Col>
                      </Row>}
                      
                      
                        </Card.Body></Card>  

                )
            })}
         
                  {!order[0] && <p>No orders found</p>}

                  <div>
                  <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            
              
                <>
                  <Container>
                    <Row>
                      <Col md={6}>
                        <img
                          className="small_image_view"
                          src={view.src}
                          alt="image"
                        />
                        <p>{view.productname}</p>
                        <p>{view.description}</p>
                      </Col>
                      <Col md={6} className="status__bar">
                         
                          
                          <div className={view.status==="Placed" || view.status==="Packed" || view.status==="Shipped" ? "placed" :"not_placed"}>  </div> 
                          <p>Order placed</p>
                          

                          
                         
                          <div className={ view.status==="Packed" || view.status==="Shipped"  ? "packed" :"not_packed"}>  </div>
                         
                          <p>Item packed</p>
                     
                     <div className={ view.status==="Shipped"  ? "shiped" :"not_shiped"}>  </div>
                     <p>Item Shipped</p>
                     <div className="deliver"> </div>
                     <p>Delivered</p>
                    
                     
                        
                      </Col>
                    </Row>
                  </Container>
                </>
             
          </div>
        <Button onClick={handleClose}>Go back</Button>
        </Modal.Body>
      </Modal>
                  </div>
        </div>
}
        </>
    )
}

export default OrderView

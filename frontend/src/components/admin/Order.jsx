import "./Order.css";
import React, { useState, useContext, useEffect } from "react";
import { instanceAdmin } from "../../axios/axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Context";
import { Table, Pagination } from "react-bootstrap";
import Home from "./Home";
import ModeEditIcon from '@material-ui/icons/Edit';
import swal from 'sweetalert'
import {
  Button,
  Form,
  FormControl,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import SpinContext from "../../context/spinnerContext";
import SalesReport from "./SalesReport";
function Order() {
  const [search, setsearch] = useState("");
  const [orderdata, setorderdata] = useState([]);
  const [number, setnumber] = useState(null)
  const [page, setpage] = useState(null)
  const [status, setstatus] = useState({
    order:"",
    productId:"",
    cartId:"",
    size:""
  })
  const { spin, setspin } = useContext(SpinContext);
  let active = 1;
  let items = [];

  for (let number = 1; number <= page + 1; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          setnumber(number);
         
            getOrder(number);
          
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const getOrder=async(number)=>{
    setspin(true)

    instanceAdmin.get(`/allorders/${number}`).then((response) => {
      if (response.data) {
        setspin(false)
        setnumber(number)
        console.log(response.data);
        setorderdata(response.data.orders);
      }
    });


    
  }








  const addStatus=(input)=>{
   
    const data={
      status:input.order,
      id:input.cartId,
      productId:input.productId,
      size:input.size

    }
    
    try{
      if(input.order==="Cancel"){
        swal({
          title: "Are you sure to cancel the order ?",
         
          
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            addChange(data)
            swal(
              "Order cancelled"
              
            )
          } else {
            swal("Your content is safe!");
          }
        });

      }else{
        addChange(data)
        swal(
          "Change added"
          
        )

      }
      

    }catch(err){

    }

  }
  function addChange(data){
    
    instanceAdmin.post('/changestatus',data).then((response)=>{
      if(response){
        getOrders()

      }
    })
  }
  const getOrders = async () => {
    try {

      setspin(true);
     
        if (number) {
          instanceAdmin.get(`/allorders/${number}`).then((response) => {
            if (response.data) {
              setspin(false)
              setnumber(number)
              console.log(response.data);
              setorderdata(response.data.orders);
              setpage(response.data.pageCount);
            }
          });
        } else {

          instanceAdmin.get(`/allorders/${1}`).then((response) => {
            if (response.data) {
              setspin(false)
              setnumber(number)
              console.log(response.data);
              setorderdata(response.data.orders);
              setpage(response.data.pageCount);
            }
          });
        }
      



















      // instanceAdmin.get("/allorders").then((response) => {
      //   if (response.data) {
      //     console.log(response.data);
      //     setorderdata(response.data);
      //   }
      // });
    } catch (err) {}
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      {spin === true ? (
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="admin_home_page">
          <div className="user_managment">
            <div className="user_management_head">
              <div className="head">
                <h1>Order Managment</h1>
              </div>
              <div className="search">
                <Form className="product_form">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Search order......"
                    className="mb-2 "
                  >
                    <Form.Control
                      type="search"
                      className="input_product"
                      value={search}
                      onChange={(e) => {
                        setsearch(e.target.value);
                      }}
                      placeholder="Search product"
                    />
                  </FloatingLabel>
                </Form >
              </div>
              <div className="table">
                <Table striped bordered hover variant="light" responsive>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Delivery date</th>
                      <th>Amount</th>
                      <th>Payment method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderdata
                     .filter((val) => {
                      if (search === "") {
                        return val;
                      } 
                      else if (
                        val.productdetails.productname.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                      
                    }).map((data) => {
                      return (
                        <>
                          <tr className={data.products.orderStatus==="Delivered" || data.products.orderStatus==="Cancel" ? "completed" :"not_completed"} >
                            <td>{data.role[0].username}</td>
                            <td >{data.productdetails.productname}</td>
                            <td>{data.date}</td>
                            <td>Rs.{data.products.price}</td>
                            <td>{data.payment} <p style={{color:"red"}}>{data.orderStatus==="Paid" ? "paid" :null}</p></td>
                            
                            <td className="table__order">
                              {data.products.orderStatus==="Delivered" || data.products.orderStatus==="Cancelled" ? <p className="delivered">{data.products.orderStatus}</p>:<Form  className="order__form">
                              <Form.Select
        aria-label="Default select example"
        className="mb-3"
        onChange={(e)=>{
          const datas={
            order:e.target.value,
            productId:data.productId,
            cartId:data._id,
            size:data.products.size
          }
          addStatus(datas)
          // setstatus(prev=>
          //   ({...prev,
          //     order:e.target.value,
          //   productId:data.productId,
          //   cartId:data._id,
          //   size:data.products.size
          //   })
          // )
          


        }}
      >
        <option selected>{data.products.orderStatus}</option>
        <option>Packed</option>
        <option>Shipped</option>
        <option>Cancelled</option>
        <option>Delivered</option>
        
      </Form.Select>
    
                              
                              </Form> }
                               
                                </td>
                                 
                            
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
               
              </div>
              {!orderdata[0] && <p>No orders found</p>}

              <div>
                <Pagination>{items}</Pagination>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Order;

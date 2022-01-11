import React from 'react'
import "./Checkout.css";
import {
    Card,
    Container,
    Row,
    Col,
    Form,
    InputGroup,
    FormControl,
    Button,
    Modal,
    ListGroup,
  } from "react-bootstrap";
  import { Radio } from "@material-ui/core";
  import { Link, useParams, useNavigate } from "react-router-dom";
  import UserContext from "../../context/UserdetailsContext";
  import { instance } from "../../axios/axios";
  import swal from "sweetalert";
  import useRazorpay, { RazorpayOptions } from "react-razorpay";
  import axios from "axios";
  import { PayPalButton } from "react-paypal-button-v2";

function Testing() {
    const placeHolder=()=>{

    }
    const alladress=["jhk","iuui"]
    const placeOrder=()=>{

    }
    return (
        <Container>
            <Row className='check-row'>
                <Col md={12} className="check-col">
                    <h2>PRICE DETAILS</h2>
                </Col>
                <Col md={6} sm={12} className="check-col-bottom-left">
                    <div className="offer-details-checkout">
                        <h6>Apply coupen</h6>
                        <h6>Use wallet</h6>
                        <Form.Select
                    className="selection__checkout"
                    size="sm"
                    onChange={(e) => {
                      if (e.target.value === "Standard") {
                        // setdelivery(20);
                        // seterr("");
                      } else 
                      {
                        // setdelivery(50);
                        // seterr("");
                      }
                    }}
                  >
                    <option> Select delivery method</option>
                    <option> Standard </option>
                    <option> Express </option>
                  </Form.Select>
                    </div>
                </Col>
                <Col md={6} sm={12} className="check-col-bottom-right">
                    <div className="offer-details-checkout">
                    <ListGroup className="list__checkout">
                    <ListGroup.Item className="list__checkout__product">
                      Product Price : Rs.
                      {/* {amount && amount} */}
                    </ListGroup.Item>
                    <ListGroup.Item className="list__checkout__discount">
                      Discount Price : Rs.
                      {/* {offerprice ? parseInt(amount-offerprice):0} */}
                    </ListGroup.Item>
                    <ListGroup.Item className="list__checkout__coupen">
                      Coupen discount : Rs.
                      {/* {coupenAmount && Math.trunc(coupenAmount)} */}
                    </ListGroup.Item>
                    <ListGroup.Item className="list__checkout__wallet">
                  Wallet : Rs.
                  {/* {wallet && wallet} */}
                    </ListGroup.Item>
                    <ListGroup.Item className="list__checkout__delivery">
                      Delivery charge : Rs.
                      {/* {delivery && delivery} */}
                    </ListGroup.Item>
                    <ListGroup.Item className="list__checkout__amount">
                      Total amount : Rs.
                      {/* {amount && parseInt(amount-offerprice)+parseInt(delivery)-parseInt(coupenAmount)-parseInt(wallet) } */}
                    </ListGroup.Item>
                    {/* {user.offer &&  <ListGroup.Item className="list__checkout__amount">
                    First puchase offer : Rs.
                    {amount &&( parseInt(amount-offerprice)+parseInt(delivery)-parseInt(coupenAmount)-parseInt(wallet)) -( parseInt(amount-offerprice)+parseInt(delivery)-parseInt(coupenAmount)-parseInt(wallet))*.1 }
                    </ListGroup.Item>} */}
                  </ListGroup>

                  {/* {err && <p>{err}</p>} */}
                    </div>
                </Col>
                <Col md={6} sm={12}> <div className="">
                  <h3>Delivery adress</h3>
                  <ul>
                    <li>State : 
                        {/* {adress && adress.state} */}
                        </li>

                    <li> District :
                         {/* {adress && adress.district} */}
                         </li>
                    <li>City : 
                        {/* {adress && adress.city} */}
                        </li>
                    <li>
                        {/* Pincode : {adress && adress.pincode} */}
                        </li>

                    <Button
                      className="add__new__adress"
                      onClick={() => {
                        // setshowadd(true);
                      }}
                    >
                      Add new adress
                    </Button>
                  </ul>
                </div></Col>
                <Col md={6} sm={12}>
                <h4>Confirm order details</h4>
                <Link to="/">View products</Link>
                <Form onSubmit={placeOrder}>
                  <Form.Group>
                    {alladress && 
                    (
                      <Form.Select
                        className="selection__adress"
                        size="sm"
                        onChange={(e) => {
                        //   addAdress(e.target.value);
                        }
                    }
                      >
                        {alladress.map((adress, index) => {
                          return (
                              <option>u</option>
                            // <option value={adress.secreatId}>
                            //   Adress:{index + 1}
                            // </option>
                          );
                        })}
                      </Form.Select>
                    )}
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="2">
                      COD
                    </Form.Label>
                    <Col sm="10">
                      <InputGroup className="mb-3">
                        <Radio
                          name="groupOptions"
                          type="radio"
                          name="site_name"
                          value={"COD"}
                        //   checked={payment === "COD"}
                          onChange={(e) => {
                            // setpayment(e.currentTarget.value);
                          }}
                        >
                          Option 1
                        </Radio>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="2">
                      Paypal
                    </Form.Label>
                    <Col sm="10">
                      <InputGroup className="mb-3">
                        <Radio
                          name="groupOptions"
                          type="radio"
                          name="site_name"
                          value={"Paypal"}
                        //   checked={payment === "Paypal"}
                          onChange={(e) => {
                            // setpayment(e.currentTarget.value);
                          }}
                        >
                          Option 1
                        </Radio>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="2">
                      Razorpay
                    </Form.Label>
                    <Col sm="10">
                      <InputGroup className="mb-3">
                        <Radio
                          name="groupOptions"
                          type="radio"
                          name="site_name"
                          value={"Razorpay"}
                        //   checked={payment === "Razorpay"}
                          onChange={(e) => {
                            // setpayment(e.currentTarget.value);
                          }}
                        >
                          Option 1
                        </Radio>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                 {/* {payment!="Paypal" ? <Button className="proceed__btn" type="submit">
                    Procced
                  </Button>: <div style={{width:"20vw"}}>
            
            {payment==="Paypal" && <PayPalButton 
              
              amount={amount}
              
              onSuccess={(details, data) => {
                console.log(details);

                
                const datas = {
                  cartId: id,
                  price: amount,
                  adress: adress,
                  payment: payment,
                  products: product,
                  status: "Paid",
                };
                return instance.post("/placeorder", datas).then((result) => {
                  if (result) {
                    swal({
                      title: "Order placed successfully!",
                     
                      icon: "success",
                      button: "Aww yiss!",
                    });
                  }
                  navigate('/success')
                });

                //
              }}
            />}
          </div>}  */}
                  {/* {err && <p className="invalid__err__message">{err}</p>} */}
                </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Testing

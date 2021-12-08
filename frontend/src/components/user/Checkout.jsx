import "./Checkout.css";
import React, { useState, useContext, useEffect } from "react";
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

function Checkout() {
 
  const Razorpay = useRazorpay();
  const [sdkready, setsdkready] = useState(false);
  const [adress, setadress] = useState({});
  const { details, getUser } = useContext(UserContext);
  const [alladress, setalladress] = useState([]);
  const [err, seterr] = useState("");
  const [addpincode, setaddpincode] = useState(null);
  const [addcity, setaddcity] = useState("");
  const [adddistrict, setadddistrict] = useState("");
  const [addstate, setaddstate] = useState("");
  const [pincodeerr, setpincodeerr] = useState("");
  const [showadd, setshowadd] = useState(false);
  const navigate = useNavigate();
  const [payment, setpayment] = useState("");
  const [product, setproduct] = useState("");
  const { id, amount } = useParams();
  const [modal, setmodal] = useState(false);
  const [date, setdate] = useState(null);
  const [offerprice, setofferprice] = useState(null)
  const [delivery, setdelivery] = useState(20);
  const handleCloseAdd = () => setshowadd(false);
  const handleCloseOrder = () => {
    navigate("/");
    setmodal(false);
  };
  const addData = async () => {
    const UserResult = await instance.get("/getuserdata");
    if (UserResult.data) {
      setadress(UserResult.data.adress[0]);
      setalladress(UserResult.data.adress);
    }

    // setadress(details.adress)
  };
  const getProduct = async () => {
    try {
      const products = await instance.get(`/getorderproduct/${id}`);
      console.log(products.data[0].products);
      var totalOffer = products.data[0].products.reduce(function (accumulator, pilot) {
        return accumulator + pilot.offer;
      }, 0);
     setofferprice(totalOffer)
      
      setproduct(products.data[0].products);
      
    } catch (err) {}
  };
  const addAdress = (id) => {
    const result = alladress.filter((adress) => adress.secreatId === id);
    console.log(adress);
    if (result) {
      setadress(result[0]);
    }
  };
  const saveAdress = async (e) => {
    e.preventDefault();
    try {
      if (!addstate || !adddistrict || !addcity || !addpincode) {
        seterr("Please fill the empty field");
      } else {
        if (addpincode.length != 6) return setpincodeerr("Invalid pincode");
        const data = {
          state: addstate,
          district: adddistrict,
          city: addcity,
          pincode: addpincode,
        };
        instance.post("/addadress", data).then((response) => {
          if (response) {
            setadress(data);
            setshowadd(false);
            swal("Added successfully");
            setaddpincode("");
            setadddistrict("");
            setaddcity("");
            setaddstate("");
            getUser();
          }
        });
      }
    } catch (err) {}
  };
  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const data = {
        cartId: id,
        price: parseInt(amount)+parseInt(delivery),
        adress: adress,
        payment: payment,
        products: product,
        status: "Placed",
      };
      console.log(data);
      if (!payment || !adress || !id || !amount || !product)
        return seterr("Please fill the required fields");
      if (payment === "Paypal") {
        addPayPalScript();
      } else {
        instance.post("/placeorder", data).then((result) => {
          console.log(result.data);
          if (result.data.order) {
            // const date=response.data.date
            displayRazorpay(result.data.order, result.data.response._id);
          } else {

            // const date=result.data.response.date
            // setdate(date)
            
            swal({
              title: "Order placed successfully!",
              // text: `Delivery expect on ${date}`,
              icon: "success",
              button: "Aww yiss!",
              
            });
            
          }
        });
      }
    } catch (err) {}
  };
  const displayRazorpay = async (data, id) => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Failed !!!!");
      return;
    }
    console.log(data.id);
    const options = {
      key: "rzp_test_OyHJLEVWBe3X4E", // Enter the Key ID generated from the Dashboard
      amount: "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Shoppy",
      description: "Thank you for the purchase",
      image: "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        console.log(response);
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
        verifyPayment(response, data, id);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
  };
  const verifyPayment = (payment, order, id) => {
    console.log(payment);
    console.log(order);
    const data = {
      payment: payment,
      order: order,
      orderid: id,
    };
    instance.post("/successpayment", data).then((response) => {
      if (response.data.status === true) {
        // swal({
        //   title: "Order placed successfully!",
        //   // text: `Delivery expect on ${date}`,
        //   icon: "success",
        //   button: "Aww yiss!",
        // });
        navigate('/success')
      }
      
    });
  };
  const loadRazorpay = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      console.log(src);
      document.body.appendChild(script);
      script.onload = () => {
        console.log("script loaded");
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };

  const addPayPalScript = async () => {
    return new Promise(async (resolve, reject) => {
      const value = await instance.get("/getpaypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${value.data.id}_ID&currency=INR`;
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        console.log("script loaded");
        resolve(true);
        setsdkready(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
  };
  useEffect(() => {
    addData();
    getProduct();
    addPayPalScript();
  }, []);
  return (
    <>
      <Container>
        <Row className="proceed__page__row">
        <Col sm={12} md={6}>
            <Col sm={12} md={12}>
              <Card className="d-flex m-2 p-2 card__main__cart align-items-center">
                <Card.Body className="d-flex   p-2 justify-content-center flex-column">
                  <h1>Price details</h1>
                  <Card className="d-flex m-2 p-2 card__coupen__cart">
                    <Card.Body className="  p-2 coupen__card__body flex-column">
                      <p>Apply coupen</p>
                      <Button className="coupen__btn">Apply</Button>
                    </Card.Body>
                  </Card>

                  <br />
                  <Form.Select
                    className="selection__checkout"
                    size="sm"
                    onChange={(e) => {
                      if (e.target.value === "Standard") {
                        setdelivery(20);
                        seterr("");
                      } else {
                        setdelivery(50);
                        seterr("");
                      }
                    }}
                  >
                    <option> Select delivery method</option>
                    <option> Standard </option>
                    <option> Express </option>
                  </Form.Select>
                  <ListGroup className="list__checkout" variant="flush">
                    <ListGroup.Item className="list__checkout__product">
                      Product Price : Rs.{amount && amount}
                    </ListGroup.Item>
                    <ListGroup.Item className="list__checkout__discount">
                      Discount Price : Rs.{offerprice ? parseInt(amount-offerprice):0}
                    </ListGroup.Item>
                    <ListGroup.Item className="list__checkout__coupen">
                      Coupen discount : Rs.0
                    </ListGroup.Item>
                    <ListGroup.Item className="list__checkout__delivery">
                      Delivery charge : Rs.{delivery && delivery}
                    </ListGroup.Item>
                    <ListGroup.Item className="list__checkout__amount">
                      Total amount : Rs.{amount && parseInt(offerprice)+parseInt(delivery) }
                    </ListGroup.Item>
                  </ListGroup>

                  {err && <p>{err}</p>}
                </Card.Body>
              </Card>
            </Col>
          </Col>
          <Col md={12} className="proceed__page__row">
            <Card className="proceed__page__card">
              <Card.Body className="proceed__page__card__body">
                <h1 className="checkout__head">CHECKOUT</h1>
                <div className="proceed__adress__show">
                  <h3>Delivery adress</h3>
                  <ul>
                    <li>State : {adress && adress.state}</li>

                    <li> District : {adress && adress.district}</li>
                    <li>City : {adress && adress.city}</li>
                    <li>Pincode : {adress && adress.pincode}</li>

                    <Button
                      className="add__new__adress"
                      onClick={() => {
                        setshowadd(true);
                      }}
                    >
                      Add new adress
                    </Button>
                  </ul>
                </div>

                <h4>Confirm order details</h4>
                <Link to="/">View products</Link>
                <Form onSubmit={placeOrder}>
                  <Form.Group>
                    {alladress && (
                      <Form.Select
                        className="selection__adress"
                        size="sm"
                        onChange={(e) => {
                          addAdress(e.target.value);
                        }}
                      >
                        {alladress.map((adress, index) => {
                          return (
                            <option value={adress.secreatId}>
                              Adress:{index + 1}
                            </option>
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
                          checked={payment === "COD"}
                          onChange={(e) => {
                            setpayment(e.currentTarget.value);
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
                          checked={payment === "Paypal"}
                          onChange={(e) => {
                            setpayment(e.currentTarget.value);
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
                          checked={payment === "Razorpay"}
                          onChange={(e) => {
                            setpayment(e.currentTarget.value);
                          }}
                        >
                          Option 1
                        </Radio>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                 {payment!="Paypal" ? <Button className="proceed__btn" type="submit">
                    Procced
                  </Button>: <div style={{width:"20vw"}}>
            {/* ==========================paypal button ===============================*/}
            {payment==="Paypal" && <PayPalButton 
              
              amount={amount}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details, data) => {
                console.log(details);

                // OPTIONAL: Call your server to save the transaction
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
                      // text: `Delivery expect on ${date}`,
                      icon: "success",
                      button: "Aww yiss!",
                    });
                  }
                });

                //
              }}
            />}
          </div>} 
                  {err && <p className="invalid__err__message">{err}</p>}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <div>
          <Modal
            show={showadd}
            onHide={handleCloseAdd}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add adress</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={saveAdress}>
                <Form.Label>Ehter your state</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  value={addstate}
                  onChange={(e) => {
                    setaddstate(e.target.value);
                    seterr("");
                  }}
                ></Form.Control>
                <Form.Label>Enter the district</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="District"
                  value={adddistrict}
                  onChange={(e) => {
                    setadddistrict(e.target.value);
                    seterr("");
                  }}
                ></Form.Control>
                <Form.Label>Enter the city</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={addcity}
                  onChange={(e) => {
                    setaddcity(e.target.value);
                    seterr("");
                  }}
                ></Form.Control>
                <Form.Label>Add pincode</Form.Label>

                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Pincode"
                  value={addpincode}
                  onChange={(e) => {
                    setpincodeerr("");
                    seterr("");

                    setaddpincode(e.target.value);
                  }}
                ></Form.Control>
                <Button
                  className="btn__add__adress__submit"
                  type="submit"
                  variant="secondary"
                >
                  Add
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {err && <p className="invalid__err__message">{err}</p>}
              {pincodeerr && (
                <p className="invalid__err__message">{pincodeerr}</p>
              )}
            </Modal.Footer>
          </Modal>
        </div>

        <div>
          <Modal
            show={modal}
            onHide={handleCloseOrder}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Order placed successfully</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Order delivery expect on {date}</p>
              <p>Your oder will be deliverd to {adress}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseOrder}>Ok</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </>
  );
}

export default Checkout;

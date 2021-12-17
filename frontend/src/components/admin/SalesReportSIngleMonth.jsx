import "./SalesReport.css";
import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Table,
  FloatingLabel,
  Pagination,
  Spinner,
  Container,
} from "react-bootstrap";
import { instanceAdmin } from "../../axios/axios";

import SpinContext from "../../context/spinnerContext";


  export const SalesReportSIngleMonth= React.forwardRef((props, ref) => {
    const [search, setsearch] = useState("");
    const [orderdata, setorderdata] = useState([]);
    const [number, setnumber] = useState(null);
    const [page, setpage] = useState(null);
    
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
  
    const getOrder = async (number) => {
      setspin(true);
  
      instanceAdmin.get(`/monthlyorders/${number}`).then((response) => {
        if (response.data) {
          setspin(false);
          setnumber(number);
          console.log(response.data);
          setorderdata(response.data.orders);
        }
      });
    };
  
    
   
    const getOrders = async () => {
      try {
        setspin(true);
  
        if (number) {
          instanceAdmin.get(`/monthlyorders/${number}`).then((response) => {
            if (response.data) {
              setspin(false);
              setnumber(number);
              console.log(response.data);
              setorderdata(response.data.orders);
              setpage(response.data.pageCount);
            }
          });
        } else {
          instanceAdmin.get(`/monthlyorders/${1}`).then((response) => {
            if (response.data) {
              setspin(false);
              setnumber(number);
              console.log(response.data);
              setorderdata(response.data.orders);
              setpage(response.data.pageCount);
            }
          });
        }
  
       
      } catch (err) {}
    };
 
    useEffect(() => {
      getOrders();
    }, []);
    return (
      <Container fluid ref={ref}>
        {spin === true ? (
          <Spinner className="spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <div className="">
            <div className="">
              <div className="">
                {/* <div className="head">
                  <h1>Sales Managment</h1>
                </div> */}
                <div className="sales__report__main__head">
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
                  </Form>
                 
                </div>
                <div className="sales__table">
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
                          } else if (
                            val.productdetails.productname
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .map((data) => {
                          return (
                            <>
                              <tr>
                                <td>{data.role[0].username}</td>
                                <td>{data.productdetails.productname}</td>
                                <td>{data.date}</td>
                                <td>Rs.{data.products.price}</td>
                                <td>{data.payment} </td>
  
                                <td className="table__order">
                                  <p>{data.products.orderStatus}</p>
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
      </Container>
    );
}


  )
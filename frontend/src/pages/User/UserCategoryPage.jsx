import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { instance } from "../../axios/axios";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/user/Navbar";
import "./Page.css";
import Footer from "../../components/user/Footer";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
function UserCategoryPage() {
  const [category, setcategory] = useState([]);
  const [spin, setspin] = useState(false);
  const { id } = useParams();

  const getCategory = () => {
    setspin(true);
    instance.get(`/getSelectedCategory/${id}`).then((response) => {
      console.log(response.data);
      if (response) {
        setspin(false);
        setcategory(response.data);
      }
    });
  };

  useEffect(() => {
    getCategory();
  }, [id]);
  return (
    <>
      <Navbar />
      {spin === true ? (
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div className=" ">
        
                   

            <div className="body_category">
            <Row>
                     
           
              {category.map((data) => {
                return (
                  <Col md={3}>
                 
                      <Link
                    className="link_category"
                    style={{ textDecoration: "none" }}
                    to={`/viewproduct/${data._id}`}
                  >
                    <Card className="card-main-category">
                   <FavoriteIcon className="heart"/>
                      <Card.Img
                        className="image"
                        variant="top"
                        src={data.url[0].image1}
                      />
                       
                    </Card>
                    
                     </Link>
                  
                    <div className="card_bottom_contents">
                      <ul>
                        <li>{data.productname}</li>
                        <li className="content__card">
                          <div className="left">
                          {data.offer ? (
                            <p>
                              <span className="price_category">
                                ₹{data.price}
                              </span>{" "}
                              <span className="offer__area_card">
                                ₹{Math.trunc(data.price - data.offer)}
                              </span>
                            </p>
                          ) : (
                            <p>₹{data.price}</p>
                            
                          )}

                          </div>
                          <div className="right">
                          <ShoppingCartIcon/>

                          </div>
                         
                          
                        </li>
                        <li></li>
                      </ul>
                    </div>
                 
                  </Col>
                     
                 
                );
              })}
              
            
                    </Row>
            </div>
           

                 
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default UserCategoryPage;

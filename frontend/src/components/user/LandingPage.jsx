import React, { useState, useEffect } from "react";
import { Accordion, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import "./LandingPage.css";
import { Carousel, Card, Spinner, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { instance } from "../../axios/axios";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import Favorite from "@material-ui/icons/Favorite";
function LandingPage() {
  const [spin, setspin] = useState(false);
  const [newarrival, setnewarrival] = useState([]);
  const [trending, settrending] = useState([])
  const getNewArrival = async () => {
    setspin(true);
    try {
      const arrivals = await instance.get("/getnewarrivals");
      if (arrivals) {
        setnewarrival(arrivals.data);
        setspin(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getTrending=async()=>{
    const trending=await instance.get('/trending')
    if(trending){
      console.log("reached")
      console.log(trending.data)
      settrending(trending.data)
    }
  }
  useEffect(() => {
    getNewArrival();
    getTrending()
  }, []);
  return (
    <>
      {spin === true ? (
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="Landing_page">
          <Carousel className="landing_carousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/12/7/53ae79ec-df56-4877-b133-b92f4cfd8c7f1638892785287-EORS-Prebuzz-Banner-DK.gif"
                alt="First slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/11/21/73f7163e-0efa-4754-96d8-9ffe29049cf61637512891687-Desktop-banner--5-.https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/12/11/073805e4-f274-4d37-b5e3-8ef4766a19531639241779767-K_Winterwear_Dk.jpg"
                alt="Second slide"
              />

              {/* <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/11/20/fcb70f4f-e6c6-47b4-a0b5-1a6048a740131637427179952-Desktop-banner--5-.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          <Row className="landing__row">
            <Col md={12}>
              <div className="new_arrivals">
                <div className="sub_heading">
                  <h1>New arrivals</h1>
                </div>

                <div className="card_container_banner">



               



                  {newarrival.map((data) => {
                    return (
                     
                      <Link
                        className="link_arrival"
                        style={{ textDecoration: "none" }}
                        to={`/viewproduct/${data._id}`}
                      >
                        <Card className="arrival_card">
                          <Card.Img
                            className="arrival_image"
                            variant="top"
                            src={data.url[0].image1}
                          />
                          <Favorite className="heart__landing"/>
                          <Card.Body className="card__body">
                            <Card.Text>{data.productname}<br/>
                            ₹{data.price}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    );
                  })}
                </div>

              </div>
            </Col>
            <Col md={12}>
              <div className="new_arrivals">
                <div className="sub_heading">
                  <h1>Trending products</h1>
                </div>
                <div className="card_container_banner">
                  {trending.map((data) => {
                    return (
                      <Link
                        className="link_arrival"
                        style={{ textDecoration: "none" }}
                        to={`/viewproduct/${data.productdetails._id}`}
                      >
                        <Card className="arrival_card">
                          <Card.Img
                            className="arrival_image"
                            variant="top"
                            src={data.productdetails.url[0].image1}
                          />
                         <Favorite className="heart__landing"/>
                          <Card.Body className="card__body">
                            <Card.Text>{data.productdetails.productname}<br/>
                            ₹{data.productdetails.price}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="new_arrivals">
                <div className="sub_heading">
                  <h1>Deals of the day</h1>
                </div>
                <div className="card_container_banner">
                  {newarrival.map((data) => {
                    return (
                      <Link
                        className="link_arrival"
                        style={{ textDecoration: "none" }}
                        to={`/viewproduct/${data._id}`}
                      >
                        <Card className="arrival_card">
                          <Card.Img
                            className="arrival_image"
                            variant="top"
                            src={data.url[0].image1}
                          />
                         <Favorite className="heart__landing"/>
                          <Card.Body className="card__body">
                            <Card.Text>{data.productname}<br/>
                            ₹{data.price}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default LandingPage;

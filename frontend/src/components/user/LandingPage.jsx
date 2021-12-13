import React, { useState, useEffect } from "react";
import { Accordion, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import "./LandingPage.css";
import { Carousel, Card, Spinner, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { instance } from "../../axios/axios";

function LandingPage() {
  const [spin, setspin] = useState(false);
  const [newarrival, setnewarrival] = useState([]);
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
  useEffect(() => {
    getNewArrival();
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
                src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/11/24/1b31d859-b3c8-48a8-a2a9-2338408dec4b1637766559561-DK-Main-Banner-1920_504_sale-Strats-Midnight.jpg"
                alt="First slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/11/21/73f7163e-0efa-4754-96d8-9ffe29049cf61637512891687-Desktop-banner--5-.gif"
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
          <Row>
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
                          <Card.Body>
                            <Card.Text>{data.productname}</Card.Text>
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
                          <Card.Body>
                            <Card.Title>{data.productname}</Card.Title>
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
                          <Card.Body>
                            <Card.Title>{data.productname}</Card.Title>
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

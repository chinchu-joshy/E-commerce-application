import React, { useEffect, useState } from "react";
import { instanceAdmin } from "../../axios/axios";
import "./MensCategory.css";
import Navbar from "./Navbar";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
function MensCategory() {
  const [men, setmen] = useState([]);
  const [presentmen, setpresentmen] = useState(false);
  const [spin, setspin] = useState(false);
  const getMen = async () => {
    setspin(true);
    const response = await instanceAdmin.get("/getmen");
    if (response) {
      setmen(response.data);
      setpresentmen(true);
      setspin(false);
    }
  };
  useEffect(() => {
    getMen();
  }, []);
  return (
    <>
      {spin === true ? (
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="get_women_head">
          <div className="navbar">
            <Navbar women={presentmen} />
          </div>
          <div className="body">
            {men.map((data) => {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/viewproduct/${data._id}`}
                >
                  <Card className="card" style={{ width: "18rem" }}>
                    <Card.Img
                      className="image"
                      variant="top"
                      src={data.url[0].image1}
                    />
                    <Card.Body>
                      <Card.Title>{data.productname}</Card.Title>
                      <Card.Text>{data.description}</Card.Text>
                      <Button variant="primary">{data.price}</Button>
                    </Card.Body>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MensCategory;

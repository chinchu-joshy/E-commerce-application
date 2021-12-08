import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import UserContext from "../../context/UserdetailsContext";
import "./UserProfile.css";
import { instance } from "../../axios/axios";
import swal from "sweetalert";
function Details() {
  const [show, setShow] = useState(false);
  // const [username, setusername] = useState('')
  // const [email, setemail] = useState('')
  // const [phone, setphone] = useState('')
  // const [dob, setdob] = useState('')
  const [detail, setdetail] = useState({});
  const [err, seterr] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [phoneerror, setphoneerror] = useState("");
  const [dateerr, setdateerr] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { details, getUser, setdetails } = useContext(UserContext);
  const editDetails = () => {
    try {
      setdetail(details);
      setShow(true);
    } catch (err) {}
  };
  const changeUsername = (e) => {
    setdetail((prev) => ({
      ...prev,
      username: e.target.value,
    }));
    seterr("");
    setemailerror("");
  };
  const changeEmail = (e) => {
    setdetail((prev) => ({
      ...prev,
      email: e.target.value,
    }));
    seterr("");
  };
  const changePhone = (e) => {
    setdetail((prev) => ({
      ...prev,
      phone: e.target.value,
    }));
    setphoneerror("");
    seterr("");
  };
  const changeDOB = (e) => {
    const val = new Date();
    const val2 = new Date(e.target.value);

    const diffTime = Math.abs(val - val2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    if (diffDays < 4383) {
      console.log("not possible");
      setdateerr("your date is not valid");
    } else {
      setdateerr("");
    }
    // console.log(moment(newDate).format('YYYY-MM-DD'))

    setdetail((prev) => ({
      ...prev,
      DOB: e.target.value,
    }));
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const editAdress = async (e) => {
    e.preventDefault();
    if (detail.username && detail.DOB && detail.email && detail.phone) {
      try {
        try {
          if (!validateEmail(detail.email)) {
            console.log(validateEmail(detail.email));
            throw new Error("not valid email");
          }
        } catch (err) {
          setemailerror(err.message);
        }
        try {
          if (detail.phone.length != 10) {
            throw new Error("Invalid phone number");
          }
        } catch (err) {
          setphoneerror(err.message);
        }

        const data = {
          username: detail.username,
          dob: detail.dob,
          email: detail.email,

          phone: detail.phone,
        };
        // const mail_format = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        // if(mail_format.match(email)){
        //    console.log("success")
        // }

        if (
          validateEmail(detail.email) &&
          detail.phone.length === 10 &&
          !dateerr
        ) {
          instance.post("/editdetails", data).then(async (response) => {
            console.log(response.data);
            if (response.data) {
              seterr(response.data.error);

              setShow(false);
              swal("Updated successfully");
              getUser();
            }
          });
        }
      } catch (err) {
        seterr("Some unknown error occured");
      }
    } else {
      seterr("Please fill the empty field");
    }
  };

  return (
    <div>
      <Container className="detail__container">
        <Row className="row__detail">
          <Col md={12}>
            <div className="main__container__add__adress">
              <h3>My details</h3>
            </div>

            <p>
              Fell free to edit your account so that your shoppy account is
              fully update
            </p>
          </Col>
          <Col md={6}>
            <h6 className="user__detail__username">User name</h6>
            <h6 className="user__detail__email">Email</h6>
            <h6 className="user__detail__number">Phone number</h6>
            <h6 className="user__detail__dob">DOB</h6>
          </Col>
          <Col md={6}>
            <h6 className="user__detail__username">{details.username}</h6>
            <h6 className="user__detail__email">{details.email}</h6>
            <h6 className="user__detail__number">{details.phone}</h6>
            <h6 className="user__detail__dob">{details.DOB}</h6>
          </Col>
          <Col md={12}>
            <Button
              onClick={() => {
                editDetails(details._id);
              }}
              className="edit__detail__profile"
            >
              Edit
            </Button>
          </Col>
        </Row>
      </Container>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter new password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={editAdress}>
              <Form.Label>Edit username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={detail.username}
                onChange={changeUsername}
              ></Form.Control>
              <Form.Label>Edit email</Form.Label>
              {emailerror && <p>{emailerror}</p>}
              <Form.Control
                type="email"
                placeholder="Email"
                value={detail.email}
                onChange={changeEmail}
              ></Form.Control>
              <Form.Label>Edit phonenumber</Form.Label>
              {phoneerror && <p>{phoneerror}</p>}
              <Form.Control
                type="number"
                placeholder="Phone number"
                value={detail.phone}
                onChange={changePhone}
              ></Form.Control>
              <Form.Label>Edit Date of birth</Form.Label>
              {dateerr && <p>{dateerr}</p>}
              <Form.Control
                type="date"
                placeholder="Date of birth"
                value={detail.DOB}
                onChange={changeDOB}
              ></Form.Control>

              <Button className="mt-2" variant="secondary" type="submit">
                Edit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>{err && <p>{err}</p>}</Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Details;

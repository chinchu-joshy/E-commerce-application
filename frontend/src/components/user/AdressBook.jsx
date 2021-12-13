import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  CloseButton,
  Modal,
  Form,
} from "react-bootstrap";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { instance } from "../../axios/axios";
import swal from "sweetalert";
import UserContext from "../../context/UserdetailsContext";
function AdressBook() {
  const [showedit, setshowedit] = useState(false);
  const [showadd, setshowadd] = useState(false);
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [err, seterr] = useState("");
  const [pincodeerr, setpincodeerr] = useState(null);
  const [addstate, setaddstate] = useState("");
  const [addpincode, setaddpincode] = useState("");
  const [adddistrict, setadddistrict] = useState("");
  const [addcity, setaddcity] = useState("");
  const [adress, setadress] = useState({});
  const {details,getUser} = useContext(UserContext)
  const handleClose = () => setshowedit(false);
  const [adressbook, setadressbook] = useState([])
  const handleCloseAdd = () => setshowadd(false);
//   const getAdressShow = async () => {
//     const userAdress = await instance.get("/getadress");
//     if (userAdress) {
//       setadress(userAdress.data);
//     }
//   };
const getAdress=async()=>{
  const UserResult= await instance.get('/getuserdata')
  console.log("end")
  setadressbook(UserResult.data)
}
const changeState=(e)=>{
   setadress(prev=>({
        ...prev,state:e.target.value
    })
    
  )
  seterr("");
}
const changeDistrict=(e)=>{
    setadress(prev=>({
         ...prev,district:e.target.value
     })
   )
   seterr("");
 }
 const changeCity=(e)=>{
    setadress(prev=>({
         ...prev,city:e.target.value
     })
   )
   seterr("");
 }
 const changePin=(e)=>{
    
    
        setadress(prev=>({
            ...prev,pincode:e.target.value
        })
        )
        setpincodeerr("");
        seterr("");
        
      

    
   
 }
  const handleShow = async (id) => {
   
      console.log(id)
    const adress = await instance.get(`/geteditadress/${id}`);
    if(adress){
       
        setadress(adress.data.adress[0])
        setshowedit(true);
        
    }
    
  };
  const handleDelete=(id)=>{
      try{
          instance.get(`/deleteadress/${id}`).then((response)=>{
              if(response){
                  getUser()
              }
          })

      }catch(err){

      }
  }
  const handleShowAdd = () => setshowadd(true);
  const EditAdress = (e) => {
      e.preventDefault()
      try{
        if (!adress.state || !adress.district || !adress.city || !adress.pincode) {
            seterr("Cannot add empty fields");
          } else {
            if (adress.pincode.length != 6) return setpincodeerr("Invalid pincode");
            const data = {
                state: adress.state,
                district: adress.district,
                city: adress.city,
                pincode: adress.pincode,
                secreatId:adress.secreatId
              };
              instance.post('/editadress',data).then((response)=>{
                  if(response){
                      setadress({})
                      setshowedit(false)
                      getUser()
                      
                  }
              })
          }

      }catch(err){

      }
  };
  useEffect(() => {
    getUser();
    getAdress()
    
  }, []);
  const addAdress = (e) => {
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
            setshowadd(false);
            swal("Added successfully");
            setaddpincode("");
            setadddistrict("");
            setaddcity("");
            setaddstate("");
            console.log(response);
            getUser();
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
      <>
    <div className="container__adress__book">
      <Container>
        <Row className="row__adress__book">
          <Col md={12}>
            <div className="main__container__adress">
              <h6>{details.adress ? details.adress.length: 0} saved adress</h6>
              <h6>You can enter maximum of 4 adress</h6>
              <Button onClick={handleShowAdd}>Add new adress</Button>
            </div>
{adressbook.adress && adressbook.adress.map((adress)=>{
    return(
        <Card className="adress__book__card mb-2">
              <Card.Body>
                <CloseButton onClick={()=>{
                 swal({
                  title: "Are you sure?",
                 
                  
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    handleDelete(adress.secreatId)
                    swal(
                      "Poof! Your adress has been deleted!",
                      {}
                    );
                  } else {
                    swal("Your adress is safe!");
                  }
                });
                   
                }} className="close__adress" />
                <ul>
                  <li>State : {adress.state}</li>
                  <li>District : {adress.district}</li>
                  <li>City : {adress.city}</li>
                  <li>PIncode : {adress.pincode}</li>
                  
                  <Button onClick={()=>{
                     handleShow(adress.secreatId) 
                  }} className="edit__adress">
                    Edit
                  </Button>
                </ul>
              </Card.Body>
            </Card>
    )

})
            
}
          </Col>
        </Row>
      </Container>
      <div>
        <Modal
          show={showedit}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit adress</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={EditAdress}>
            <Form.Label>Ehter your state</Form.Label>
              <Form.Control
                type="text"
                placeholder={adress.state}
                value={adress.state}
               
                onChange={
                    changeState
                
                  
                  }
              ></Form.Control>
  <Form.Label>Ehter your district</Form.Label>
              <Form.Control
                type="text"
                placeholder="District"
                value={adress.district}
                onChange={changeDistrict}
              ></Form.Control>
                <Form.Label>Ehter your city</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                value={adress.city}
                onChange={changeCity}
              ></Form.Control>
                <Form.Label>Ehter your pincode</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Pincode"
                value={adress.pincode}
                onChange={changePin}
              ></Form.Control>
              <Button className="mt-2" type="submit"  >
                Edit
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
          show={showadd}
          onHide={handleCloseAdd}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add adress</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={addAdress}>
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
    </div>
    </>
  );
}

export default AdressBook;

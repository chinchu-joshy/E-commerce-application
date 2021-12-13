import React,{useState,useEffect} from 'react'
import './Offer.css'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Table,
  Button,
  Container,
  Form,
  FloatingLabel,
  Modal,
  Pagination,
  Dropdown,
  Spinner,
  ButtonGroup,
} from "react-bootstrap";
import { instanceAdmin } from "../../axios/axios";
import swal from "sweetalert";
function ProductOffer() {
    const [err, seterr] = useState()
    const [editoffer, seteditOffer] = useState({})
    const [dateerror, setdateerror] = useState()
    const [editshow, seteditshow] = useState(false)
    const [search, setsearch] = useState("")
    const [offerdata, setofferdata] = useState([])
    const [page, setpage] = useState(null)
    const [number, setnumber] = useState()
    const [dateerr, setdateerr] = useState()
    const [dateenderr, setdateenderr] = useState("")
    const [show, setshow] = useState()
    const [StartDate, setStartDate] = useState()
    const [EndDate, setEndDate] = useState()
    
    let active = 1;
    let items = [];
    for (let number = 1; number <= page + 1; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === active}
            onClick={() => {
              setnumber(number);
              
                getOffers(number);
             
               
              
            }}
          >
            {number}
          </Pagination.Item>
        );
      }
    
      const getOffers = async (number) => {
        
        // setspin(true);
        const offer = await instanceAdmin.get(`/getoffer/${number}`);
    
        if (offer.data) {
        //   setspin(false);
          setnumber(number);
          setofferdata(offer.data.offers);
          setpage(offer.data.pageCount);
        }
      };
      const getOffer = async () => {
       
        // setspin(true);
        try {
          if (number) {
            const offer = await instanceAdmin.get(`/getoffer/${number}`);
    
            if (offer.data) {
            //   setspin(false);
              setnumber(number);
              setofferdata(offer.data.offers);
              // setpage(user.data.pageCount)
            }
          } else {
            const offer = await instanceAdmin.get(`/getoffer/${1}`);
            if (offer.data) {
              console.log(offer.data);
            //   setspin(false);
              setnumber(number);
              setofferdata(offer.data.offers);
              setpage(offer.data.pageCount);
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
    //  =========================== product action functions=======================
   
    const editOffer=async (e) => {
        e.preventDefault();
        if (
          !editoffer.product ||
          !editoffer.offername ||
          !editoffer.startdate ||
          !editoffer.enddate ||
          !editoffer.offerprice
        )
          return seterr("Cannot add empty fields");
        try {
          const data = {
            editoffer,
          };
    
          console.log(data);
    
          instanceAdmin.post("/editoffer/", data).then((response) => {
            if (response) {
              getOffer();
              seteditshow(false)
              swal("Updated offer")
            }
          });
        } catch (err) {}
      };
    const edithandleClose=()=>{
        seteditshow(false)
    
    }
    const deleteOffer = async (id,productId) => {
        try {
            const data={
                id:id,
                productId:productId
            }
          instanceAdmin.post('/deleteoffer',data).then((response) => {
            if (response) {
              swal("Deleted successfully");
              getOffer();
            }
          });
        } catch (err) {}
      };
    const handleClose=()=>{

    }
     //  =========================== product action functions=======================
      useEffect(() => {
        getOffer()
      }, [])
    return (
        <div>
            <div className="offer__table">
              <Table striped bordered hover variant="light" responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Offer name</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Offer percentage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offerdata
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.offername
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((offer) => {
                      return (
                        <>
                          <tr>
                            {offer.category ? (
                              <td>
                                {" "}
                                category:{offer.category},{offer.subcategory}
                              </td>
                            ) : (
                              <td>{offer.product}</td>
                            )}
                            <td>{offer.offername}</td>
                            <td>{offer.startdate}</td>
                            <td>{offer.enddate}</td>
                            <td>{offer.offerprice}%</td>
                            <td>
                              <EditIcon
                                onClick={() => {
                                    console.log(offer)
                                 
                                    seteditOffer(offer);
                                    seteditshow(true);
                                  
                                }}
                              />
                              <DeleteIcon
                                onClick={() => {
                                  deleteOffer(offer._id,offer.productId);
                                }}
                              />
                              
                            </td>
                          </tr>
                        </>
                      );

                      
                    })}
                </tbody>
              </Table>
            </div>

            <div className="offer__pagination">
              <Pagination>{items}</Pagination>
            </div>




{/* ===============================edit the offer=============================== */}


            <Modal
              show={editshow}
              onHide={edithandleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit offer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
               
                <Form onSubmit={editOffer}>
                  <Form.Label>Offer name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Offer name"
                    value={editoffer.offername}
                    onChange={(e) => {
                        seteditOffer((prev) => ({
                        ...prev,
                        offername: e.target.value,
                      }));
                    }}
                  ></Form.Control>
                  <Form.Label>Start date</Form.Label>
                  {dateerror && <p>{dateerror}</p>}
                  <Form.Control
                    type="Date"
                    placeholder="Start Date"
                    value={editoffer.startdate}
                    onChange={(e) => {
                        seteditOffer((prev) => ({
                        ...prev,
                        startdate: e.target.value,
                      }));
                    }}
                  ></Form.Control>
                  <Form.Label>End date</Form.Label>
                  {dateerror && <p>{dateerror}</p>}
                  <Form.Control
                    type="Date"
                    placeholder="End Date"
                    value={editoffer.enddate}
                    onChange={(e) => {
                      seteditOffer((prev) => ({
                        ...prev,
                        enddate: e.target.value,
                      }));
                    }}
                  ></Form.Control>
                  <Form.Label>Offer percentage</Form.Label>

                  <Form.Control
                    type="number"
                    placeholder="Offer Price"
                    value={editoffer.offerprice}
                    min={1}
                    onChange={(e) => {
                        seteditOffer((prev) => ({
                        ...prev,
                        offerprice: e.target.value,
                      }));
                    }}
                  ></Form.Control>
                  <Button className="mt-2" variant="secondary" type="submit">
                    edit
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>{err && <p>{err}</p>}</Modal.Footer>

            </Modal>









        </div>
    )
}

export default ProductOffer

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
function EditCategoryOffer() {
    const [err, seterr] = useState()
    const [editoffer, seteditoffer] = useState({})
    const [dateerror, setdateerror] = useState()
    const [editshow, seteditshow] = useState(false)
    const [search, setsearch] = useState("")
    const [offerdata, setofferdata] = useState([])
    const [page, setpage] = useState(null)
    const [number, setnumber] = useState()
    const [deleteOffer, setdeleteOffer] = useState()
    // const [dateerr, setdateerr] = useState()
    // const [dateenderr, setdateenderr] = useState("")
    // const [show, setshow] = useState()
    // const [StartDate, setStartDate] = useState()
    // const [EndDate, setEndDate] = useState()
    const [editoffercategory, seteditoffercategory] = useState({})
    const [subcategory, setsubcategory] = useState("")
    const [category, setcategory] = useState("")
    
    let active = 1;
    let items = [];
    for (let number = 1; number <= page + 1; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === active}
            onClick={() => {
              setnumber(number);
              
              getOffersCategory(number);
             
               
              
            }}
          >
            {number}
          </Pagination.Item>
        );
      }
      const getOffersCategory = async (number) => {
       
        const offer = await instanceAdmin.get(`/getoffercategory/${number}`);
    
        if (offer.data) {
         
          setnumber(number);
          setofferdata(offer.data.offers);
          setpage(offer.data.pageCount);
        }
      };
      const getOfferCategory = async () => {
       
       
        try {
          if (number) {
            const offer = await instanceAdmin.get(`/getoffercategory/${number}`);
    
            if (offer.data) {
             
              setnumber(number);
              setofferdata(offer.data.offers);
              setpage(offer.data.pageCount);
            }
          } else {
            const offer = await instanceAdmin.get(`/getoffercategory/${1}`);
            if (offer.data) {
              console.log(offer.data);
             
              setnumber(number);
              setofferdata(offer.data.offers);
              setpage(offer.data.pageCount);
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
      const editOfferCategory=()=>{

      }
     const closeEditCategory=()=>{
         seteditshow(false)

      }
      useEffect(() => {
        getOfferCategory()
         
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
                       
                          <td>
                          
                            category:{offer.category},{offer.subcategory}</td>
                        
                        <td>{offer.offername}</td>
                        <td>{offer.startdate}</td>
                        <td>{offer.enddate}</td>
                        <td>{offer.offerprice}%</td>
                        <td>
                          <EditIcon
                            onClick={() => {
                                console.log(offer)
                             
                                seteditoffer(offer);
                                seteditshow(true);
                              
                            }}
                          />
                          <DeleteIcon
                            onClick={() => {
                              deleteOffer(offer._id);
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
              onHide={closeEditCategory}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit offer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>{category}</Form.Label>
                <Form.Label>{subcategory}</Form.Label>

                <Form onSubmit={editOfferCategory}>
                  <Form.Label>Offer name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Offer name"
                    value={editoffer.offername}
                    onChange={(e) => {
                      seteditoffercategory((prev) => ({
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
                      seteditoffercategory((prev) => ({
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
                      seteditoffercategory((prev) => ({
                        ...prev,
                        enddate: e.target.value,
                      }));
                    }}
                  ></Form.Control>
                  <Form.Label>Offer price</Form.Label>

                  <Form.Control
                    type="number"
                    placeholder="Offer Price"
                    value={editoffer.offerprice}
                    min={1}
                    onChange={(e) => {
                      seteditoffercategory((prev) => ({
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

export default EditCategoryOffer

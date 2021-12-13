import "./Offer.css";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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
import SpinContext from "../../context/spinnerContext";
import ProductOffer from "./ProductOffer";
import EditCategoryOffer from "./EditCategoryOffer";

function Offer() {
  const [search, setsearch] = useState("");

  const [err, seterr] = useState();
  const [show, setshow] = useState(false);
  const [dateerror, setdateerror] = useState("");
  const { spin, setspin } = useContext(SpinContext);
  const [page, setpage] = useState(null);
  const [offerdata, setofferdata] = useState([]);
  const [state, setState] = useState("");
  const [searchproduct, setsearchproduct] = useState("");
  const [dateenderr, setdateenderr] = useState("");
  const [editshow, seteditshow] = useState(false);
  const [dateerr, setdateerr] = useState("");
  const [mode, setmode] = useState("");
  const [categoryShow, setcategoryShow] = useState(false);
  const [subcategory, setsubcategory] = useState("");
  const [category, setcategory] = useState("");
  const [categorylist, setcategorylist] = useState([]);
  const [subcategorylist, setsubcategorylist] = useState([]);
  const [display, setdisplay] = useState(false);
  const [filter, setfilter] = useState("product");
  const [editcategoryshow, seteditcategoryshow] = useState(false);
  const [categorymode, setcategorymode] = useState(false);
  const [productmode, setproductmode] = useState(true);

  const [offer, setoffer] = useState({
    offername: "",
    startdate: "",
    enddate: "",
    offerprice: null,
    product: "",
  });

  const [number, setnumber] = useState(null);
  let active = 1;
  let items = [];
  const categoryHandleClose = () => {
    setcategoryShow(false);
    setmode("");
  };
  for (let number = 1; number <= page + 1; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          setnumber(number);
          if (filter === "product") {
            getOffers(number);
          } else if (filter === "category") {
            getOffersCategory(number);
          }
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const getOffers = async (number) => {
    setfilter("product");
    setspin(true);
    const offer = await instanceAdmin.get(`/getoffer/${number}`);

    if (offer.data) {
      setspin(false);
      setnumber(number);
      setofferdata(offer.data.offers);
      setpage(offer.data.pageCount);
    }
  };
  const getOffersCategory = async (number) => {
    setspin(true);
    const offer = await instanceAdmin.get(`/getoffercategory/${number}`);

    if (offer.data) {
      setspin(false);
      setnumber(number);
      setofferdata(offer.data.offers);
      setpage(offer.data.pageCount);
    }
  };

  const getOffer = async () => {
    setfilter("product");
    setspin(true);
    try {
      if (number) {
        const offer = await instanceAdmin.get(`/getoffer/${number}`);

        if (offer.data) {
          setspin(false);
          setnumber(number);
          setofferdata(offer.data.offers);
          // setpage(user.data.pageCount)
        }
      } else {
        const offer = await instanceAdmin.get(`/getoffer/${1}`);
        if (offer.data) {
          console.log(offer.data);
          setspin(false);
          setnumber(number);
          setofferdata(offer.data.offers);
          setpage(offer.data.pageCount);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // =============================add offer==============================
  const addOfferCategory = async (e) => {
    e.preventDefault();
    try {
      const data = {
        offername: offer.offername,
        startdate: offer.startdate,
        enddate: offer.enddate,
        offerprice: offer.offerprice,
        confirm: false,
        category: category,
        subcategory: subcategory,
      };
      console.log(data);
      if (
        !offer.offername ||
        !offer.startdate ||
        !offer.enddate ||
        !offer.offerprice ||
        !category ||
        !subcategory
      ) {
        const val1 = new Date(offer.startdate);
        const val2 = new Date(offer.enddate);
        if (val1.getTime() > val2.getTime()) {
          setdateenderr("Not valid");
        }
        seterr("Please fill all field");
      } else {
        if (!dateerror || !dateenderr || !err) {
          await instanceAdmin
            .post("/addoffercategory", data)
            .then((response) => {
              console.log(response.data);
              if (response.data.confirm) {
                swal({
                  title: response.data.confirm,

                  buttons: true,
                  dangerMode: true,
                }).then(async (willDelete) => {
                  if (willDelete) {
                    const value = {
                      offername: offer.offername,
                      startdate: offer.startdate,
                      enddate: offer.enddate,
                      offerprice: offer.offerprice,
                      product: offer.product,
                      confirm: true,
                      category: category,
                      subcategory: subcategory,
                    };

                    await instanceAdmin
                      .post("/addoffercategory", value)
                      .then((response) => {
                        if (response) {
                          getOffer();
                          swal("Offer updated");
                          setoffer({
                            offername: "",
                            startdate: "",
                            enddate: "",
                            offerprice: "",
                            product: "",
                          });
                          setcategory("");
                          setsubcategory("");
                          setshow(false);
                        }
                      });
                  } else {
                    swal("No changes applied");
                    setoffer({
                      offername: "",
                      startdate: "",
                      enddate: "",
                      offerprice: "",
                      product: "",
                    });
                    setshow(false);
                  }
                });
              } else {
                getOffer();
                setoffer({
                  offername: "",
                  startdate: "",
                  enddate: "",
                  offerprice: "",
                  product: "",
                });
                swal("offer added successfully");
                setshow(false);
              }
            });
        }
      }
    } catch (err) {}
  };
  const addOffer = async (e) => {
    e.preventDefault();
    try {
      const data = {
        offername: offer.offername,
        startdate: offer.startdate,
        enddate: offer.enddate,
        offerprice: offer.offerprice,
        product: offer.product,
        confirm: false,
      };
      if (
        !offer.offername ||
        !offer.startdate ||
        !offer.enddate ||
        !offer.offerprice ||
        !offer.product
      ) {
        const val1 = new Date(offer.startdate);
        const val2 = new Date(offer.enddate);
        if (val1.getTime() > val2.getTime()) {
          setdateenderr("Not valid");
        }
        seterr("Please fill all field");
      } else {
        if (!dateerror || !dateenderr || !err) {
          await instanceAdmin.post("/addoffer", data).then((response) => {
            if (response.data.confirm) {
              swal({
                title: response.data.confirm,

                buttons: true,
                dangerMode: true,
              }).then(async (willDelete) => {
                if (willDelete) {
                  const value = {
                    offername: offer.offername,
                    startdate: offer.startdate,
                    enddate: offer.enddate,
                    offerprice: offer.offerprice,
                    product: offer.product,
                    confirm: true,
                  };

                  await instanceAdmin
                    .post("/addoffer", value)
                    .then((response) => {
                      if (response) {
                        getOffer();
                        swal("Offer updated");
                        setoffer({
                          offername: "",
                          startdate: "",
                          enddate: "",
                          offerprice: "",
                          product: "",
                        });
                        setshow(false);
                      }
                    });
                } else {
                  swal("No changes applied");
                  setoffer({
                    offername: "",
                    startdate: "",
                    enddate: "",
                    offerprice: "",
                    product: "",
                  });
                  setshow(false);
                }
              });
            } else {
              getOffer();
              setoffer({
                offername: "",
                startdate: "",
                enddate: "",
                offerprice: "",
                product: "",
              });
              swal("offer added successfully");
              setshow(false);
            }
          });
        }
      }
    } catch (err) {}
  };
  const setStartDate = (e) => {
    const val = new Date();
    const val2 = new Date(e.target.value);
    console.log("jdbjbjd");

    if (val.getTime() > val2.getTime()) {
      setdateerr("your date is not valid");
    } else {
      setdateerr("");
    }
    seterr("");
    setoffer((prev) => ({
      ...prev,
      startdate: e.target.value,
    }));
  };

  const setEndDate = (e) => {
    const val = new Date();
    const val2 = new Date(e.target.value);

    if (val.getTime() > val2.getTime()) {
      setdateenderr("your date is not valid");
    } else {
      setdateenderr("");
    }
    seterr("");
    setoffer((prev) => ({
      ...prev,
      enddate: e.target.value,
    }));
  };
  const handleClose = () => {
    seterr("");
    setshow(false);
    setmode("");
  };
  const getAllCategory = async () => {
    const datas = await instanceAdmin.get("/getallcategory");
    console.log(datas);
    setcategorylist(datas.data);
  };
  useEffect(() => {
    getAllCategory();
    getOffer();
  }, []);
  return (
    <>
      {spin === true ? (
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <Container>
            <div className="container__offer">
              <div className="offer__heading">
                <h2 className="offer__head__style">Offer managemant</h2>
              </div>
              <div className="offer__search">
                <Form className="offer_form">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Search offer......"
                    className="mb-2 "
                  >
                    <Form.Control
                      type="search"
                      className="input_offer"
                      value={search}
                      onChange={(e) => {
                        setsearch(e.target.value);
                      }}
                      placeholder="Search offer"
                    />
                  </FloatingLabel>
                </Form>
                <div className="select__container__offer">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      console.log(e.target.value);
                      console.log("reached");
                      setmode(e.target.value);
                    }}
                  >
                    <option selected>Add offer</option>
                    <option value="product">Add offer to product</option>
                    <option value="category">Add offer to category</option>
                  </select>
                  <Button
                    className="mb-2 btn-offer-select"
                    onClick={() => {
                      if (!mode) return swal("Please select one option");
                      if (mode === "product") {
                        setshow(true);
                        setmode("");
                      } else {
                        setcategoryShow(true);
                        setmode("");
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>

                <ButtonGroup aria-label="Basic example">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setproductmode(true);
                      setcategorymode(false);
                    }}
                  >
                    Product
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => {
                      setproductmode(false);
                      setcategorymode(true);
                    }}
                  >
                    Category
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <div className="offer__table">
              {categorymode === true && <EditCategoryOffer />}
              {productmode === true && <ProductOffer />}
            </div>
          </Container>
          <div>
            
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add offer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>Product name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product name"
                  value={offer.product}
                  onChange={(e) => {
                    seterr("");
                    setoffer((prev) => ({ ...prev, product: e.target.value }));
                  }}
                ></Form.Control>
                <Form onSubmit={addOffer}>
                  <Form.Label>Offer name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Offer name"
                    value={offer.offername}
                    onChange={(e) => {
                      seterr("");
                      setoffer((prev) => ({
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
                    value={offer.startdate}
                    onChange={setStartDate}
                  ></Form.Control>
                  {dateerr && <p>{dateerr}</p>}
                  <Form.Label>End date</Form.Label>
                  {dateerror && <p>{dateerror}</p>}
                  <Form.Control
                    type="Date"
                    placeholder="End Date"
                    value={offer.enddate}
                    onChange={setEndDate}
                  ></Form.Control>
                  {dateenderr && (
                    <p className="date__error__offer">{dateenderr}</p>
                  )}
                  <Form.Label>Offer percentage</Form.Label>

                  <Form.Control
                    type="number"
                    placeholder="Offer Price"
                    value={offer.offerprice}
                    min={1}
                    onChange={(e) => {
                      seterr("");
                      setoffer((prev) => ({
                        ...prev,
                        offerprice: e.target.value,
                      }));
                    }}
                  ></Form.Control>
                  <Button className="mt-2" variant="secondary" type="submit">
                    Add
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                {" "}
                {err && <p className="fill__error__offer">{err}</p>}
              </Modal.Footer>
              {/* <Form.Control
                type="text"
                placeholder="Offer Price"
                value={searchproduct}
                min={1}
                onChange={(e) => {
                  setsearchproduct(e.target.value);
                }}
              ></Form.Control>
              <p></p> */}
            </Modal>
            {/*========================== edit offer======================= */}

            {/* ============================modal for category================================ */}
            <Modal
              show={categoryShow}
              onHide={categoryHandleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add offer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>Select category</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={async (e) => {
                    console.log(e.target.value);
                    setcategory(e.target.value);
                    console.log(e.target.value);
                    await instanceAdmin
                      .get(`/subcategorylist/${e.target.value}`)
                      .then((response) => {
                        console.log(response.data[0].subcategory);
                        setsubcategorylist(response.data[0].subcategory);
                        setsubcategory(response.data[0].subcategory[0]);
                        setdisplay(true);
                      });
                  }}
                >
                  <option selected>select category</option>
                  {categorylist.map((data) => {
                    return (
                      <>
                        <option value={data.category}>{data.category}</option>
                      </>
                    );
                  })}
                </Form.Control>
                <Form.Label
                  className={
                    !subcategorylist
                      ? "select__subcategory__offer"
                      : "select__subcategory__offer__visible"
                  }
                >
                  Select subcategory
                </Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={async (e) => {
                    setsubcategory(e.target.value);
                  }}
                  className={
                    !subcategorylist
                      ? "select__subcategory__offer"
                      : "select__subcategory__offer__visible"
                  }
                >
                  <option selected>select subcategory</option>

                  {subcategorylist.map((data) => {
                    return (
                      <>
                        {console.log(data)}
                        <option value={data}>{data}</option>
                      </>
                    );
                  })}
                </Form.Control>
                <Form onSubmit={addOfferCategory}>
                  <Form.Label>Offer name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Offer name"
                    value={offer.offername}
                    onChange={(e) => {
                      seterr("");
                      setoffer((prev) => ({
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
                    value={offer.startdate}
                    onChange={setStartDate}
                  ></Form.Control>
                  {dateerr && <p>{dateerr}</p>}
                  <Form.Label>End date</Form.Label>
                  {dateerror && <p>{dateerror}</p>}
                  <Form.Control
                    type="Date"
                    placeholder="End Date"
                    value={offer.enddate}
                    onChange={setEndDate}
                  ></Form.Control>
                  {dateenderr && (
                    <p className="date__error__offer">{dateenderr}</p>
                  )}
                  <Form.Label>Offer price</Form.Label>

                  <Form.Control
                    type="number"
                    placeholder="Offer Price"
                    value={offer.offerprice}
                    min={1}
                    onChange={(e) => {
                      seterr("");
                      setoffer((prev) => ({
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
              <Modal.Footer>
                {" "}
                {err && <p className="fill__error__offer">{err}</p>}
              </Modal.Footer>

              {/* <Form.Control
                type="text"
                placeholder="Offer Price"
                value={searchproduct}
                min={1}
                onChange={(e) => {
                  setsearchproduct(e.target.value);
                }}
              ></Form.Control>

              <p></p> */}
            </Modal>
            {/* ===============================edit offer category ============================*/}
          </div>
        </div>
      )}
    </>
  );
}

export default Offer;

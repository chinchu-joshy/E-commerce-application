import "./Coupen.css";
import React, { useEffect, useState } from "react";
import { Button, Pagination, Table, Form, Modal ,FloatingLabel} from "react-bootstrap";
import { instanceAdmin } from "../../axios/axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import swal from "sweetalert";
function Coupen() {
  const [coupen, setcoupen] = useState([]);
  const [number, setnumber] = useState();
  const [page, setpage] = useState();
  const [search, setsearch] = useState("");
  const [show, setshow] = useState(false);
  const [err, seterr] = useState();
  const [editshow, seteditshow] = useState(false);
  const [dateerror, setdateerror] = useState();
  const [dateerr, setdateerr] = useState();
  const [dateenderr, setdateenderr] = useState();
const [editcoupen, seteditcoupen] = useState({})
  const [addcoupen, setaddcoupen] = useState({
    coupenname: "",
    coupencode: "",
    startdate: "",
    enddate: "",
    offer: null,
    limit:null
  });
  // ================================get coupen======================================

  let active = 1;
  let items = [];
  for (let number = 1; number <= page + 1; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          setnumber(number);

          getCoupens(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }
  const getCoupens = async (number) => {
    const coupens = await instanceAdmin.get(`/getcoupen/${number}`);

    if (coupens.data) {
      setnumber(number);
      setcoupen(coupens.data.coupen);
      setpage(coupens.data.pageCount);
    }
  };
  

  // ===========================================edit coupen==========================================

  const editCoupen = (e) => {
    e.preventDefault();
    
    try {
      if (
        !editcoupen.coupenname ||
        !editcoupen.startdate ||
        !editcoupen.enddate ||
        !editcoupen.coupencode ||
        !editcoupen.offer||
        !editcoupen.limit
      )  return seterr("Cannot add empty fields");
    //   console.log(editcoupen)
    //     return seterr("Cannot add empty fields");
    //   const data = {
    //     editcoupen,
    //   };
    //   console.log(data);
    //   instanceAdmin.post("/editcoupen/", data).then((response) => {
    //     if (response) {
    //       seteditshow(false);
    //       swal("Updated coupen");
    //     }
    //     getCoupen();
    //   });
    // } catch (err) {}
    const data={
      editcoupen
    }
    console.log(editcoupen)
    instanceAdmin.post('/editcoupen',data).then((response)=>{
      if(response){
        seteditshow(false)
        swal("Updated coupen")
        getCoupen()
      }
    })
      }catch(err){
        
      }
  };
  
  // =================================================delete coupen==========================================
  const deleteCoupen = (id) => {
    try {
      const data = {
        id: id,
      };
      instanceAdmin.post("/deletecoupen", data).then((response) => {
        if (response) {
          swal("Deleted successfully");
          getCoupen();
        }
      });
    } catch (err) {}
  };
  //================================================ get coupen on load======================================
  const getCoupen = async () => {
    try {
      if (number) {
        const coupens = await instanceAdmin.get(`/getcoupen/${number}`);

        if (coupens.data) {
          setnumber(number);
          setcoupen(coupens.data.coupen);
          setpage(coupens.data.pageCount);
        }
      } else {
        const coupens = await instanceAdmin.get(`/getcoupen/${1}`);
        if (coupens.data) {
          console.log(coupens.data);

          setnumber(number);
          setcoupen(coupens.data.coupen);
          setpage(coupens.data.pageCount);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // ===================================================modal handle================================================
  const handleClose = () => {
    setshow(false);
  };
  const handleCloseEdit=()=>{
    seteditshow(false)
  }
  // ======================================================add coupen=================================================
  const addCoupen = async (e) => {
    e.preventDefault();
    try {
      const data = {
        addcoupen,
      };
      if (
        !addcoupen.coupenname ||
        !addcoupen.startdate ||
        !addcoupen.enddate ||
        !addcoupen.offer ||
        !addcoupen.coupencode ||
        !addcoupen.limit
      ) {
        const val1 = new Date(addcoupen.startdate);
        const val2 = new Date(addcoupen.enddate);
        if (val1.getTime() > val2.getTime()) {
          setdateenderr("Not valid");
        }
        seterr("Please fill all field");
      } else {
        console.log(data)
        if (!dateerror || !dateenderr || !err) {
          await instanceAdmin.post("/addcoupen", data).then((response) => {
            getCoupen();
            setaddcoupen({
              offername: "",
              startdate: "",
              enddate: "",
              offerprice: "",
              product: "",
              limit:null
            });
            swal("offer added successfully");
            setshow(false);
          });
        }
      }
    } catch (err) {}
  };
  // =============================================add date for coupen============================================
  const setStartDate = (e) => {
    console.log(e.target.value)
    const val = new Date();
    const val2 = new Date(e.target.value);

    if (val.getTime() > val2.getTime()) {
      setdateerr("your date is not valid");
    } else {
      setdateerr("");
    }
    seterr("");
    setaddcoupen((prev) => ({
      ...prev,
      startdate: e.target.value,
    }));
  };

  const setEndDate = (e) => {
    console.log(e.target.value)
    const val = new Date();
    const val2 = new Date(e.target.value);

    if (val.getTime() > val2.getTime()) {
      setdateenderr("your date is not valid");
    } else {
      setdateenderr("");
    }
    seterr("");
    setaddcoupen((prev) => ({
      ...prev,
      enddate: e.target.value,
    }));
  };
  // ============================================add date for edit========================================
  const setEditStartDate = (e) => {
    const val = new Date();
    const val2 = new Date(e.target.value);

    if (val.getTime() > val2.getTime()) {
      setdateerr("your date is not valid");
    } else {
      setdateerr("");
    }
    seterr("");
    seteditcoupen((prev) => ({
      ...prev,
      startdate: e.target.value,
    }));
  };

  const setEditEndDate = (e) => {
    const val = new Date();
    const val2 = new Date(e.target.value);

    if (val.getTime() > val2.getTime()) {
      setdateenderr("your date is not valid");
    } else {
      setdateenderr("");
    }
    seterr("");
    seteditcoupen((prev) => ({
      ...prev,
      enddate: e.target.value,
    }));
  };
  //============================================ add date for edit========================================
  useEffect(() => {
    getCoupen();
  }, []);

  return (
    <div>
      <div className="coupen_heading">
        <h3>Coupen managment</h3>
        <div className="coupen_search">
            <Form className="product_form">
              <FloatingLabel
                controlId="floatingInput"
                label="Search product......."
                className="mb-3"
              >
                <Form.Control
                  className="input_product"
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                  placeholder="Search product...."
                />
              </FloatingLabel>
            </Form>
            <Button
          onClick={() => {
            setshow(true);
          }}
        >
          Add new coupen
        </Button>
          </div>
       
      </div>
      <Table striped bordered hover variant="light" responsive>
        <thead>
          <tr>
            <th>Coupen name</th>
            <th>Coupen code</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Coupen offer</th>
            <th>Amaount above coupen can applay</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupen
            .filter((val) => {
              if (search === "") {
                return val;
              } else if (
                val.coupenname.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((data) => {
              return (
                <>
                  <tr>
                    <td>{data.coupenname}</td>
                    <td>{data.coupencode}</td>
                    <td>{data.startdate}</td>
                    <td>{data.enddate}</td>

                    <td>{data.offer}%</td>
                    <td>{data.limit}</td>
                    <td>
                      <EditIcon
                        onClick={() => {
                          seteditcoupen(data);
                          seteditshow(true)
                        }}
                      />
                      <DeleteIcon
                        onClick={() => {
                          deleteCoupen(data._id);
                        }}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </Table>
      <Pagination>{items}</Pagination>
      {/*============================================ add coupen ==========================================*/}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Coupen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Coupen name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Coupen name"
            value={addcoupen.coupenname}
            onChange={(e) => {
              seterr("");
              setaddcoupen((prev) => ({ ...prev, coupenname: e.target.value }));
            }}
          ></Form.Control>
          <Form onSubmit={addCoupen}>
            <Form.Label> Coupen code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Coupen name"
              value={addcoupen.coupencode}
              onChange={(e) => {
                seterr("");
                setaddcoupen((prev) => ({
                  ...prev,
                  coupencode: e.target.value,
                }));
              }}
            ></Form.Control>
            <Form.Label>Start date</Form.Label>
            {dateerror && <p>{dateerror}</p>}
            <Form.Control
              type="Date"
              placeholder="Start Date"
              value={addcoupen.startdate}
              onChange={setStartDate}
            ></Form.Control>
            {dateerr && <p>{dateerr}</p>}
            <Form.Label>End date</Form.Label>
            {dateerror && <p>{dateerror}</p>}
            <Form.Control
              type="Date"
              placeholder="End Date"
              value={addcoupen.enddate}
              onChange={setEndDate}
            ></Form.Control>
            {dateenderr && <p className="date__error__offer">{dateenderr}</p>}
            <Form.Label>Offer percentage</Form.Label>

            <Form.Control
              type="number"
              placeholder="Offer Price"
              value={addcoupen.offerprice}
              min={1}
              onChange={(e) => {
                seterr("");
                setaddcoupen((prev) => ({
                  ...prev,
                  offer: e.target.value,
                }));
              }}
            ></Form.Control>
             <Form.Label>Minimum amount to applay coupen</Form.Label>
             <Form.Control
              type="number"
              placeholder="Minimum amount to applay coupen"
              value={addcoupen.limit}
              min={1}
              onChange={(e) => {
                seterr("");
                setaddcoupen((prev) => ({
                  ...prev,
                  limit: e.target.value,
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
      </Modal>
      {/*======================================================= coupen edit================================================================== */}
      <Modal
        show={editshow}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Coupen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Coupen name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product name"
            value={editcoupen.coupenname}
            onChange={(e) => {
              seterr("");
              seteditcoupen((prev) => ({ ...prev, coupenname: e.target.value }));
            }}
          ></Form.Control>
          <Form onSubmit={editCoupen}>
            <Form.Label> Coupen code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Coupen name"
              value={editcoupen.coupencode}
              onChange={(e) => {
                seterr("");
                seteditcoupen((prev) => ({
                  ...prev,
                  coupencode: e.target.value,
                }));
              }}
            ></Form.Control>
             <Form.Label> Minimum amount to applay coupen</Form.Label>
             <Form.Control
              type="number"
              placeholder="Minimum amount to applay coupen"
              value={editcoupen.limit}
              min={1}
              onChange={(e) => {
                seterr("");
                seteditcoupen((prev) => ({
                  ...prev,
                  limit: e.target.value,
                }));
              }}
            ></Form.Control>
            <Form.Label>Start date</Form.Label>
            {dateerror && <p>{dateerror}</p>}
            <Form.Control
              type="Date"
              placeholder="Start Date"
              value={editcoupen.startdate}
              onChange={setEditStartDate}
            ></Form.Control>
            {dateerr && <p>{dateerr}</p>}
            <Form.Label>End date</Form.Label>
            {dateerror && <p>{dateerror}</p>}
            <Form.Control
              type="Date"
              placeholder="End Date"
              value={editcoupen.enddate}
              onChange={ setEditEndDate}
            ></Form.Control>
            {dateenderr && <p className="date__error__offer">{dateenderr}</p>}
            <Form.Label>Offer percentage</Form.Label>

            <Form.Control
              type="number"
              placeholder="Offer Price"
              value={editcoupen.offer}
              min={1}
              onChange={(e) => {
                seterr("");
                seteditcoupen((prev) => ({
                  ...prev,
                  offer: e.target.value,
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
      </Modal>
    </div>
  );
}

export default Coupen;

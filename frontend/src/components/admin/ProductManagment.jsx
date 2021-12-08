import React, { useState, useEffect, useContext } from "react";
import "./ProductManagment.css";
import { instanceAdmin } from "../../axios/axios";
import { CategoryContext } from "./CategoryManagment";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Context";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FloatingLabel,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";
import SpinContext from "../../context/spinnerContext";
import swal from "sweetalert";
function ProductManagment() {
  const [files, setfiles] = useState([]);
  const [categorys, setcategorys] = useState([]);
  const [product, setproduct] = useState("");
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [method, setmethod] = useState("");
  const [stock, setstock] = useState("");
  const [seller, setseller] = useState("");
  const [color, setcolor] = useState([]);
  const [small, setsmall] = useState("");
  const [medium, setmedium] = useState("");
  const [large, setlarge] = useState("");
  const [delivery, setdelivery] = useState("");
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [err, seterr] = useState();
  const [error, seterror] = useState();
  const [image1, setimage1] = useState();
  const [image2, setimage2] = useState();
  const [image3, setimage3] = useState();
  const [image4, setimage4] = useState();
  const [show, setShow] = useState(false);
  const [singlecolor, setsinglecolor] = useState("");
  const fileObj = [];
  const fileArray = [];
  const { spin, setspin } = useContext(SpinContext);
  const handleClose = () => setShow(false);
  const getAllCategory = async () => {
    setspin(true);
    const datas = await instanceAdmin.get("/getallcategory");
    if (datas) {
      setspin(false);

      setcategorys(datas.data);
    }
  };
  const { getLoggedIn } = useContext(AuthContext);
  const logoutAdmin = async () => {
    await instanceAdmin.get("/logout");
    await getLoggedIn();
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // const uploadMultipleFiles = (e) => {
  //   setfiles((prev) => [...prev, e.target.files]);
  // };

  const addImage = async (e) => {
    e.preventDefault();
    // if(files.length<4) return seterr("Please upload 4 files")
    if (
      !product ||
      !description ||
      !price ||
      !small ||
      !medium ||
      !large ||
      !category
    ) {
      seterror("Please fill required fields");
    } else {
      if (files.length < 4) return seterr("Please upload 4 files");

      let arrayOfYourFiles = [
        files[0][0],
        files[1][0],
        files[2][0],
        files[3][0],
      ];
      console.log(arrayOfYourFiles);

      const formData = new FormData();
      arrayOfYourFiles.forEach((file) => {
        formData.append("image", file);
      });

      setspin(true);

      await instanceAdmin.post("/addimage", formData).then((response) => {
        const images = response.data;
        console.log(images);

        const data = {
          product,
          category,
          subcategory,
          description,
          price,
          stock,
          seller,
          color,
          small,
          medium,
          large,
          delivery,
          images,
        };
        instanceAdmin.post("/addproduct", data).then((response) => {
          if (response) {
            setspin(false);
            navigate("/admin/product");
            swal("Added successfully");
          }
        });
      });
    }
  };

  return (
    <>
      {spin === true ? (
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="product_details_main">
          <div className="heading">
            <h1>Product managment</h1>
          </div>

          <div className="product_form">
            <div className="form_container">
              <Form onSubmit={addImage}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <FloatingLabel
                  controlId="floatingInput"
                  label="Product name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={product}
                    onChange={(e) => {
                      setproduct(e.target.value);
                    }}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3"
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                >
                  <option selected>select category</option>
                  {categorys.map((data) => {
                    return (
                      <option
                        onChange={(e) => {
                          setcategory(e.target.value);
                        }}
                      >
                        {data.category}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3"
                  onChange={(e) => {
                    setsubcategory(e.target.value);
                  }}
                >
                  <option selected>select subcategory</option>
                  {categorys
                    .filter((data) => {
                      if (data.category === category) return data;
                    })

                    .map((val) => {
                      return (
                        <>
                          {val.subcategory.map((data) => {
                            return <option>{data}</option>;
                          })}
                        </>
                      );
                    })}
                </Form.Select>
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    type="text"
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Price"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="name@example.com"
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => {
                      setprice(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3"
                  onChange={(e) => {
                    setdelivery(e.target.value);
                  }}
                >
                  <option selected>select method</option>

                  <option>Free</option>
                  <option>Paid</option>
                </Form.Select>

                <FloatingLabel
                  controlId="floatingnumber"
                  label="Seller"
                  className="mb-3"
                  type="text"
                  value={seller}
                  onChange={(e) => {
                    setseller(e.target.value);
                  }}
                >
                  <Form.Control type="text" placeholder="number" />
                </FloatingLabel>
                <Form.Label>Available size</Form.Label>
                <FloatingLabel
                  controlId="floatingnumber"
                  label="Small"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Password"
                    type="number"
                    value={small}
                    min="0"
                    onChange={(e) => {
                      setsmall(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingnumber"
                  label="Medium"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Password"
                    type="number"
                    value={medium}
                    min="0"
                    onChange={(e) => {
                      setmedium(e.target.value);
                    }}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingnumber"
                  label="Large"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Password"
                    type="number"
                    value={large}
                    min="0"
                    onChange={(e) => {
                      setlarge(e.target.value);
                    }}
                  />
                </FloatingLabel>
               
                <h6 className="add__color__main__div" style={{backgroundColor:"blue"}}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Add color
                </h6>
                {/* <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue="#563d7c"
              title="Choose your color"
              type="color"
              value={color}
              onChange={(e) => {
               
                setcolor(e.target.value);
              }}
            /> */}
             <div className="color__container">
                {color[0]
                  ? color.map((color) => {
                      return (
                       
                          <p
                            style={{
                              backgroundColor: `${color}`,
                              width: "20px",
                              height: "20px",
                            }}
                          >
                            {" "}
                          </p>
                       
                      );
                    })
                  : null}
                   </div>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Main image</Form.Label>

                  {err && <p style={{ color: "red" }}>{err}</p>}
                  <img id="img1" src={image1}></img>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      setimage1(URL.createObjectURL(e.target.files[0]));
                      setfiles((prev) => [...prev, e.target.files]);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Image 1</Form.Label>
                  <img id="img2" src={image2}></img>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      setimage2(URL.createObjectURL(e.target.files[0]));
                      setfiles((prev) => [...prev, e.target.files]);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Image 2</Form.Label>
                  <img id="img3" src={image3}></img>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      setimage3(URL.createObjectURL(e.target.files[0]));
                      setfiles((prev) => [...prev, e.target.files]);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Image 3</Form.Label>
                  <img id="img4" src={image4}></img>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      setimage4(URL.createObjectURL(e.target.files[0]));
                      setfiles((prev) => [...prev, e.target.files]);
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add colors</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Label htmlFor="exampleColorInput">
                  Available color
                </Form.Label>

                <Form.Control
                  type="color"
                  id="exampleColorInput"
                  defaultValue="#563d7c"
                  title="Choose your color"
                  type="color"
                  value={singlecolor}
                  onChange={(e) => {
                    setsinglecolor(e.target.value);
                  }}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setcolor((prev) => [...prev, singlecolor]);
                }}
              >
                Add color
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default ProductManagment;

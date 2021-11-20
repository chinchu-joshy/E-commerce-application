import React, { useState, useEffect, useContext } from "react";
import "./ProductManagment.css";
import { instanceAdmin } from "../../axios/axios";
import { CategoryContext } from "./CategoryManagment";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FloatingLabel, Button } from "react-bootstrap";

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
  const [color, setcolor] = useState("");
  const [small, setsmall] = useState("");
  const [medium, setmedium] = useState("");
  const [large, setlarge] = useState("");
  const [delivery, setdelivery] = useState("");
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [err, seterr] = useState()
  const [error, seterror] = useState()

  const fileObj = [];
  const fileArray = [];
  const getAllCategory = async () => {
    const datas = await instanceAdmin.get("/getallcategory");

    setcategorys(datas.data);
  };
  const { getLoggedIn } = useContext(AuthContext);
  const logoutAdmin = async () => {
    await instanceAdmin.get("/logout");
    await getLoggedIn();
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  const uploadMultipleFiles = (e) => {
    setfiles((prev) => [...prev, e.target.files]);
  };

  const addImage = async (e) => {
    e.preventDefault();
        if(files.length<4) return seterr("Please upload 4 files")
        //  if(!product || !description || !price || !stock || !small || ! medium || !large || !category) return seterror("Please fill required fields")
    let arrayOfYourFiles = [files[0][0], files[1][0], files[2][0], files[3][0]];
    console.log(arrayOfYourFiles);

    const formData = new FormData();
    arrayOfYourFiles.forEach((file) => {
      formData.append("image", file);
    });

    console.log(formData);

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
          navigate("/admin/product");
        }
      });
    });
  };

  return (
    <div className="product_details_main">
      <div className="heading">
        <h1>Product managment</h1>
      </div>

      <div className="product_form">
        <div className="form_container">
          <Form onSubmit={addImage}>
            
            {error && <p style={{color:"red"}}>{error}</p>}
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
                onChange={(e) => {
                  setlarge(e.target.value);
                }}
              />
            </FloatingLabel>
            <Form.Label htmlFor="exampleColorInput">Available color</Form.Label>
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue="#563d7c"
              title="Choose your color"
              type="color"
              value={color}
              onChange={(e) => {
                setcolor(e.target.value);
              }}
            />

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Main image</Form.Label>
              {err && <p style={{color:"red"}}>{err}</p>}
              <Form.Control type="file" onChange={uploadMultipleFiles} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image 1</Form.Label>
              <Form.Control type="file" onChange={uploadMultipleFiles} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image 2</Form.Label>
              <Form.Control type="file" onChange={uploadMultipleFiles} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image 3</Form.Label>
              <Form.Control type="file" onChange={uploadMultipleFiles} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ProductManagment;

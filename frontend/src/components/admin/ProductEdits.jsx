import React, { useState, useEffect } from "react";
import "./ProductEdit.css";
import { instanceAdmin } from "../../axios/axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, FormControl, FloatingLabel, Button } from "react-bootstrap";
import swal from 'sweetalert'
function ProductEdits(props) {
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
  const [image1, setimage1] = useState();
  const [image2, setimage2] = useState();
  const [image3, setimage3] = useState();
  const [image4, setimage4] = useState();
  const [Image, setImage] = useState({});
  const [id, setid] = useState();
  const [del, setdel] = useState(false)
  const navigate = useNavigate();

  const getAllCategory = async () => {
    const datas = await instanceAdmin.get("/getallcategory");

    setcategorys(datas.data);
  };

  const editProduct = async () => {
    const data = props.value;

    await instanceAdmin.get(`/editproducts/${data}`).then((response) => {
      setcategory(response.data[0].category);
      setsubcategory(response.data[0].subcategory);
      setproduct(response.data[0].productname);
      setdelivery(response.data[0].deliverymethod);
      setdescription(response.data[0].description);
      setprice(response.data[0].price);
      setseller(response.data[0].seller);
      setcolor(response.data[0].color);
      setsmall(response.data[0].small);
      setmedium(response.data[0].medium);
      setlarge(response.data[0].large);
      setid(response.data[0]._id);
      setimage1(response.data[0].url[0].image1);
      setimage2(response.data[0].url[0].image2);
      setimage3(response.data[0].url[0].image3);
      setimage4(response.data[0].url[0].image4);
    });
  };
  const uploadImage1 = async (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);

    const formData = new FormData();

    formData.append("image", Image);

    console.log(formData);
    await instanceAdmin
      .post("/addeditedimage", formData)
      .then((response) => {
        setimage1(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImage2 = async (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);

    const formData = new FormData();

    formData.append("image", Image);

    console.log(formData);
    await instanceAdmin
      .post("/addeditedimage", formData)
      .then((response) => {
        setimage2(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadImage3 = async (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);

    const formData = new FormData();

    formData.append("image", Image);

    console.log(formData);
    await instanceAdmin
      .post("/addeditedimage", formData)
      .then((response) => {
        setimage3(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const uploadImage4 = async (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);

    const formData = new FormData();

    formData.append("image", Image);

    console.log(formData);
    await instanceAdmin
      .post("/addeditedimage", formData)
      .then((response) => {
        setimage4(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const redirectPage=()=>{
    navigate("/admin/product");
  }
  const editData = async (e) => {
    e.preventDefault();
    const data = {
      product,
      category,
      subcategory,
      description,
      price,
      id,

      seller,
      color,
      small,
      medium,
      large,
      delivery,
      image4,
      image1,
      image2,
      image3,
    };
    await instanceAdmin.post("/editproduct", data).then((response) => {
      if (response) {
        navigate("/admin/product");
      }
    });
  };
  useEffect(() => {
    editProduct();
    getAllCategory();
  }, []);
  return (
    <div className="product_edit_page">
      <h1>Edit product</h1>
      
        <Button className="cancel_edit" onClick={redirectPage}>Cancel</Button>
      <Form onSubmit={editData}>
        <FloatingLabel
          controlId="floatingInput"
          label="Product name"
          className="mb-3"
          onSubmit={editData}
        >
          <Form.Control
            type="text"
            defaultValue={product}
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
            type="text"
            defaultValue={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
          <Form.Control
            type="number"
            placeholder="name@example.com"
            type="number"
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
        <img id="img1" src={image1}></img>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Main image</Form.Label>
          <Form.Control type="file" name="image" onChange={uploadImage1} />
        </Form.Group>
        <img id="img1" src={image2}></img>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image 1</Form.Label>
          <Form.Control type="file" name="image" onChange={uploadImage2} />
        </Form.Group>
        <img id="img1" src={image3}></img>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image 2</Form.Label>
          <Form.Control type="file" name="image" onChange={uploadImage3} />
        </Form.Group>
        <img id="img1" src={image3}></img>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image 3</Form.Label>
          <Form.Control type="file" name="image" onChange={uploadImage4} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ProductEdits;

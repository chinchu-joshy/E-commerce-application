import React, { useState, useEffect, useContext } from "react";
import { instanceAdmin } from "../../axios/axios";
import { Link } from "react-router-dom";
import "./ProductShowPage.css";
import AuthContext from "../../context/Context";
import { Table } from "react-bootstrap";
import Home from "./Home";
import { Form, FormControl, FloatingLabel, Button } from "react-bootstrap";
import swal from 'sweetalert'


function ProductShowPage() {
  const [product, setproduct] = useState([]);
  const [search, setsearch] = useState("");
  const [state, setstate] = useState(false)
 
  const getAllProduct = async () => {
    const product = await instanceAdmin.get("/gettallproducts");
    setproduct(product.data);
    console.log(product.data);
  };
  const deleteProduct = (id) => {
    const data = {
      id: id,
    };
    instanceAdmin.post("/deleteproduct", data).then((response) => {
      console.log(response);
      setstate(true)
    });
  };
  const { getLoggedIn } = useContext(AuthContext);
  const logoutAdmin = async () => {
    await instanceAdmin.get("/logout");
    await getLoggedIn();
  };

  useEffect(() => {
    getAllProduct();
  }, [state]);
  return (
    <div className="main_head_product_view">
      <h1>Product managment</h1>
      <div className="search">
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Search product"
            className="mb-3"
          >
            <Form.Control
              type="search"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              placeholder="Search product"
            />
          </FloatingLabel>
        </Form>
      </div>

      <div className="head">
        <Link style={{ textDecoration: "none" }} to="/admin/addproduct">
          <p className="add_product">Add Products</p>
        </Link>
      </div>
      <div>
        <Table className="product_table" striped bordered hover variant="light">
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {product
            .filter((val) => {
              if (search === "") {
                return val;
              } else if (
                val.productname.toLowerCase().includes(search.toLowerCase())
              ) {
                return val;
              }
            })
            .map((product) => {
              return (
                <tr>
                  <td>
                    <img id="image_product" src={product.url[0].image1}></img>
                  </td>
                  <td>{product.productname}</td>
                  <td>{product.price}</td>
                  <td>{product.totalnumber}</td>
                  <td>
                    <Link
                      style={{ textDecoration: "none", color: "blue" }}
                      to={`/admin/editproduct/${product._id}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="delete-product"
                      onClick={() => {
                        swal({
                          title: "Are you sure?",
                          text: "Once deleted, you will not be able to recover this imaginary file!",
                          
                          buttons: true,
                          dangerMode: true,
                        }).then((willDelete) => {
                          if (willDelete) {
                            deleteProduct(product._id);
                            swal(
                              "Poof! Your file has been deleted!",
                              {}
                            );
                          } else {
                            swal("Your file is safe!");
                          }
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </Table>
      </div>
    </div>
  );
}

export default ProductShowPage;

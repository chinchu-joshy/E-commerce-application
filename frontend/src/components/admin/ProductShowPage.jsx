import React, { useState, useEffect, useContext } from "react";
import { instanceAdmin } from "../../axios/axios";
import { Link } from "react-router-dom";
import "./ProductShowPage.css";
import AuthContext from "../../context/Context";
import { Table } from "react-bootstrap";
import Home from "./Home";
import {
  Form,
  FormControl,
  FloatingLabel,
  Button,
  Spinner,
  Pagination,
} from "react-bootstrap";
import swal from "sweetalert";
import SpinContext from "../../context/spinnerContext";

function ProductShowPage() {
  const [product, setproduct] = useState([]);
  const [search, setsearch] = useState("");
  const [state, setstate] = useState(false);
  const { spin, setspin } = useContext(SpinContext);

  const [page, setpage] = useState("");
  const [number, setnumber] = useState("");

  let active = 1;
  let items = [];

  for (let number = 1; number <= page + 1; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          setnumber(number);
          getProductbyPages(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }
  const getProductbyPages = async (number) => {
    setspin(true);
    const product = await instanceAdmin.get(`/getproductpage/${number}`);

    if (product.data) {
      setspin(false);
      setnumber(number);
      setproduct(product.data.products);
      setpage(product.data.pageCount)
    }
  };
  const getProductbyPage = async () => {
    setspin(true);
    try {
      if (number) {
        const product = await instanceAdmin.get(`/getproductpage/${number}`);

        if (product.data) {
          setspin(false);
          setnumber(number);
          setproduct(product.data.products);
          setpage(product.data.pageCount)
        }
      } else {
        setspin(true);
        const product = await instanceAdmin.get("/gettallproducts");
        if (product.data) {
          setproduct(product.data.products);
          setpage(product.data.pageCount);
          // console.log(product.data);
          setspin(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProduct = async () => {
    setspin(true);
    const product = await instanceAdmin.get("/gettallproducts");
    if (product.data) {
      setproduct(product.data);
      console.log(product.data);
      setspin(false);
    }
  };
  const deleteProduct = (id) => {
    setspin(true);
    const data = {
      id: id,
    };
    instanceAdmin.post("/deleteproduct", data).then((response) => {
      if (response.data) {
        console.log(response);
        setstate(true);
        setspin(false);
      }
    });
  };
  const { getLoggedIn } = useContext(AuthContext);
  const logoutAdmin = async () => {
    await instanceAdmin.get("/logout");
    await getLoggedIn();
  };

  useEffect(() => {
    getProductbyPage();
  }, [state]);
  return (
    <>
      {spin === true ? (
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="main_head_product_view">
          <h1>Product managment</h1>
          <div className="head">
            <Link style={{ textDecoration: "none" }} to="/admin/addproduct">
              <Button className="add_product">Add Products</Button>
            </Link>
          </div>
          <div className="searchs">
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
          </div>

          <div className="table_product_container">
            <Table
              className="product_table"
              striped
              bordered
              hover
              variant="light"
            >
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
                        <img
                          id="image_product"
                          src={product.url[0].image1}
                        ></img>
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
                                swal("Poof! Your file has been deleted!", {});
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
            <div>
              <Pagination>{items}</Pagination>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductShowPage;

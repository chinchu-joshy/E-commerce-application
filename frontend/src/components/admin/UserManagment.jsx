import React, { useEffect, useState, useContext } from "react";
import "./UserManagment.css";
import { instanceAdmin } from "../../axios/axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Context";
import { Table } from "react-bootstrap";
import Home from "./Home";

import { Button, Form, FormControl, FloatingLabel } from "react-bootstrap";

function UserManagment() {
  const [userdata, setuserdata] = useState([]);
  const [state, setstate] = useState(null);
  const [search, setsearch] = useState("");
  const blockUser = (id) => {
    const data = {
      userId: id,
    };
    instanceAdmin.post("/blockUser", data).then((response) => {
      setstate(response.data.state);
    });
  };
  async function getData() {
    const user = await instanceAdmin.get("/getuser");
    console.log(user.data);
    setuserdata(user.data);
  }
  useEffect(() => {
    getData();
  }, [state]);

  const { getLoggedIn } = useContext(AuthContext);
  const logoutAdmin = async () => {
    await instanceAdmin.get("/logout");
    await getLoggedIn();
  };

  return (
    <div className="admin_home_page">
      <div className="user_managment">
        <div className="user_management_head">
          <div className="head">
            <h1>User Managment</h1>
          </div>
          <div className="search">
            <Form>
              <FloatingLabel
                controlId="floatingInput"
                label="Search user"
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
          <div className="table">
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Block/Unblock</th>
                </tr>
              </thead>
              <tbody>
                {userdata
                  .filter((val) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val.username.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((user) => {
                    console.log(user);
                    return (
                      <tr>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <Button
                            className={
                              user.state === true ? "block" : "unblock"
                            }
                            onClick={() => blockUser(user._id)}
                          >
                            {user.state === true ? "Block" : "Unblock"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagment;

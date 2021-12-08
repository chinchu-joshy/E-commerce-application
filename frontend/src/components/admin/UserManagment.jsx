import React, { useEffect, useState, useContext } from "react";
import "./UserManagment.css";
import { instanceAdmin } from "../../axios/axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Context";
import { Table,Pagination } from "react-bootstrap";
import Home from "./Home";

import { Button, Form, FormControl, FloatingLabel ,Spinner} from "react-bootstrap";
import SpinContext from "../../context/spinnerContext";

function UserManagment() {
  const [userdata, setuserdata] = useState([]);
  const [state, setstate] = useState(null);
  const [search, setsearch] = useState("");
  const {spin,setspin} = useContext(SpinContext)
const [page, setpage] = useState('')
const [number, setnumber] = useState('')
const [alert, setalert] = useState('')


  let active = 1;
let items = [];

for (let number = 1; number <= page+1; number++) {
 
  items.push(
    
    <Pagination.Item key={number} active={number === active} onClick={()=>{
      
setnumber(number)
      getUserbyPages(number)
    }}>
    {number}
    </Pagination.Item>,
  );
}
const getUserbyPages=async(number)=>{
  setspin(true)
  const user=await instanceAdmin.get(`/getuserpage/${number}`)
    
  if(user.data) { 
    setspin(false)
    setnumber(number)
    setuserdata(user.data.users)
    // setpage(user.data.pageCount)
    }
}
const getUserbyPage=async()=>{
  
 
  setspin(true)
  try{
    if(number){
    const user=await instanceAdmin.get(`/getuserpage/${number}`)
    
    if(user.data) { 
      setspin(false)
       setnumber(number)
      setuserdata(user.data.users);
      // setpage(user.data.pageCount)
      }
  }else{
   
    const user=await instanceAdmin.get("/getuser")
    if(user.data) { setspin(false)
        setnumber(number)
        setuserdata(user.data.users);
        setpage(user.data.pageCount)
        }
  }
  }catch(err){
    console.log(err)
  }
 
 

}

  const blockUser = (id) => {
    const data = {
      userId: id,
    };
    instanceAdmin.post("/blockUser", data).then((response) => {
      console.log(number)
      
      setstate(response.data.state);
    });
  };
  // async function getData() {
  //   setspin(true)
  //   const user = await instanceAdmin.get("/getuser");
  //   if(user.data) { setspin(false)
  //   console.log(user.data.users);
  //   setuserdata(user.data.users);
  //   setpage(user.data.pageCount)
  //   }
  // }
  useEffect(() => {
    getUserbyPage();
  }, [state]);

  const { getLoggedIn } = useContext(AuthContext);
  const logoutAdmin = async () => {
    await instanceAdmin.get("/logout");
    await getLoggedIn();
  };

  return (
    <>
    <div className="admin_home_page">
      <div className="user_managment">
        <div className="user_management_head">
          <div className="head">
            <h1>User Managment</h1>
          </div>
          <div className="search">
            <Form className="product_form">
              <FloatingLabel
                controlId="floatingInput"
                label="Search user......"
                className="mb-2 "
              >
                <Form.Control
                  type="search"
                  className="input_product"
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
            <Table striped bordered hover variant="light" responsive>
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
                    } 
                    else if (
                      val.username.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    }
                    
                  })
                  .map((user) => {
                  
                      return (
                        <>
                       
                       {user ?
                        <tr>
                          {console.log('user')}
                           {console.log(user)}
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
                        </tr>:<tr>{ console.log('kokkachi2')}<td>No user found</td></tr>}
                     
                     </> )
                    
                    //  return(<p style={{color:"red"}}>Not found</p>)
                   
                  })}
              </tbody>
            </Table>
          </div>




          <div>
    <Pagination>{items}</Pagination>
    
  </div>






        </div>
      </div>
    </div>
    
    </>
  );
}

export default UserManagment;

import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  useContext,
} from "react";
import AddnewCategory from "./AddnewCategory";
import AddnewSubcategory from "./AddnewSubcategory";
import { instanceAdmin } from "../../axios/axios";
import "./CategoryManagment.css";
import EditCategory from "./EditCategory";
import Editsubcatagory from "./EditSubCategory";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Context";
import { Button } from "react-bootstrap";
import swal from 'sweetalert'

export const CategoryContext = createContext();
function CategoryManagment() {
  const [confirm, setconfirm] = useState({
    show:false
  })
  const [addcatagory, setaddcatagory] = useState(false);
  const [addsubcatagory, setsubaddcatagory] = useState(false);
  const [editcatagory, seteditcatagory] = useState({
    value: false,
    category: "",
  });
  const [editsubcatagory, seteditsubcatagory] = useState({
    value: false,
    category: "",
    subcategory: "",
  });
  const [fulldata, setfulldata] = useState([]);
  const [state, setstate] = useState(false);
  const ref = useRef("");
  const addCategory = () => {
    setaddcatagory(!addcatagory);
  };
  const addSubCategory = () => {
    setsubaddcatagory(!addsubcatagory);
  };
  const editCategory = (data) => {
    seteditcatagory({ value: true, category: data });
  };
  const editSubCategory = (category, subcategory) => {
    console.log(category, subcategory);
    seteditsubcatagory({
      value: true,
      category: category,
      subcategory: subcategory,
    });
  };
  const getAllCategory = async () => {
    const datas = await instanceAdmin.get("/getallcategory");
    console.log(datas.data);
    setfulldata(datas.data);
  };
  const deleteCategory = async (value) => {
    const data = {
      category: value,
    };

    await instanceAdmin.post("/deletecategory", data).then((response) => {
      setstate(!state);
    });
  };
  const deleteSubCategory = async (main, sub) => {
    const data = {
      category: main,
      subcategory: sub,
    };
    await instanceAdmin.post("/deletesubcategory", data).then((response) => {
      setstate(!state);
    });
  };

  const { getLoggedIn } = useContext(AuthContext);
  const logoutAdmin = async () => {
    await instanceAdmin.get("/logout");
    await getLoggedIn();
  };

  useEffect(() => {
    ref.current = state;
    getAllCategory();
  }, [state]);
  return (

    <div className="admin_home_page">
      <div>
        <div className="user_category_head">
          <div className="head">
            <h1>Category Managment</h1>
          
            
          </div>
          <div className="add_category">
            <Button onClick={addCategory}>Add new Category</Button>
            <Button onClick={addSubCategory}>Add new Sub Category</Button>
          </div>
          <div className="table">
         
     
            <Table striped bordered hover variant="light">
              <tr>
                <th>Category</th>
                <th>Sub Category</th>
              </tr>
              {/* {userdata.map((user)=>{
              console.log(user)
            return( */}
              {fulldata.map((data) => {
                return (
                  <tr>
                    <td>
                      <ul className="list">
                        <li>
                          <div>
                            <p>{data.category}</p>

                            <Button
                              className="edit_category"
                              onClick={() => {
                                editCategory(data.category);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className="delete_category"
                              onClick={() => {
                                swal({
                                  title: "Are you sure?",
                                  text: "Once deleted, you will not be able to recover !",
                                  
                                  buttons: true,
                                  dangerMode: true,
                                }).then((willDelete) => {
                                  if (willDelete) {
                                    deleteCategory(data.category);
                                    swal(
                                      "Poof! Your category has been deleted!",
                                      {}
                                    );
                                  } else {
                                    swal("Your content is safe!");
                                  }
                                });
                                
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <ol>
                        {data.subcategory.map((value) => {
                          return (
                            <li>
                              <div>
                                <p>{value}</p>
                                <Button
                                  className="edit_category"
                                  onClick={() => {
                                    editSubCategory(data.category, value);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  className="delete_category"
                                  onClick={() => {
                                    swal({
                                      title: "Are you sure?",
                                      text: "Once deleted, you will not be able to recover!",
                                      
                                      buttons: true,
                                      dangerMode: true,
                                    }).then((willDelete) => {
                                      if (willDelete) {
                                        deleteSubCategory(data.category, value);
                                        swal(
                                          "Poof! Your sub category has been deleted!",
                                          {}
                                        );
                                      } else {
                                        swal("Your content is safe!");
                                      }
                                    });
                                    
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </td>
                  </tr>
                );
              })}
            </Table>
          </div>
        </div>
      </div>

      <CategoryContext.Provider value={getAllCategory}>
        <AddnewCategory
          value={addcatagory}
          changeState={setaddcatagory}
        ></AddnewCategory>
        <AddnewSubcategory
          value={addsubcatagory}
          changeState={setsubaddcatagory}
        ></AddnewSubcategory>
        <EditCategory
          value={editcatagory}
          changeState={seteditcatagory}
        ></EditCategory>
        <Editsubcatagory
          value={editsubcatagory}
          changeState={seteditsubcatagory}
        ></Editsubcatagory>
      </CategoryContext.Provider>
    </div>
  );
}

export default CategoryManagment;

import React, { useState, useRef, useContext, useEffect } from "react";
import "./Category.css";
import { instanceAdmin } from "../../axios/axios";
import { CategoryContext } from "./CategoryManagment";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
function EditSubCategory(props) {
  const [subcategory, setsubcategory] = useState("");
  const category = props.value.category;
  const value = props.value.value;
  const Subcategory = props.value.subcategory;
  const change = props.changeState;
  const [state, setstate] = useState(false);
  const [err, seterr] = useState('')
  const ref = useRef("");
  const val = useRef("");
  const getAllCategory = useContext(CategoryContext);
  const close = () => {
    change({ value: false, category: "" });
    seterr('')
  };
  const editSubcategory = async (e) => {
    e.preventDefault();

    const data = {
      newsubcategory: subcategory,
      category: category,
      oldsubcategory: Subcategory,
    };
    if (!subcategory || !category) return seterr("Nothing entered to edit");
    await instanceAdmin.post("/editsubcategory", data).then((response) => {
      if(response){
        change({});
        setstate(!state);
        seterr('')
        setsubcategory("");
      }
      
    });
  };
  useEffect(() => {
    ref.current = state;
    getAllCategory();
  }, [state]);
  return (
    <div
      id={
        value === true ? "edit_subcategory_head" : "edit_subcategory_head_none"
      }
    >
      <p className="sub" onClick={close}>
        <HighlightOffIcon />
      </p>
      <form action="" onSubmit={editSubcategory}>
        <p>{category}</p>
        <input type="text" defaultValue={category} hidden />
        <input
          type="text"
          value={subcategory}
          defaultValue={Subcategory}
          onChange={(e) => {
            setsubcategory(e.target.value);
            seterr('')
          }}
        />
        <button type="submit">edit</button>
        {err && <p>{err}</p>}
      </form>
    </div>
  );
}

export default EditSubCategory;

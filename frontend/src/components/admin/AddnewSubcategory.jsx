import React,{useState,useEffect,useContext,useRef} from "react";
import { instanceAdmin } from "../../axios/axios";
import "./Category.css";
import { CategoryContext } from "./CategoryManagment";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
function AddnewSubcategory(props) {
    var value=props.value
     var change=props.changeState
    const [subcategory, setsubcategory] = useState('')
    const [category, setcategory] = useState([])
    const [selection, setselection] = useState('')
    const [err, seterr] = useState(null)
    const [state, setstate] = useState(false)
    const ref = useRef('')
    const getAllCategory = useContext(CategoryContext)
    const getCategory=async()=>{
          let datas=await instanceAdmin.get('/getcategory')
          
          setcategory(datas.data)

    }
    const addSubcategory=async(e)=>{
        const data={
            category:selection,
            subcategory:subcategory
        }
        e.preventDefault()
        if(!selection || !subcategory) return seterr("Please fill the empty field")
        await instanceAdmin.post('/addsubcategory',data).then((response)=>{
            change(false)
            setselection('')
            setcategory([])
            setsubcategory('')
           

        })

    }
    const close=()=>{
        change(false)
        seterr('')
    }
    

    useEffect(() => {
        getCategory()
        getAllCategory()
       
    }, [value])

  return (
    <div className={value===true ? "add_subcategory_head":"add_subcategory_head_none"}>
     <p className="closing_btn" onClick={close}><HighlightOffIcon/></p>
      <form action="" onSubmit={addSubcategory}>
         
        <label for="cars">Choose a category:</label>

        <select className="category_selection_bar"  value={selection}  onChange={(e)=>{
            setselection(e.target.value)
            seterr('')
        }}>
              <option selected>select category</option>
            {category.map((value)=>{
                return(
                  
<option value={value._id}>{value._id}</option>
                )
            })}
          
        </select>
        <input type="text" value={subcategory} placeholder="Enter new category" onChange={(e)=>{
            setsubcategory(e.target.value)
            seterr('')
        }}/>
        <button>add</button>
        {err && <p>{err}</p>}
      </form>
    </div>
  );
}

export default AddnewSubcategory;

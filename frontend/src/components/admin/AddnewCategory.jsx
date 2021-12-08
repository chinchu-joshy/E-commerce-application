import React,{useState,useEffect,useRef,useContext} from 'react'
import './Category.css'
import { instanceAdmin } from '../../axios/axios'
import { Navigate } from 'react-router'
import { CategoryContext } from './CategoryManagment'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
function AddnewCategory(props) {
     var value=props.value
     var change=props.changeState
    const [categorys, setcategory] = useState('')
    const [err, seterr] = useState(null)
    const [state, setstate] = useState(false)
    const ref = useRef('')
    const getAllCategory=useContext(CategoryContext)
    const addCategory=(e)=>{
        seterr('')
        setcategory(e.target.value)
    }
    const submitCategory=async(e)=>{
        const data={
            category:categorys
        }
        e.preventDefault()
        if(!categorys) return seterr("Please fill the empty field")
        await instanceAdmin.post('/addcategory',data).then((response)=>{
            if(response){
                setcategory('')
                setstate(!state)
                change(false)
            }
            
        
        // setstate(!state)
            
        })

    }
    const close=()=>{
        change(false)
    }
    useEffect(() => {
        ref.current=state
        getAllCategory()
       
    }, [state])
    
    return (
        <div className={value===true ? "add_category_head":"add_category_head_none"}>
             <p className="closing_btn" onClick={close}><HighlightOffIcon/></p>
            <form action="" onSubmit={submitCategory}>
               
                <input type="text" placeholder="Enter new category" value={categorys} onChange={addCategory}/>
                <button>Add</button>
                {err && <p>{err}</p>}
            </form>
        </div>
    )
}
export default AddnewCategory;

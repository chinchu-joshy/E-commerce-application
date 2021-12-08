import React,{useState,useEffect,useContext,useRef} from 'react'
import './Category.css'
import { instanceAdmin } from '../../axios/axios'
import { CategoryContext } from './CategoryManagment'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
function EditCategory(props) {
    const [categorys, setcategorys] = useState('')
    const [err, seterr] = useState('')
    const category=props.value.category
    const value=props.value.value
    const change=props.changeState
    const [state, setstate] = useState(false)
    const ref = useRef('')
    const getAllCategory = useContext(CategoryContext)
    const close=()=>{
        change({value:false,
            category:''})
            seterr('')
    }
    const editValue=async(e)=>{
        e.preventDefault()
        const data={
            newcategory:categorys,
            oldcategory:category
        }
        if(!categorys) return seterr("No value entered")
        
           
           
       instanceAdmin.post('/editcategory',data).then((response)=>{
          
           if(response){
               
            
            change({value:false,
                category:''})
                seterr('')
                setstate(!state)
                setcategorys(" ")
           }
       
       }) 
        
    }
    useEffect(() => {
        ref.current=state
        getAllCategory() 
    }, [state])
    return (
        <div className={value===true ? "edit_category_head":"edit_category_head_none"}>
             <p className="category_head_err" onClick={close}><HighlightOffIcon/></p>
            <form action="" onSubmit={editValue}>
                <input type="text" value={categorys}  defaultValue={category}  onChange={(e)=>{
setcategorys(e.target.value)
seterr('')
                }}/>
                <button type="submit">edit</button>
                {err && <p>{err}</p>}
            </form>
        </div>
    )
}

export default EditCategory

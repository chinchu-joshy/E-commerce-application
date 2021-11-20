import React,{useState,useEffect,useContext,useRef} from 'react'
import './Category.css'
import { instanceAdmin } from '../../axios/axios'
import { CategoryContext } from './CategoryManagment'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
function EditCategory(props) {
    const [categorys, setcategorys] = useState('')
    const category=props.value.category
    const value=props.value.value
    const change=props.changeState
    const [state, setstate] = useState(false)
    const ref = useRef('')
    const getAllCategory = useContext(CategoryContext)
    const close=()=>{
        change({value:false,
            category:''})
    }
    const editValue=async(e)=>{
        e.preventDefault()

        console.log(categorys)
        if(!categorys) return null
            const data={
                newcategory:categorys,
                oldcategory:category
            }
           
       instanceAdmin.post('/editcategory',data).then((response)=>{
        change({value:false,
            category:''})
            setcategorys('')
            setstate(!state)
       }) 
        
    }
    useEffect(() => {
        ref.current=state
        getAllCategory() 
    }, [state])
    return (
        <div className={value===true ? "edit_category_head":"edit_category_head_none"}>
             <p onClick={close}><HighlightOffIcon/></p>
            <form action="" onSubmit={editValue}>
                <input type="text" defaultValue={categorys} onChange={(e)=>{
setcategorys(e.target.value)
                }}/>
                <button type="submit">edit</button>
            </form>
        </div>
    )
}

export default EditCategory

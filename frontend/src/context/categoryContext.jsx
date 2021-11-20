import React,{useState,useEffect,useContext,createContext} from 'react'
import { instanceAdmin } from '../axios/axios'
const CategoryContext=createContext();
function CategoryContextProvider({children}) {
    const [category, setcategory] = useState(undefined)
    async function getCategory(){
       const CategoryResult= await instanceAdmin.get('/getallcategory')
      
       setcategory(loggedResult.data.status)
    }
// useEffect(() => {
//    getCategory()
// }, [])
    return <CategoryContext.Provider value={{category,getCategory}}>
        {children}
    </CategoryContext.Provider>
}

export default CategoryContext;
export  {CategoryContextProvider};

import React,{useState,useEffect,useContext,createContext} from 'react'
import { instance } from '../axios/axios'
const UserContext=createContext();
function UserContextProvider({children}) {
    const [details, setdetails] = useState([])
    async function getUser(){
        console.log("called")
       const UserResult= await instance.get('/getuserdata')
          console.log("end")
       setdetails(UserResult.data)
    }
useEffect(() => {
    getUser()
}, [])
    return <UserContext.Provider value={{details,getUser,setdetails}}>
        {children}
    </UserContext.Provider>
}

export default UserContext;
export  {UserContextProvider};
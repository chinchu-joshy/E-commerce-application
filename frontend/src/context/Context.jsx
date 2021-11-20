import React,{useState,useEffect,useContext,createContext} from 'react'
import { instanceAdmin } from '../axios/axios'
const AuthContext=createContext();
function AuthContextProvider({children}) {
    const [logged, setlogged] = useState(undefined)
    async function getLoggedIn(){
       const loggedResult= await instanceAdmin.get('/logged')
      
       setlogged(loggedResult.data.status)
    }
useEffect(() => {
   getLoggedIn()
}, [])
    return <AuthContext.Provider value={{logged,getLoggedIn}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;
export  {AuthContextProvider};

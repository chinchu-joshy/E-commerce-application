import React,{useState,useEffect,useContext,createContext} from 'react'
import { instance } from '../axios/axios'
const AuthUserContext=createContext();
function AuthUserContextProvider({children}) {
    const [userlogged, setuserlogged] = useState(undefined)
    async function getUserLoggedIn(){
       const loggedResult= await instance.get('/logged')
       
       setuserlogged(loggedResult.data.status)
    }
useEffect(() => {
   getUserLoggedIn()
}, [])
    return <AuthUserContext.Provider value={{userlogged,getUserLoggedIn}}>
        {children}
    </AuthUserContext.Provider>
}

export default AuthUserContext;
export  {AuthUserContextProvider};

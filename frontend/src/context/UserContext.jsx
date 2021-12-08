import React,{useState,useEffect,useContext,createContext} from 'react'
import { instance } from '../axios/axios'
const AuthUserContext=createContext();
function AuthUserContextProvider({children}) {
    const [userlogged, setuserlogged] = useState(undefined)
    const [username, setusername] = useState({})
    async function getUserLoggedIn(){
       const loggedResult= await instance.get('/logged')
        console.log(loggedResult)
       setuserlogged(loggedResult.data.status)
       setusername(loggedResult.data.user)
    }
useEffect(() => {
   getUserLoggedIn()
}, [])
    return <AuthUserContext.Provider value={{userlogged,getUserLoggedIn,username}}>
        {children}
    </AuthUserContext.Provider>
}

export default AuthUserContext;
export  {AuthUserContextProvider};

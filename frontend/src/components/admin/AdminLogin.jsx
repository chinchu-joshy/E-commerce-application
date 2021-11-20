import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/Context'
import { instanceAdmin,instance } from '../../axios/axios'
import './AdminLogin.css'
function AdminLogin() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState('')
    const { getLoggedIn} =useContext(AuthContext)
    const [loading, setloading] = useState(false)
    const addEmail=(e)=>{
        seterror('')
        setemail(e.target.value)
    }
    const addPassword=(e)=>{
        seterror('')
          setpassword(e.target.value)
    }
    const adminLogin=async(e)=>{
        e.preventDefault()
        try{
            const data={
                email:email,
                password:password
            }
           await instanceAdmin.post('/login',data).then(async(response)=>{
               
               if(response.data.error) seterror(response.data.error) 
              await getLoggedIn()
              setloading(true)

           })
        }
        catch(err){
            console.log(err)
        }
    }
    return (
       
        <div className='admin_main_page'>
           <form className="admin_login_form" onSubmit={adminLogin}>
           <input type="email" value={email} placeholder="Email" onChange={addEmail}></input>
            <input type="password" value={password} placeholder="Password" onChange={addPassword}></input>
            <button type='submit'>Login</button>
            {error && <p>{error}</p>}
           </form>
        </div>
    )
}
export default AdminLogin

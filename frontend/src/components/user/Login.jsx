import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/Context'
import { instance } from '../../axios/axios'
import { Link ,useHistory} from 'react-router-dom'
import './Login.css'
import AuthUserContext from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
function AdminLogin() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState('')
    const {getUserLoggedIn}=useContext(AuthUserContext)
    const navigate=useNavigate()
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
           await instance.post('/login',data).then(async(response)=>{
               
               if(response.data.error) {
                   seterror(response.data.error) 
               
            }else{
                 
                await getUserLoggedIn()
            }
               


           })
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className='user_main_page'>
            
           <form className="user_login_form" onSubmit={adminLogin}>
           <h3>Login</h3>
           <input type="email" value={email} placeholder="Email" onChange={addEmail}></input>
            <input type="password" value={password} placeholder="Password" onChange={addPassword}></input>
         
            <Button className="login_button" type='submit'>Login</Button>
            {error && <p>{error}</p>}
            <Link to='/register'>Signup</Link>
           </form>
        </div>
    )
}
export default AdminLogin

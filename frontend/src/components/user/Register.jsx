import React,{useState} from 'react'
// import {useHistory} from 'react-router-dom'
import { instance } from '../../axios/axios'
import {useNavigate} from 'react-router-dom'
function Register() {
    // const history=useHistory()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [username, setusername] = useState('')
    const [phone, setphone] = useState('')
    const [dob, setdob] = useState('')
    const [error, seterror] = useState('')
    const navigate =useNavigate()
    const addEmail=(e)=>{
        seterror('')
        setemail(e.target.value)
    }
    const addPassword=(e)=>{
        seterror('')
          setpassword(e.target.value)
    }
    const addUsername=(e)=>{
        seterror('')
        setusername(e.target.value)
    }
    const addPhone=(e)=>{
        seterror('')
        setphone(e.target.value)
    }
    const addDob=(e)=>{
        seterror('')
        setdob(e.target.value)
    }
   
    const userSignup=async(e)=>{
        e.preventDefault()
        try{
            const data={
                username:username,
                dob:dob,
                email:email,
                password:password,
                phone:phone,
                state:true
            }
           await instance.post('/register',data).then(async(response)=>{
               console.log(response)
               if(response.data.error) seterror(response.data.error) 
               
            //   history.push('/login')
           if(response.data.status){
            navigate('/login')
           }


           })
        }
        catch(err){
            console.log(err)
        }


    }
    return (
        <div className='register_head'>
            <div className='user_main_page'>
           <form className="user_login_form" onSubmit={userSignup}>
           <input type="text" value={username} placeholder="Username" onChange={addUsername}></input>
            <input type="number" value={phone} placeholder="Phone number" onChange={addPhone}></input> 
            <input type="datetime-local" value={dob} placeholder="Date of birth" onChange={addDob}></input> 
           <input type="email" value={email} placeholder="Email" onChange={addEmail}></input>
            <input type="password" value={password} placeholder="Password" onChange={addPassword}></input>
            <button type='submit'>Signup</button>
            {error && <p>{error}</p>}
           </form>
        </div>
        </div>
    )
}

export default Register

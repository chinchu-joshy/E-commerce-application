const User=require('../model/userModel')
const bcrypt=require('bcrypt')

var mongoose = require("mongoose");
const Product = require('../model/productModel');
var Objid = mongoose.Types.ObjectId;
module.exports={
    registerUser:(data)=>{
        return new Promise(async(resolve,reject)=>{
            const salt=await bcrypt.genSalt()
    const val=await bcrypt.hash(data.password,salt)
   
    const userdata=new User({
      email:data.email,
      passwordHash:val,
      username:data.username,
      dob:data.dob,
      phone:data.phone,
      state:data.state

    })
    const saveUser= await userdata.save()
    resolve(saveUser)
          
        })
    },
    loginUser:(data)=>{
        return new Promise(async(resolve,reject)=>{
            const value={}
           const email=data.email
           const Password=data.password
           const check=await User.findOne({email}) 
           if(check) {
               const user= await User.findOne({Password})
            bcrypt.compare(Password, user.passwordHash).then(function(result) {
                if(result===true){
                    value.user=check
                    value.status=true
                     resolve(value)
                }else{
                    value.status=false
                    resolve(value) 
                }
            });
               
           }else{
            value.status=false
               resolve(value)
           }
        })
    },
    findBlocked:(id)=>{
        return new Promise(async(resolve,reject)=>{
            const data= await User.findOne({id:Objid(id)})
            if(data.state===false) return resolve({status:false})
            return resolve({status:true})
        })
    },
    userFind:(id)=>{
        return new Promise(async(resolve,reject)=>{
            const data=await Product.find({_id:Objid(id)})
            resolve(data)
            console.log(data)
        })
    }
    
}
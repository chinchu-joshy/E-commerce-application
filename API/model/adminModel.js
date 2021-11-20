const mongoose=require('mongoose')
const adminScheme=new mongoose.Schema({
    email:{type:String,required:true},
    passwordHash:{type:String,required:true},
    username:{type:String,required:true}
}, {timestamps:true});
const Admin=mongoose.model("adminlogin",adminScheme);


module.exports=Admin;
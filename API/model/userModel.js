const mongoose=require('mongoose')
const userloginSchema=new mongoose.Schema({
    email:{type:String,required:true},
    passwordHash:{type:String,required:true},
    username:{type:String,required:true},
    phone:{type:String,require:true},
    DOB:{type:String,require:true},
    state:{type:Boolean,require:true,default:true},
    adress:{type:Array},
    image:{type:String},
    referal:{type:String},
    wallet:{type:Number},
    coupen:{type:Array}

}, {timestamps:true});

const User=mongoose.model("userLogin",userloginSchema);
module.exports=User;
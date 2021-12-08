const mongoose=require('mongoose')
const usercartSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    products:{type:Array}

}, {timestamps:true});

const Cart=mongoose.model("userCart",usercartSchema);
module.exports=Cart;
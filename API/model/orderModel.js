const mongoose=require('mongoose')
const userorderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    cartId:{type:String,required:true},
    payment:{type:String,required:true},
    amount:{type:Number,required:true},
    adress:{type:Object,required:true},
    orderStatus:{type:String,required:true},
    date:{type:String,required:true},
    products:{type:Array,required:true},
    secret:{type:String,required:true},
    paymentstatus:{type:String}
    

}, {timestamps:true});

const Order=mongoose.model("userorder",userorderSchema);
module.exports=Order;
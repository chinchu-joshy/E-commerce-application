const mongoose=require('mongoose')
const productScheme=new mongoose.Schema({
    category:{type:String},
    subcategory:{type:String},
    productname:{type:String},
    deliverymethod:{type:String},
    description:{type:String},
    price:{type:Number},
    totalnumber:{type:Number},
    seller:{type:String},
    color:{type:Array},
    small:{type:Number},
    medium:{type:Number},
    large:{type:Number},
   key:{type:String},
    url:{type:Array},
    size:{type:String},
    offer:{type:Number}
}, {timestamps:true});
const Product=mongoose.model("product",productScheme);
module.exports=Product;
const mongoose=require('mongoose')
const categoryScheme=new mongoose.Schema({
    category:{type:String,required:true},
    subcategory:{type:Array,required:true}
    
}, {timestamps:true});
const Category=mongoose.model("category",categoryScheme);
module.exports=Category;
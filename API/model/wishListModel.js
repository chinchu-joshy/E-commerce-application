const mongoose=require('mongoose')
const userwishlistSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    products:{type:Array}

}, {timestamps:true});

const wishlist=mongoose.model("userwishlist",userwishlistSchema);
module.exports=wishlist;

const Admin = require("../model/adminModel");
const Category = require("../model/categoryModel");
const User = require("../model/userModel");
const Product = require("../model/productModel");
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");
const Order = require("../model/orderModel");
const Offer=require('../model/OfferModal')
const newLocal = mongoose.Types.ObjectId;
var Objid = newLocal;
module.exports = {
  checkLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      const value = {};
      const email = data.email;
      const Password = data.password;
      const check = await Admin.findOne({ email });
      if (check) {
        bcrypt
          .compare(data.password, check.passwordHash)
          .then(function (result) {
            if (result === true) {
              value.user = check;
              value.status = true;
              resolve(value);
            } else {
              value.status = false;
              resolve(value);
            }
          });
      } else {
        value.status = false;
        resolve(value);
      }
    });
  },
  userBlock: (data) => {
    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({ _id: Objid(data.userId) });
      if (user.state === true) {
        const user = await User.findOneAndUpdate(
          { _id: Objid(data.userId) },
          { $set: { state: false } },
          { new: true }
        );
        resolve(user);
      } else {
        const user = await User.findOneAndUpdate(
          { _id: Objid(data.userId) },
          { $set: { state: true } },
          { new: true }
        );
        resolve(user);
      }
    });
  },
  getUser: () => {
    return new Promise(async (resolve, reject) => {
      const user = await User.find({}).sort({createdAt:-1}).limit(10);
      const count = await User.count();
      const value = count / 10;
      const limit = count % 10;
      const extra = parseInt(value);
      resolve({ users: user, pageCount: extra, balance: limit });
    });
  },
  getUserbyPage: (id) => {
    return new Promise(async (resolve, reject) => {
      const check = (id - 1) * 10;

      const user = await User.find({}).sort({createdAt:-1}).skip(check).limit(10);
      const count = await User.count();
      const value = count / 10;
      const limit = count % 10;
      const extra = parseInt(value);
      resolve({ users: user, pageCount: extra, balance: limit });
    });
  },
  getproductbypage: (id) => {
    return new Promise(async (resolve, reject) => {
      const check = (id - 1) * 6;

      const product = await Product.find({}).sort({createdAt:-1}).skip(check).limit(6);
      const count = await User.count();
      const value = count / 10;
      const limit = count % 10;
      const extra = parseInt(value);
      resolve({ products: product, pageCount: extra, balance: limit });
    });
  },
  addCategory: (data) => {
    return new Promise(async (resolve, reject) => {
      const categorydata = new Category({
        category: data.category,
      });
      const category = await categorydata.save();
      resolve(category);
    });
  },
  findCategory: () => {
    return new Promise(async (resolve, reject) => {
      const val = await Category.aggregate([{ $group: { _id: "$category" } }]);

      resolve(val);
    });
  },
  addSubcategory: (data) => {
    return new Promise((resolve, reject) => {
      Category.updateOne(
        { category: data.category },
        { $addToSet: { subcategory: data.subcategory } }
      ).then((response) => {
        resolve(response);
      });
    });
  },
  getAllCategory: () => {
    return new Promise(async (resolve, reject) => {
      const category = await Category.find({}).sort({createdAt:-1});
      resolve(category);
    });
  },
  updateCategory: (data) => {
    return new Promise((resolve, reject) => {
      Category.updateOne(
        { category: data.oldcategory },
        { $set: { category: data.newcategory } }
      ).then((response) => {
        resolve(response);
      });
    });
  },
  deleteCategory: (data) => {
    return new Promise((resolve, reject) => {
      Category.deleteOne({ category: data.category }).then((response) => {
        resolve(response);
      });
    });
  },
  deleteSubCategory: (data) => {
    return new Promise((resolve, reject) => {
      Category.updateOne(
        { category: data.category },
        { $pull: { subcategory: data.subcategory } }
      ).then((response) => {
        resolve(response);
      });
    });
  },

  editSubCategory: (data) => {
    return new Promise((resolve, reject) => {
      Category.updateOne(
        { category: data.category },
        { $set: { "subcategory.$[element]": data.newsubcategory } },
        {
          arrayFilters: [{ element: data.oldsubcategory }],
        }
      )
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addImage: (data) => {
    return new Promise(async (resolve, reject) => {
      let url = [];
      if (data.length > 0) {
        url = data.map((image) => {
          return image.filename;
        });
        resolve(url);

        //   const categorydata = new Product({

        //     url
        //   });
        //   const product = await categorydata.save();
      }
    });
  },
  addProduct: (data, id) => {
    return new Promise(async (resolve, reject) => {
      const images = {
        image1: data.images[0],
        image2: data.images[1],
        image3: data.images[2],
        image4: data.images[3],
      };

      const stock =
        parseInt(data.small) + parseInt(data.medium) + parseInt(data.large);
      const categorydata = new Product({
        key: id,
        category: data.category,
        subcategory: data.subcategory,
        productname: data.product,
        deliverymethod: data.delivery,
        description: data.description,
        price: data.price,
        seller: data.seller,
        color: data.color,
        url: images,
        size: data.size,
        small: data.small,
        medium: data.medium,
        large: data.large,
        totalnumber: stock,
      });

      const product = await categorydata.save();
      resolve(product);
    });
  },
  getProduct: () => {
    return new Promise(async (resolve, reject) => {
      const product = await Product.find({}).sort({createdAt:-1}).limit(6);
      const count = await Product.count();
      const value = count / 10;
      const limit = count % 10;
      const extra = parseInt(value);
      resolve({ products: product, pageCount: extra, balance: limit });
    });
  },
  getEditProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      const product = await Product.find({ _id: Objid(id) });

      resolve(product);
    });
  },
  editProduct: (data) => {
    const images = {
      image1: data.image1,
      image2: data.image2,
      image3: data.image3,
      image4: data.image4,
    };
    return new Promise(async (resolve, reject) => {
      const stock =
        parseInt(data.small) + parseInt(data.medium) + parseInt(data.large);
      Product.updateOne(
        { _id: Objid(data.id) },
        {
          $set: {
            category: data.category,
            subcategory: data.subcategory,
            productname: data.product,
            deliverymethod: data.delivery,
            description: data.description,
            price: data.price,
            seller: data.seller,
            color: data.color,
            url: images,
            size: data.size,
            small: data.small,
            medium: data.medium,
            large: data.large,
            totalnumber: stock,
          },
        }
      ).then((response) => {
        resolve(response);
      });
    });
  },
  deleteProduct: (data) => {
    return new Promise(async (resolve, reject) => {
      console.log(data.id);
      Product.deleteOne({ _id: Objid(data.id) }).then((response) => {
        console.log(response);
        resolve(response);
      });
    });
  },
  findWomen: () => {
    return new Promise(async (resolve, reject) => {
      const product = await Product.find({ category: "women" });
      console.log(product);
      resolve(product);
    });
  },
  findMen: () => {
    return new Promise(async (resolve, reject) => {
      const data = await Product.find({ category: "Men" });
      console.log(data);
      resolve(data);
    });
  },
  getOrders: (data) => {
console.log(data.id)

    return new Promise(async (resolve, reject) => {
      try {


      //   if(id==1){
      //     const offer = await Offer.find({ product: { $exists: true}}).sort({createdAt:-1}).limit(4);
         
      //     const count = await Offer.count();
      // const value = count / 4;
      // const limit = count % 10;
      // const extra = parseInt(value);
      
      // resolve({ offers: offer, pageCount: extra, balance: limit });
      //   }else{
      //     const check = (id-1) * 4;
      //     const offer = await Offer.find({ product: { $exists: true}}).sort({createdAt:-1}).skip(check).limit(4);
      //     const count = await Offer.count();
      // const value = count / 4;
      // const limit = count % 10;
      // const extra = parseInt(value);
      // resolve({ offers: offer, pageCount: extra, balance: limit });
      //   }
      const order= await Order.aggregate([{ $unwind: "$products" },{
        $count: "passing_scores"
      }])
      console.log(order[0].passing_scores)
const count=order[0].passing_scores
const value = count / 10;
      const limit = count % 10;
      const extra = parseInt(value);
     
      if(data.id==1){
        const orders = await Order.aggregate([
          // {
          //   "$project": {
          //     "userId": {
          //       "$toObjectId": "$userId"
          //     }
          //   }
          // },
          {$sort:{"createdAt":-1}},
          { $unwind: "$products" },
          {
            $project: {
              userId: { $toObjectId: "$userId" },
              productId: { $toObjectId: "$products.productId" },
              "products.orderStatus":1,
              "products.price":1,
              "products.size":1,
              
              secret: 1,
              date: 1,
              payment: 1,
              orderStatus: 1,
            },
          },
          {
            $lookup: {
              from: "userlogins",
              localField: "userId",
              foreignField: "_id",
              as: "role",
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "productdetails",
            },
          },
          { $unwind: "$productdetails" },
         {$limit:10}
    
          

          
         
          
        ]);

      
        resolve({orders:orders, pageCount: extra, balance: limit });
      }else{


        const check = (data.id-1) * 10;
        const orders = await Order.aggregate([
          // {
          //   "$project": {
          //     "userId": {
          //       "$toObjectId": "$userId"
          //     }
          //   }
          // },
          {$sort:{"createdAt":-1}},
          { $unwind: "$products" },
          {
            $project: {
              userId: { $toObjectId: "$userId" },
              productId: { $toObjectId: "$products.productId" },
              "products.orderStatus":1,
              "products.price":1,
              "products.size":1,
              
              secret: 1,
              date: 1,
              payment: 1,
              orderStatus: 1,
            },
          },
          {
            $lookup: {
              from: "userlogins",
              localField: "userId",
              foreignField: "_id",
              as: "role",
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "productdetails",
            },
          },
          { $unwind: "$productdetails" },
        {$skip:check},
          {$limit:10}
         
          
        ]);




        resolve({orders:orders, pageCount: extra, balance: limit });


      }
      } catch (err) {}
    });
  },
  updateOrderStatus:(data)=>{
    return new Promise(async(resolve,reject)=>{
      try{
        // if(data.status==="Cancel"){
        //   const count=await Order.aggregate([{$match:{_id:Objid(data.id)}},{$project: { count: { $size:"$products" }}}])
        //   if(count==1){
        //     Order.deleteOne({_id:Objid(data.id)}).then((response)=>{
        //       resolve(response)
        //     })
        //   }else{
        //     Order.updateOne({_id:Objid(data.id),"products":{$elemMatch:{"productId":data.productId}}},{
        //       $pull: { "products": { "productId": data.productId ,"size":data.size} }}).then((response)=>{
        //         resolve(response)
        //       })
        //   } 
        // }else{
          Order.updateOne({_id:Objid(data.id),"products":{$elemMatch:{"productId":data.productId,"size":data.size}}},{
            $set:{"products.$.orderStatus":data.status}
          }).then((response)=>{
            console.log(response)
            resolve(response)
          })
        // }
      }catch(err){
      }
    })
  },
  addOffer:(data)=>{
   
    return new Promise(async(resolve,reject)=>{
      try{
        
        if(data.confirm===true){
         
          const detail=await Product.aggregate([{$match:{"productname":data.product}},{$project:{_id:1,price:1}}])
       
        const offer= (parseInt(data.offerprice) * parseInt(detail[0].price) )/100
           Offer.updateOne({"productname":data.product},{$set:{
            "productId":detail[0]._id ,
            "offerprice":data.offerprice,
            "offername":data.offername, 
            "startdate":data.startdate,
            "enddate": data.enddate,
            "product": data.product
                 
           }}).then((response)=>{
            Product.updateOne({"productname":data.product},{$set:{"offer":offer}}).then((response)=>{
              resolve(response)
            })

           })
        
      
        }else{
    
        const checkoffer= await Product.findOne({$and:[{"productname":data.product},{"offer": { $exists: true }}]})
       
        if(checkoffer){
          resolve({confirm:"The product already have an offer do you want to replace it ?"})
        }
        else{

        const detail=await Product.aggregate([{$match:{"productname":data.product}},{$project:{_id:1,price:1}}])
        console.log(detail[0]._id)
        const offer=(parseInt(data.offerprice) * parseInt(detail[0].price) )/100

        const newOffer=await new Offer({
          productId:detail[0]._id ,
    offerprice:data.offerprice,
    offername:data.offername, 
    startdate:data.startdate,
    enddate: data.enddate,
    product: data.product
        })
        const saveOffer=await newOffer.save()
        if(saveOffer){
          Product.updateOne({"productname":data.product},{$set:{"offer":offer}}).then((response)=>{
            resolve(response)
          })
        }
      }


      }

      }catch(err){

      }
    })
  },
  getOffer:(id)=>{
    
    return new Promise(async(resolve,reject)=>{
      try{ 
        if(id==1){
          const offer = await Offer.find({ product: { $exists: true}}).sort({createdAt:-1}).limit(4);
         
          const count = await Offer.count();
      const value = count / 4;
      const limit = count % 10;
      const extra = parseInt(value);
      
      resolve({ offers: offer, pageCount: extra, balance: limit });
        }else{
          const check = (id-1) * 4;
          const offer = await Offer.find({ product: { $exists: true}}).sort({createdAt:-1}).skip(check).limit(4);
          const count = await Offer.count();
      const value = count / 4;
      const limit = count % 10;
      const extra = parseInt(value);
      resolve({ offers: offer, pageCount: extra, balance: limit });
        }
      }catch(err){
      }
    })
  },
  getSubcategoryOffer:(id)=>{
    return new Promise(async(resolve,reject)=>{
      try{ 
        if(id==1){
          const offer = await Offer.find({ category: { $exists: true}}).sort({createdAt:-1}).limit(4);
         
          const count = await Offer.count();
      const value = count / 4;
      const limit = count % 10;
      const extra = parseInt(value);
      
      resolve({ offers: offer, pageCount: extra, balance: limit });
        }else{
          const check = (id-1) * 4;
          const offer = await Offer.find({ category: { $exists: true}}).sort({createdAt:-1}).skip(check).limit(4);
          const count = await Offer.count();
      const value = count / 4;
      const limit = count % 10;
      const extra = parseInt(value);
      resolve({ offers: offer, pageCount: extra, balance: limit });
        }
      }catch(err){
      }
    })
  },
  addofferCategory:(data)=>{
    return new Promise(async(resolve,reject)=>{
      try{

        
        if(data.confirm===true){
          console.log("reached")
          const list= await Offer.findOne({"subcategory":data.subcategory})
          console.log(list)
         
          const offer=parseInt(data.offerprice)/100
        //   const detail=await Product.aggregate([{$match:{"productname":data.product}},{$project:{_id:1,price:1}}])
       
        // const offer= parseInt(detail[0].price) - (parseInt(data.offerprice) * parseInt(detail[0].price) )/100
           Offer.updateOne({"subcategory":data.subcategory},{$set:{
            
            "offerprice":data.offerprice,
            "offername":data.offername, 
            "startdate":data.startdate,
            "enddate": data.enddate,
            "category":data.category,
            "subcategory":data.subcategory

           }}).then(async(response)=>{
            
          const out_put=await Product.aggregate([{$match:{"category":data.category,"subcategory":data.subcategory}}, { $project: { _id:1,total: { $multiply: [ "$price", offer ] } } }])
          console.log(out_put)
           out_put.forEach(
             function(x){
               Product.updateOne({_id:Objid(x._id)},{$set:{"offer":x.total}}).then((response)=>{
                resolve(response)
               })
             }
           )
          });

           
        
      
        }else{
          const offer=parseInt(data.offerprice)/100
    
        const checkoffer= await Offer.findOne({$and:[{"subcategory":data.subcategory},{"category":data.category}]})
       
        if(checkoffer){
          resolve({confirm:"The category already have an offer do you want to replace it ?"})
        }
        else{

        // const detail=await Product.aggregate([{$match:{"productname":data.product}},{$project:{_id:1,price:1}}])
        // console.log(detail[0]._id)
        // const offer= parseInt(detail[0].price) - (parseInt(data.offerprice) * parseInt(detail[0].price) )/100

        const newOffer=await new Offer({
          "offerprice":data.offerprice,
            "offername":data.offername, 
            "startdate":data.startdate,
            "enddate": data.enddate,
            "category":data.category,
            "subcategory":data.subcategory
        })
        const saveOffer=await newOffer.save()
        if(saveOffer){
          const out_put=await Product.aggregate([{$match:{"category":data.category,"subcategory":data.subcategory}}, { $project: { _id:1,total: { $multiply: [ "$price", offer ] } } }])
          
           out_put.forEach(
             function(x){
               Product.updateOne({_id:Objid(x._id)},{$set:{"offer":x.total}}).then((response)=>{
                resolve(response)
               })
             }
           )
         
        }
      }


      }



      }catch(err){

      }
    })
  },
  editOfferproduct:(data)=>{
    return new Promise(async(resolve,reject)=>{
      console.log(data)
      try{
        const detail=await Product.aggregate([{$match:{"productname":data.product}},{$project:{_id:1,price:1}}])
        const offer=(parseInt(data.offerprice) * parseInt(detail[0].price) )/100
        Offer.updateOne({productId:Objid(data.productId)},{$set:{
         
          offerprice:data.offerprice,
          offername:data.offername, 
          startdate:data.startdate,
          enddate: data.enddate,
         

        }}, { new: true }).then((res)=>{
          console.log("raeched to edit")
          console.log(res)
          
          
          Product.updateOne({"productname":data.product},{$set:{"offer":offer}}).then((response)=>{
            resolve(response)
          })
          
        })
      }catch(err){

      }
    })
  },
  getSubcategoryToadd:(value)=>{
    return new Promise(async(resolve,reject)=>{
      try{
const data=await Category.aggregate([{$match:{"category":value}},{$project:{"subcategory":1}}])
console.log(data)
resolve(data)
      }catch(err){

      }
    })
  },
  





  deleteOffer:(id)=>{
     return new Promise(async(resolve,reject)=>{
      try{
const data=await Category.aggregate([{$match:{"category":value}},{$project:{"subcategory":1}}])
console.log(data)
resolve(data)
      }catch(err){

      }
    })

  }

};

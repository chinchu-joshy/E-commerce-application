const Admin = require("../model/adminModel");
const Category = require("../model/categoryModel");
const User = require("../model/userModel");
const Product = require("../model/productModel");
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");
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
        const user = await Admin.findOne({ Password });
        bcrypt.compare(Password, user.passwordHash).then(function (result) {
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
      const user = await User.find({});

      resolve(user);
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
      const category = await Category.find({});
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
      ).then((response) => {
        resolve(response);
      }).catch((err)=>{
          reject(err)
      });
    });
  },
  addImage:(data)=>{
      return new Promise(async(resolve,reject)=>{
          let url=[]
          if(data.length>0){
            url=  data.map((image)=>{
                  return image.filename
                  

              })
              resolve(url)

            //   const categorydata = new Product({
                
            //     url
            //   });
            //   const product = await categorydata.save();



          }
      })

  },
  addProduct: (data,id) => {
    return new Promise(async (resolve, reject) => {
      
      const images={
        image1:data.images[0],
        image2:data.images[1],
        image3:data.images[2],
        image4:data.images[3],
      }
      
      
      const stock=parseInt(data.small)+parseInt(data.medium)+parseInt(data.large)
      const categorydata = new Product({
        key:id,
        category: data.category,
        subcategory: data.subcategory,
        productname: data.product,
        deliverymethod: data.delivery,
        description: data.description,
        price: data.price,
        seller: data.seller,
        color: data.color,
        url:images,
        size:data.size,
        small:data.small,
        medium:data.medium,
        large:data.large,
        totalnumber:stock
      });

      const product = await categorydata.save();
      resolve(product);
      
    });
  },
  getProduct:()=>{
      return new Promise(async(resolve,reject)=>{
         const products=await Product.find({})
         
         resolve(products)
        
      })
  },
  getEditProduct:(id)=>{
    return new Promise(async(resolve,reject)=>{
      const product=await Product.find({_id:Objid(id)})
      
      resolve(product)
      
   })
  },
  editProduct:(data)=>{
    return new Promise(async(resolve,reject)=>{
      const stock=parseInt(data.small)+parseInt(data.medium)+parseInt(data.large)
      Product.updateOne({_id:Objid(data.id)},{$set:{
        category: data.category,
        subcategory: data.subcategory,
        productname: data.product,
        deliverymethod: data.delivery,
        description: data.description,
        price: data.price,
        seller: data.seller,
        color: data.color,
        url:data.images,
        size:data.size,
        small:data.small,
        medium:data.medium,
        large:data.large,
        totalnumber:stock
      }}).then((response)=>{
        resolve(response)
      })
    })
},
    deleteProduct:(data)=>{
    return new Promise(async(resolve,reject)=>{
      console.log(data.id)
      Product.deleteOne({ _id: Objid(data.id) }).then((response) => {
        console.log(response)
        resolve(response);
      }); 
    })
},
findWomen:()=>{
  return new Promise(async(resolve,reject)=>{
  
      const product=await Product.find({category:"women"})
      console.log(product)
      resolve(product)
  })
},
findMen:()=>{
  return new Promise(async(resolve,reject)=>{
    const data=await Product.find({ category:"Men" })
    console.log(data)
    resolve(data) 
  })
}
};

var express = require("express");
var router = express.Router();

const Admin= require("../model/adminModel");
const adminHelper = require("../helpers/adminHelpers");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/adminMiddleware");
const userHelpers = require("../helpers/userHelpers");
const adminHelpers = require("../helpers/adminHelpers");
const multer  = require('multer')
const shortid=require('shortid')
const {cloudinary}=require('../cloudinary/cloudinary')
// const upload = multer({ dest: 'public/images' })





var storage = multer.diskStorage([])

var upload = multer({ storage: storage });

/* GET users listing. */
router.get("/", adminMiddleware.Auth, (req, res) => {
  console.log(req.cookies);
  res.send("ok");
});

router.post("/login", (req, res) => {
  console.log("fdf");
  console.log(req.body + "khkfjnkd");
  if (req.body.email && req.body.password) {
    adminHelper.checkLogin(req.body).then((response) => {
      if (response.status === true) {
        const token = jwt.sign(
          { user: response.user._id },
          process.env.jwt_PASSWORD_ADMIN
        );
        res.cookie("admintoken", token, {}).send({ status: true });
      } else {
        res.send({ error: "Invalid email or password", status: false });
      }
    });
  } else {
    res.send({ error: "Please fill the empty field", status: false });
  }
});

router.get("/logged", async (req, res) => {
  const token = req.cookies.admintoken;

  try {
    if (!token) return res.send({ status: false });
    const verify = await jwt.verify(
      req.cookies.admintoken,
      process.env.jwt_PASSWORD_ADMIN
    );
    if (verify) {
      res.send({ status: true });
    }
  } catch (err) {
    res.send({ status: false });
  }
});
router.post("/blockUser", (req, res) => {
  
  adminHelpers.userBlock(req.body).then((response) => {
    
    res.send(response);
  });
});
router.get("/getuser", async (req, res) => {
  const userDetails = await adminHelpers.getUser();
  

  res.send(userDetails);
});
router.post('/addcategory',(req,res)=>{
adminHelpers.addCategory(req.body).then((response)=>{
res.send(response)
})
})
router.get('/getcategory',async(req,res)=>{
  let data=await adminHelpers.findCategory()
  res.send(data)


})
router.post('/addsubcategory',(req,res)=>{
  adminHelpers.addSubcategory(req.body).then((response)=>{
    res.send(response)
  })
})
router.get('/getallcategory',async(req,res)=>{
  let response=await adminHelpers.getAllCategory()
  res.send(response)

})
router.post('/editcategory',(req,res)=>{
adminHelpers.updateCategory(req.body).then((response)=>{
  res.send(response)
})
})
router.post('/deletecategory',(req,res)=>{
  adminHelpers.deleteCategory(req.body).then((response)=>{
    res.send(response)
  })
})
router.post('/editsubcategory',(req,res)=>{
  adminHelpers.editSubCategory(req.body).then((response)=>{
    res.send(response)
  })

})
router.post('/deletesubcategory',(req,res)=>{
  console.log(req.body)
  adminHelpers.deleteSubCategory(req.body).then((response)=>{
    
    res.send(response)
  })
})
router.post('/addproduct',(req,res)=>{
  console.log(req.body)
  const secret=shortid.generate()
  adminHelpers.addProduct(req.body,secret).then((response)=>{
    res.send(response)
  })
})
router.post('/getproduct',upload.array("image", 3),async(req,res)=>{
 const products=await adminHelpers.getProduct(req.body)
    res.send(products)
 
})
router.post('/addimage',upload.array("image", 4),async(req,res)=>{
  
  

  const files=req.files;
  const urls=[];
  const object={}
   for(let file of files){
   

  const uploadResult=await cloudinary.uploader.upload(`${file.path}`,{
    upload_presets:"cwbd4hh7"
  })
  object.image1=uploadResult.secure_url
  urls.push(object.image1)
 

}
console.log(urls)
res.send(urls)
  
  
  // var reader = new FileReader();
  //   reader.readAsDataURL(req.body.files.file[0]); 
  //   reader.onloadend = function() {
  //     var base64data = reader.result;                
  //     console.log(base64data);
  //   }
  
  
})
router.get('/editproducts/:id',(req,res)=>{
  adminHelpers.getEditProduct(req.params.id).then((response)=>{
    console.log(response)
    
    res.send(response)
  })
})
router.get('/gettallproducts',async(req,res)=>{
  const product=await adminHelper.getProduct()
  res.send(product)
})
router.post('/deleteproduct',(req,res)=>{
 console.log(req.body)
  adminHelpers.deleteProduct(req.body).then((response)=>{
    res.send(response)
  })
})
router.post('/addeditedimage',upload.single("image"),async(req,res)=>{

  const file=req.file;
  
   console.log(file)

  const uploadResult=await cloudinary.uploader.upload(`${file.path}`,{
    upload_presets:"cwbd4hh7"
  })
  
 


console.log(uploadResult.secure_url)
res.send(uploadResult.secure_url)

})
router.post('/editproduct',(req,res)=>{
  console.log(req.body)
  adminHelpers.editProduct(req.body).then((response)=>{
    res.send(response)
  })

})
router.get('/getmen',(req,res)=>{
  
    adminHelpers.findMen().then((response)=>{
      res.send(response)
    
  })
})
router.get('/getwomen',(req,res)=>{
 
    adminHelpers.findWomen().then((response)=>{
      res.send(response)
      
    
  })
})
router.get("/logout", async (req, res) => {
  res
    .cookie("admintoken", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send({ status: true });
});

module.exports = router;

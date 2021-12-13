var express = require("express");
var router = express.Router();

const Admin = require("../model/adminModel");
const adminHelper = require("../helpers/adminHelpers");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/adminMiddleware");
const userHelpers = require("../helpers/userHelpers");
const adminHelpers = require("../helpers/adminHelpers");
const multer = require("multer");
const shortid = require("shortid");
const { cloudinary } = require("../cloudinary/cloudinary");
// const upload = multer({ dest: 'public/images' })

var storage = multer.diskStorage([]);

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
router.get("/getuserpage/:id", async (req, res) => {
  console.log(req.params.id);
  const userData = await adminHelpers.getUserbyPage(req.params.id);
  console.log(userData);
  res.send(userData);
});
router.post("/addcategory", (req, res) => {
  adminHelpers.addCategory(req.body).then((response) => {
    res.send(response);
  });
});
router.get("/getcategory", async (req, res) => {
  let data = await adminHelpers.findCategory();
  res.send(data);
});
router.post("/addsubcategory", (req, res) => {
  adminHelpers.addSubcategory(req.body).then((response) => {
    res.send(response);
  });
});
router.get("/getallcategory", async (req, res) => {
  let response = await adminHelpers.getAllCategory();
  res.send(response);
});
router.post("/editcategory", (req, res) => {
  adminHelpers.updateCategory(req.body).then((response) => {
    res.send(response);
  });
});
router.post("/deletecategory", (req, res) => {
  adminHelpers.deleteCategory(req.body).then((response) => {
    res.send(response);
  });
});
router.post("/editsubcategory", (req, res) => {
  adminHelpers.editSubCategory(req.body).then((response) => {
    res.send(response);
  });
});
router.post("/deletesubcategory", (req, res) => {
  console.log(req.body);
  adminHelpers.deleteSubCategory(req.body).then((response) => {
    res.send(response);
  });
});
router.post("/addproduct", (req, res) => {
  const secret = shortid.generate();
  adminHelpers.addProduct(req.body, secret).then((response) => {
    res.send(response);
  });
});
router.post("/getproduct", upload.array("image", 3), async (req, res) => {
  const products = await adminHelpers.getProduct(req.body);
  res.send(products);
});
router.post("/addimage", upload.array("image", 4), async (req, res) => {
  const files = req.files;
  const urls = [];
  const object = {};
  for (let file of files) {
    const uploadResult = await cloudinary.uploader.upload(`${file.path}`, {
      upload_presets: "cwbd4hh7",
    });
    object.image1 = uploadResult.secure_url;
    urls.push(object.image1);
  }
  console.log(urls);
  res.send(urls);

  // var reader = new FileReader();
  //   reader.readAsDataURL(req.body.files.file[0]);
  //   reader.onloadend = function() {
  //     var base64data = reader.result;
  //     console.log(base64data);
  //   }
});
router.get("/editproducts/:id", (req, res) => {
  adminHelpers.getEditProduct(req.params.id).then((response) => {
    res.send(response);
  });
});
router.get("/gettallproducts", async (req, res) => {
  const product = await adminHelper.getProduct();
  res.send(product);
});
router.get("/getproductpage/:id", async (req, res) => {
  const product = await adminHelpers.getproductbypage(req.params.id);
  res.send(product);
});
router.post("/deleteproduct", (req, res) => {
  adminHelpers.deleteProduct(req.body).then((response) => {
    res.send(response);
  });
});
router.post("/addeditedimage", upload.single("image"), async (req, res) => {
  const file = req.file;

  const uploadResult = await cloudinary.uploader.upload(`${file.path}`, {
    upload_presets: "cwbd4hh7",
  });

  res.send(uploadResult.secure_url);
});
router.post("/editproduct", (req, res) => {
  adminHelpers.editProduct(req.body).then((response) => {
    res.send(response);
  });
});
router.get("/getmen", (req, res) => {
  adminHelpers.findMen().then((response) => {
    res.send(response);
  });
});
router.get("/getwomen", (req, res) => {
  adminHelpers.findWomen().then((response) => {
    res.send(response);
  });
});
router.get("/logout", async (req, res) => {
  res
    .cookie("admintoken", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send({ status: true });
});
router.get("/allorders/:id", async (req, res) => {
  try {
    const orders = await adminHelpers.getOrders(req.params);
    res.send(orders);
  } catch (err) {}
});
router.post("/changestatus", (req, res) => {
  try {
    adminHelpers.updateOrderStatus(req.body).then((response) => {
      res.send(response);
    });
  } catch (err) {}
});
router.post("/addoffer", (req, res) => {
  try {
    adminHelpers.addOffer(req.body).then((response) => {
      res.status(200).send(response);
    });
  } catch (err) {}
});
router.get("/getoffer/:id", async (req, res) => {
  try {
    const offer = await adminHelpers.getOffer(req.params.id);
    res.status(200).send(offer);
  } catch (err) {}
});
router.get("/getoffercategory/:id", async (req, res) => {
  try {
    const data = await adminHelpers.getSubcategoryOffer(req.params.id);
    res.status(200).send(data);
    console.log(data);
  } catch (err) {}
});
router.post("/addoffercategory", (req, res) => {
  try {
    adminHelpers.addofferCategory(req.body).then((response) => {
      res.status(200).send(response);
    });
  } catch (err) {}
});
router.post("/editoffer", (req, res) => {
  try {
    adminHelpers.editOfferproduct(req.body.editoffer).then((response) => {
      res.send(response);
    });
  } catch (err) {}
});

router.get("/subcategorylist/:id", async (req, res) => {
  try {
    const data = await adminHelpers.getSubcategoryToadd(req.params.id);
    res.send(data);
  } catch (err) {}
});
router.post("/deleteoffer", (req, res) => {
  try {
    adminHelpers.deleteOffer(req.body).then((response) => {
      res.send(response);
    });
  } catch (err) {}
});
router.post("/editoffercategory", (req, res) => {
  console.log(req.body);
  try {
    adminHelpers
      .editOfferCategory(req.body.editoffercategory)
      .then((response) => {
        res.send(response);
      });
  } catch (err) {}
});
router.post("/deletecategoryoffer", (req, res) => {
  try {
    adminHelpers.deleteCategoryOffer(req.body).then((response) => {
      res.send(response);
    });
  } catch (err) {}
});
// *********************************************COUPEN*********************************************************
router.post('/addcoupen',(req,res)=>{
 
  try{
    adminHelpers.addCoupen(req.body.addcoupen).then((response) => {
      res.send(response);
    });

  }catch(err){

  }
})
router.post('/editcoupen',(req,res)=>{
  try{
    console.log(req.body)
    adminHelpers.editCoupen(req.body.editcoupen).then((response) => {
      res.send(response);
    });

  }catch(err){

  }
})
router.post('/deletecoupen',(req,res)=>{
  try{
    adminHelpers.deleteCoupen(req.body).then((response) => {
      res.send(response);
    });

  }catch(err){

  }
})
router.get('/getcoupen/:id',(req,res)=>{
  try{
    adminHelpers.getCoupen(req.params.id).then((response) => {
      res.send(response);
    });

  }catch(err){

  }
})

// *********************************************COUPEN*********************************************************
// ===========================================SALES REPORT=================================================
router.get('/singledayorders/:id',async(req,res)=>{
  try{
   
   const data= await adminHelpers.getQuickSortOneDay(req.params.id)
   if(data){
     
     res.send(data)
   }

  }catch(err){

  }
})
router.get('/weeklyorders/:id',async(req,res)=>{
  try{
    
   const data= await adminHelpers.getQuickSortWeek(req.params.id)
   if(data){
    //  console.log(data)
     res.send(data)
   }

  }catch(err){

  }

})
router.get('/monthlyorders/:id',async(req,res)=>{
  try{
   
   const data= await adminHelpers.getQuickSortMonth(req.params.id)
   if(data){
    //  console.log(data)
     res.send(data)
   }

  }catch(err){

  }

})
router.get('/yearlyorders/:id',async(req,res)=>{
  try{
    console.log("reached yearly order")
   const data= await adminHelpers.getQuickSortYear(req.params.id)
   if(data){
    //  console.log(data)
     res.send(data)
   }

  }catch(err){

  }

})
router.get('/rangeorders/:id/:start/:end',async(req,res)=>{
  try{
   
   const data= await adminHelpers.getOrderByRange(req.params.id,req.params.start,req.params.end)
   
   if(data){
    
     res.send(data)
   }
  }catch(err){

  }

})
// ==============================================CHART============================================================
router.get('/activeusers',async(req,res)=>{
  try{
   const data=await adminHelpers.findUserStatus()
   res.status(200).send(data)

  }catch(err){

  }
})
router.get('/monthlyorder',async(req,res)=>{
  try{
    const data=await adminHelpers.getDatabyMonth()
    const day=[]
    const count=[]
    if(data){
      // for(let i=0;i<data.length;i++){
      //   day.labels.push(data[i]._id.day);
      //   count.push(data[i].count);
      //   console.log(data[i])
      //   console.log("jhdfdgfhj fbhjfj bjdhbfjkhuk")
      // }
      // console.log(day)
      // console.log(count)
      for(let i=0;i<data.length;i++){
       
day.push(data[i]._id.day)
count.push(data[i].count)


      }
      console.log(day)
      console.log(count)
     
      res.status(200).send({day,count})
    }
  }catch(err){

  }

})
// =============================rs=========================HOME CARD================================================
router.get('/getinfo',async(req,res)=>{
  try{
    
    const data=await adminHelpers.getInfo()
    if(data){
      console.log(data)
      res.send(data)
    }

  }catch(err){

  }
})
router.get('/latestorders',async(req,res)=>{
  try{
    
    const data=await adminHelpers.getrecentOrder()
    if(data){
    
      res.send(data)
    }

  }catch(err){

  }

})
router.get('/trending',async(req,res)=>{
  try{
    
    const data=await adminHelpers.topSellingProduct()
   
    if(data){
      console.log(data)
    
      res.send(data)
    }

  }catch(err){

  }

})

module.exports = router;

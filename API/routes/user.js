var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userHelpers = require("../helpers/userHelpers");
const userHelper = require("../helpers/userHelpers");
const shortid = require("shortid");
const { cloudinary } = require("../cloudinary/cloudinary");


/* GET home page. */

router.get("/logged", async (req, res) => {
  const token = req.cookies.usertoken;
  // console.log(req.cookies.usertoken);

  try {
    if (!token) return res.send({ status: false });
    const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
    // console.log(verify);
    if (verify) {
      userHelpers.findBlocked(verify.client.id).then((response) => {
        res.send(response);
      });
    }
  } catch (err) {
    console.log(err);
    res.send({ status: false });
  }
});
router.post("/register", function (req, res, next) {
  userHelper.registerUser(req.body).then((response) => {
    // console.log(response);
    res.send({ status: true });
  });
});
router.post("/login", function (req, res) {
  if (req.body.email && req.body.password) {
    userHelper.loginUser(req.body).then((response) => {
      if (response.status === true) {
        const token = jwt.sign(
          { client: { id: response.user._id, state: response.user.state } },
          process.env.jwt_PASSWORD_USER
        );

        res.cookie("usertoken", token, {}).send({ status: true });
      } else {
        res.send(response);
      }
    });
  } else {
    res.send({ error: "Please fill the empty field", status: false });
  }
});
router.get("/logout", async (req, res) => {
  res
    .cookie("usertoken", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send({ status: true });
});
router.get("/getviewproduct/:id", (req, res) => {
  // console.log(req.params.id);
  userHelpers.userFind(req.params.id).then((response) => {
    res.send(response);
  });
});
router.get("/getallcategory", async (req, res) => {
  try {
    const data = await userHelpers.getCategory();

    res.send(data);
  } catch (err) {}
});
router.get("/getSelectedCategory/:id", (req, res) => {
  userHelpers.findTheCategory(req.params.id).then((response) => {
    res.send(response);
  });
});
router.get("/getSelectedCategory/:id/:sub", (req, res) => {
  userHelpers
    .findTheSubCategory(req.params.id, req.params.sub)
    .then((response) => {
      res.send(response);
    });
});
router.get("/getnewarrivals", async (req, res) => {
  const newarrival = await userHelpers.getNewArrival();
  // console.log(newarrival)
  res.send(newarrival);
});
router.get("/getsearchproduct/:id", async (req, res) => {
  const results = await userHelpers.getSearchedProducts(req.params.id);
  if (results) {
    res.send(results);
  }
});
router.post("/addadress", async (req, res) => {
  const secret = shortid.generate();
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;
  const data = {
    state: req.body.state,
    district: req.body.district,
    city: req.body.city,
    pincode: req.body.pincode,
    secreatId: secret,
  };

  const adress = await userHelpers.addUserAdress(data, userId);
  if (adress) {
    res.send(adress);
  }
});
router.get("/getuserdata", async (req, res) => {
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;

  const adress = await userHelpers.getAdressUser(userId);
  if (adress) {
    res.send(adress);
  }
});
router.get("/geteditadress/:id", (req, res) => {
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;
  userHelpers.findTheEditAdress(userId, req.params.id).then((response) => {
    res.send(response);
  });
});
router.post("/editadress", (req, res) => {
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;
  try {
    userHelpers.updateAdress(userId, req.body).then((response) => {
      res.send(response);
    });
  } catch (err) {}
});
router.get("/deleteadress/:id", (req, res) => {
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;
  try {
    userHelpers.deleteAdress(req.params.id, userId).then((response) => {
      res.send(response);
    });
  } catch (err) {}
});
router.post("/editdetails", (req, res) => {
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;
  try {
    userHelpers.updateDetails(userId, req.body).then((response) => {
      res.send(response);
    });
  } catch (err) {}
});
router.post("/checkpassword", (req, res) => {
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;
  try {
    userHelpers
      .checkPassword(userId, req.body.passworduser)
      .then((response) => {
        console.log(response);
        res.send(response);
      });
  } catch (err) {}
});
router.post("/addnewpassword", (req, res) => {
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;
  try {
    userHelpers.updateUserPassword(req.body, userId).then((response) => {
      res.send(response);
    });
  } catch (err) {}
});
router.post("/addtocart", (req, res) => {
  const secret = shortid.generate();
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;
  try {
    userHelpers.addToCart(req.body, secret, userId).then((response) => {
      res.send(response);
    });
  } catch (err) {}
});
router.get("/getcartproduct", async (req, res) => {
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;
  try {
    const products = await userHelpers.getCartProducts(userId);
    const total = products.map((item) => item.totalamount);
    const reducer = total.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);
    const sum = products.map((item) => item.totaloffamount);
    const offer = sum.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);
    const totaloffer=Math.trunc(offer)
    console.log(offer)
    console.log(reducer);
    res.json({ product: products, amount: reducer ,reduction:totaloffer});
  } catch (err) {}
});
router.get("/updatequantity/:id", (req, res) => {
  const token = req.cookies.usertoken;
  const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
  userId = verify.client.id;
  try {
    userHelpers.updateQuantity(userId, req.params.id).then((response) => {
      res.send(response);
    });
  } catch (err) {

  }
});
router.get("/updatequantitydecrease/:id", (req, res) => {
  try {
    const token = req.cookies.usertoken;
    const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
    userId = verify.client.id;
    userHelpers
      .updateQuantityDecrease(userId, req.params.id)
      .then((response) => {
        res.send(response);
      });
  } catch (err) {}
});
router.get('/deletecartitem/:id',(req,res)=>{
  const token = req.cookies.usertoken;
    const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
    userId = verify.client.id;
  try{
    userHelpers.deleteCartItem(userId,req.params.id).then((response)=>{
      res.send(response)
    })

  }catch(err){

  }
})
router.post('/placeorder',(req,res)=>{
  const token = req.cookies.usertoken;
    const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
    userId = verify.client.id;
    const secret = shortid.generate();
  try{
    console.log(req.body)
    userHelpers.placeOrder(userId,req.body,secret).then((response)=>{
      if(req.body.payment==="COD"){
       
        res.send({response:response,method:"cod"})
      }else if(req.body.payment==="Razorpay"){
        userHelpers.generateRazorpay(secret,req.body.price).then((result)=>{
          
          res.send({response:response,order:result})
        })
        
      }else if(req.body.payment==="Paypal"){
        res.send({paypal:process.env.Client_id_paypal})

      }
      
    })

  }catch(err){

  }
})

router.get('/getorderproduct/:id',async(req,res)=>{
  try{
const data=await userHelpers.getProductDetailsOrdered(req.params.id)
console.log("reached")
console.log(data)
res.send(data)
  }catch(err){

  }
})
router.get('/getorders',async(req,res)=>{
  const token = req.cookies.usertoken;
    const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
    userId = verify.client.id;
  try{
    const data=await userHelpers.getUserOrder(userId)
    res.send(data)
  }catch(err){

  }
})
router.post('/cancelorderuser',(req,res)=>{
  try{
    userHelpers.cancelOrderByUser(req.body).then((response)=>{
      res.send(response)
    })

  }catch(err){

  }
})
router.get('/similarproduct/:id',async(req,res)=>{
  try{
    console.log(req.params.id)
    const response=await userHelpers.similarProduct(req.params.id)
      res.send(response)
  

  }catch(err){

  }
})
router.post('/uploadimage',async(req,res)=>{
  const token = req.cookies.usertoken;
    const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
    userId = verify.client.id;
  try{
   
    const uploadResult = await cloudinary.uploader.upload(req.body.url, {
      upload_presets: "cwbd4hh7",
    });
  console.log(uploadResult.secure_url)
  userHelpers.addUserImage(uploadResult.secure_url,userId).then((response)=>{
    res.send(response)
  })
   

  }catch(err){

  }
})
router.post('/successpayment',(req,res)=>{
  try{
  
    userHelpers.verifyPayment(req.body).then((response)=>{
      if(response.status===true){
        userHelpers.updateOrderPaymentStatus(req.body.orderid).then((response)=>{
          if(response){
            res.send(response)
          }
          
        })
      }
                
    })

  }catch(err){

  }
})

// router.get('/success', (req, res) => {
//   const payerId = req.query.PayerID;
//   const paymentId = req.query.paymentId;

//   const execute_payment_json = {
//     "payer_id": payerId,
//     "transactions": [{
//         "amount": {
//             "currency": "INR",
//             "total": "25.00"
//         }
//     }]
//   };

// // Obtains the transaction details from paypal
//   paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//       //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
//     if (error) {
//         console.log(error.response);
//         throw error;
//     } else {
//         console.log(JSON.stringify(payment));
//         res.send('Success');
//     }
// });
// });
// router.get('/cancel', (req, res) => res.send('Cancelled'));
router.get('/getpaypal',(req,res)=>{
 
  const data="AYbFwlKTKFDURTefOs4wn0Kv9rJort0nCSVA8iAGMo9MHcJfbUjX_v2haOoLeirBd6K6YEzlRfxPQWXl"
  res.send({id:data})
})
router.post('/validatereferal',(req,res)=>{
  try{
    userHelpers.checkReferal(req.body).then((response)=>{
      res.send(response)
    })
  }catch(err){

  }
})
// =============================================================Coupen========================================================
router.get('/showcoupen',async(req,res)=>{
  try{
    const data=await userHelpers.getCoupen()
    console.log(data)
    res.send(data)
    
  }catch(err){

  }

})
router.get('/checkcoupen/:id',(req,res)=>{
  const token = req.cookies.usertoken;
    const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
    userId = verify.client.id;
  try{
    userHelpers.checkCoupen(userId,req.params.id).then((response)=>{

    })

  }catch(err){

  }
})
router.post('/updatestatus',(req,res)=>{
  console.log(req.body)
  const token = req.cookies.usertoken;
    const verify = jwt.verify(token, process.env.jwt_PASSWORD_USER);
    userId = verify.client.id;
  try{
    userHelpers.updateTheDiscount(userId,req.body).then((response)=>{
      res.send(response)
    })

  }catch(err){

  }
})
module.exports = router;

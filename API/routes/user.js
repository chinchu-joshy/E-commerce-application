var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userHelpers = require("../helpers/userHelpers");
const userHelper = require("../helpers/userHelpers");

/* GET home page. */
router.get("/logged", async (req, res) => {
  const token = req.cookies.usertoken;
  console.log(req.cookies.usertoken)

  try {
    if (!token) return res.send({ status: false });
    const verify =  jwt.verify(
      req.cookies.usertoken,
      process.env.jwt_PASSWORD_USER
    );
   
    if (verify) {
      userHelpers.findBlocked(verify.client.id).then((response)=>{
        res.send(response);

      })
       
    }
    
      
    
  } catch (err) {
    console.log(err)
    res.send({ status: false });
  }
});
router.post("/register", function (req, res, next) {
 
  if (
    req.body.email &&
    req.body.password &&
    req.body.email &&
    req.body.dob &&
    req.body.phone
  ) {
    userHelper.registerUser(req.body).then((response) => {
      console.log(response)
      res.send({ status: true });
    });
  } else {
    res.send({ error: "Please fill the empty field", status: false });
  }
});
router.post("/login", function (req, res) {
  if (req.body.email && req.body.password) {
    userHelper.loginUser(req.body).then((response) => {
      if (response.status === true) {
        const token = jwt.sign(
          { client:{id:response.user._id,state:response.user.state }},
          process.env.jwt_PASSWORD_USER
        );
        
        res.cookie("usertoken", token, {}).send({ status: true });
      } else {
        res.send({ error: "Invalid email or password", status: false });
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
router.get('/getviewproduct/:id',(req,res)=>{
  console.log(req.params.id)
  userHelpers.userFind(req.params.id).then((response)=>{
    res.send(response)
  })
})
module.exports = router;

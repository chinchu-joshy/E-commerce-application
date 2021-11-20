const jwt=require('jsonwebtoken')

module.exports={
    Auth:async(req,res,next)=>{
        const token=req.cookies.admintoken
        
        try{

            
            if(!token) return res.send({status:false})
            const verify=await jwt.verify(req.cookies.admintoken,process.env.jwt_PASSWORD_ADMIN)
          
            if(verify){
             next()
             res.send({status:true})

              }


        }catch(err){
            res.send({status:false})

        }
       
   
    }
}
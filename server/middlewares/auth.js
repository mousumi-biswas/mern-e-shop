const admin = require('../firebase')
const User =require('../models/User')

// for getting token from the firebase
exports.authCheck =async (req,res,next) => {
    //console.log(req.headers); //token
   try{
       const firebaseUser = await admin
       .auth()
       .verifyIdToken(req.headers.authtoken)
        console.log(firebaseUser)
        req.user=firebaseUser
        next()
   }catch(err) {
       res.status(401).json({
           err: "Invalid or expired token"
       })
   }

}

// for getting user role
exports.adminCheck = async (req,res,next)=>{
    const {email} = req.user

    const adminUser = await User.findOne({email}).exec();

    if(adminUser.role !== "admin"){
        res.status(403).json({
            err: "Admin Resource. Access Denied"
        })
    } else {
        next()
    }

}
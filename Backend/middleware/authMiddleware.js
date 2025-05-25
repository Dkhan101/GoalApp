const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect =async (req,res,next)=>{
let token

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        token=req.headers.authorization.split(' ')[1]
        console.log(token)

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        req.user =await User.findById(decoded.id).select('-password')
        console.log(req.user)
        next()
    }
    catch(e){
        console.log(e)
        res.status(401).json({message:"Not Authorized"})
    }
}
if(!token){
    res.status(401).json({message:"Not Authorized no token"})
}
}

module.exports = {protect}
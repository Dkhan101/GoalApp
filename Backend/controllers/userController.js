const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 
const User = require('../models/userModel')

const registerUser = async(req,res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({
            message:"Please fill all fields"
        })
    }
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400).json({
            message :"User is already Exists"
        })
    }
    else{

    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

        if (user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token : generateToken(user._id)
           
            })

        }
        else{
        res.status(400).json({message:"Invalid"})
        }
    }
}


const loginUser = async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token : generateToken(user._id),
        })
    }
    else{
        res.status(400).json({message:"Invalid Credentials"})
    }
}
const generateToken = (id) =>{
   return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : '30d',
    })
}

const userDetails = async(req,res)=>{
        res.json({message:"User Details"})
        }

module.exports={
    registerUser,
    loginUser,
    userDetails,
}
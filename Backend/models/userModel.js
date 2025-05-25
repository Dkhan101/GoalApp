const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Add UserName"]
    },
    email:{
        type:String,
        required:[true,"Please Add Email"]
    },
    password:{
        type:String,
        required:[true,"Please Add Password"]
    },
},
    {
    timestamps:true
    }
)
module.exports = mongoose.model('User',userSchema)
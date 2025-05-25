const mongoose = require('mongoose')
const mongoDB =()=>{
 mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`Database Connected Successfully`)
})
.catch((err)=>{
    console.log(err.message)
})
}

module.exports = mongoDB
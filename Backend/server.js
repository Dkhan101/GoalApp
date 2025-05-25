const express = require('express')
const dotenv = require('dotenv').config()
// const cors = require('cors')
const mongoDB = require('./config/db')
const Port = process.env.PORT || 5000

const app = express()

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

mongoDB()

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/user',require('./routes/userRoutes'))

app.listen(Port,()=>{
    console.log(`Server Started on Port ${Port}`)
})
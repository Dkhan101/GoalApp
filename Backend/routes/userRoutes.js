const express = require('express')
const router = express.Router()
const {registerUser,loginUser,userDetails} = require('../controllers/userController')
const {protect }= require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me', protect,userDetails)

module.exports = router

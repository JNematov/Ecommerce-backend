const express = require('express')
const { loginUser, signupUser, getUsers } = require('../controllers/userController')
const userRouter = express.Router()

userRouter.route('/').get(getUsers)
userRouter.route('/login').post(loginUser)
userRouter.route('/signup').post(signupUser)

module.exports = userRouter
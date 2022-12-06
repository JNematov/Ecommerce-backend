const userModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const createToken = async (_id) => {
    const token = jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
    return token
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    const user = await userModel.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({email, token})
}

const signupUser = async (req, res) => {
    const {email, password} = req.body
    const user = await userModel.signup(email, password)
    const token = createToken(user._id)
    res.status(200).json({email, token})
}

const getUsers = async (req, res) => {
    const users = await userModel.find()
    res.status(200).json(users)
}

module.exports = {loginUser, signupUser, getUsers}
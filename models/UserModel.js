const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userModel.statics.signup = async function(email, password){
    //check for empty fields
    if(!email || !password){
        throw Error('Error: empty fields')
    }
    //check for valid email
    if(!validator.isEmail(email)){
        throw Error('Error: invalid email')
    }
    //check password strenght
    if(!validator.isStrongPassword(password)){
        throw Error('Error: Password not strong enough')
    }

    //check for existing account
    const exists = await this.findOne({email: email});
    if(exists){
        throw Error('Error: user already registered')
    }

    //create salt
    const salt = await bcrypt.genSalt(10)
    //hash password with salt
    const hash = await bcrypt.hash(password, salt)

    //return user object
    const user = await this.create({email, password: hash})
    return user;
}

userModel.statics.login = async function(email, password){
    //check fields are not empty
    if(!email || !password){
        throw Error('Error: empty fields')
    }

    //search for user by email
    const user = await this.findOne({email : email})
    if(!user){
        throw Error('Incorrect email')
    }

    //once user found, match user's password with input password
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Error: incorrect password')
    }
    return user;

}

module.exports = mongoose.model('User', userModel)
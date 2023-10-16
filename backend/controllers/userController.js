const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const {StatusCodes} = require('http-status-codes');
const {UnauthenticatedError} = require('../errors');

const register = async (req, res, next) => {
    console.log(req.body);
    const user = await User.create({...req.body})
    const token = user.createJWT();
    res
        .status(StatusCodes.CREATED)
        .json({user:{ name:user.name }, token})


}

const login = async (req, res, next) => {
    const {username, email, password, confirmPassword} = req.body;
    
    const user = await Users.findOne({email}) 
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }
}

module.exports = {register, login}
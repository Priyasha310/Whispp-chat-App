const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res, next) => {
    console.log(req.body);
    // const user = await User.create({...req.body})    
    const {username, email,  password, confirmPassword} = req.body; 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
    // const token = user.createJWT();
    res
        .status(StatusCodes.CREATED)
        .json({user:{ usernname:user.username, email: user.email }})

}

module.exports = {register}
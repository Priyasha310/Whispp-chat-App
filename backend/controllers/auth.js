const User = require('../models/userModel');
const {StatusCodes} = require('http-status-codes');
const { NotFoundError, BadRequestError, UnauthenticatedError } = require("../errors");
require('dotenv').config();

const register = async (req, res, next) => {
    const {username, email,  password, confirmPassword} = req.body;

    if(!username || !password){
      throw new BadRequestError('Please provide required information')
    }

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already taken", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    if(password!= confirmPassword)
      return res.json({msg: "Password and Confirm Password must be same", status: false});

    const user = await User.create({...req.body});

    const token = user.createJWT();
    res
        .status(StatusCodes.CREATED)
        .json({status:true,  user, token})

}


const login = async (req, res, next) => {
  const {username, password} = req.body;
    
    if(!username || !password){
        throw new BadRequestError('Please povide your credentials')
    }
    
    //compare password
    const user = await User.findOne({username})
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = user.createJWT();
    res
        .status(StatusCodes.OK)
        .json({status:true, user:{username:user.username}, token})

}
module.exports = {register, login}
const User = require('../models/userModel');
const {StatusCodes} = require('http-status-codes');
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
        return res.json({msg:'Please povide your credentials', status:false})
    }
    
    //compare password
    const user = await User.findOne({username})
    if(!user){
        return res.json({msg:'Invalid credentials', status:false})
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        return res.json({msg:'Invalid credentials', status:false})
    }
    const token = user.createJWT();
    res
        .status(StatusCodes.OK)
        .json({status:true, user, token})

}


const setProfile = async (req, res, next) => {
  try{
    const userId = req.params.id;
    console.log("userId: ", userId);
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true, 
      avatarImage,
    })
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage
    })
  }catch(ex){
    next(ex)
  }
}
module.exports = {register, login, setProfile}
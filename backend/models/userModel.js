const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type:String, 
        required: [true, 'Username must be provided'],
        minLength:4, 
        maxLength: 20,
        unique:true,
    },
    email: {
        type:String, 
        required: [true,'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 3,
    },
    confirmPassword: {
        type:String, 
        // required: [true, 'Confirm Password must be provided']
    },
    isAvatarImage: {
        type: Boolean, 
        default: false,
    },
    avatarImage: {
        type: String, 
        default: "",
    },
})

userSchema.pre('save', async function(next){    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
    next();
})

//to keep all logic at one place in model rather than in controllers
//in the "function", we can access the document by using "this"
userSchema.methods.createJWT = function () {
    return jwt.sign(
        {userId:this._id, name:this.username}, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    )
}

module.exports = mongoose.model('Users', userSchema);
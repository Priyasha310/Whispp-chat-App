const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type:String, 
        required: [true, 'Username must be provided'],
        min:4, 
        max: 20,
        unique:true,
    },
    email: {
        type:String, 
        require4d: [true,'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        min: 3,
    },
    confirmPassword: {
        type:String, 
        required: [true, 'Confirm Password must be provided']
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

// userSchema.pre('save', async function(next){
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// })

// userSchema.methods.createJWT = function () {
//     return jwt.sign(
//         {userId:this._id, name:this.name}, 
//         process.env.JWT_SECRET,
//         {expiresIn: process.env.JWT_LIFETIME}
//     )
// }

// userSchema.methods.comparePassword = async function(candidatePassword){
//     const isMatch = await bcrypt.compare(candidatePassword, this.password)
//     return isMatch
// }

module.exports = mongoose.model('Users', userSchema);
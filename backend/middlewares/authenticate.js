const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel')
const catchAsyncError=require('./catchAsyncError');
const jwt = require('jsonwebtoken');


exports.isAuthenticateUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies 
    if (!token) {
        return next(new ErrorHandler('login first handle to resource',401))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET) //get a user id 
    req.user= await User.findById(decoded.id) //get user data using user id
    next();
})

exports.authorizeRoles = (...roles) =>{
    return (req,res,next)=>{
         if (!roles.includes(req.user.role)) {
             return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401))
         }
         
         next();
     }
 }
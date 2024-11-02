const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwt');
const ErrorHandler = require('../utils/errorHandler')
const sendEmail = require('../utils/email');
const crypto = require('crypto');


exports.registerUser = catchAsyncError(async (req,res,next)=>{
    const {name, email,password} = req.body;
    

    let avatar;
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV ==="production") {
      BASE_URL = `${req.protocol}://${req.get('host')}`
    }
   if (req.file) {
      avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
   }
    const user =  await User.create({
        name,
        email,
        password,
        avatar
    })

    sendToken(user,201,res)
})


exports.loginUser = catchAsyncError(async (req,res,next)=>{
    const {email,password} = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('please enter email & password',400))
     }
     //finding the user data from database
     const user = await User.findOne({email}).select('+password')
  
     if (!user) {
        return next(new ErrorHandler('invalid password & email',401))
     }
  
     if (!await user.isValidPassword(password)) {
        return next(new ErrorHandler('invalid password & email',401))
     }
     sendToken(user,201,res)
})

exports.logOutUser=(req,res,next)=>{
   
    res.cookie('token',null,{
       expires:new Date(Date.now()),
       httpOnly:true
    })
    .status(200)
    .json({
       success:true,
       message:"LoggedOut"
    })
}

exports.forgotPassword = catchAsyncError(async (req,res,next)=>{
    const user =  await User.findOne({email:req.body.email})
 
    if (!user) {
       return next(new ErrorHandler('user not found with this email',404))
    }
    const resetToken=user.getResetToken();
    await user.save({validateBeforeSave:false})
 

    let BASE_URL = process.env.FRONTEND_URL;
    if (process.env.NODE_ENV ==="production") {
      BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    // create reset url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`
 
    const message = `your password reset url is as follows \n\n
    ${resetUrl} \n\nif you have not requested this email,then ignore it.`;
    try {
 
       sendEmail({
          email:user.email,
          subject:"Shopie cart password recovery",
          message
       })
       res.status(200).json({
          success:true,
          message:`email send to ${user.email}`
       })
    }
     catch (error) {
       user.resetPasswordToken= undefined;
       user.resetPasswordTokenExpire=undefined;
       await user.save({validateBeforeSave:false});
       return next(new ErrorHandler(error.message),500)
    }
 })


 exports.resetPassword =catchAsyncError(async (req,res,next)=>{
   
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    console.log(resetPasswordToken);

     const user = await User.findOne(
      {resetPasswordToken,
      resetPasswordTokenExpire:{
         $gt:Date.now()
      }
   })
   if (!user) {
      return next(new ErrorHandler('password reset token invalid or expired'))
   }
   if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler('password does not match'))
   }
   user.password = req.body.password;
   user.resetPasswordToken=undefined;
   user.resetPasswordTokenExpire =undefined;
   
   await user.save({validateBeforeSave:false})
         sendToken(user,201,res)
   })


   exports.getUserProfile=catchAsyncError(async(req,res,next)=>{
      const user = await User.findById(req.user.id)
      res.status(200).json({
         success:true,
         user
      })
   })
   
   exports.changePassword = catchAsyncError(async(req,res,next)=>{
      const user = await User.findById(req.user.id).select('+password')
   
      //check old password
      if (!await user.isValidPassword(req.body.oldPassword)) {
         return next(new ErrorHandler('old password is incorrect',401))
      }
   
      //Assigning new password
   
      user.password =req.body.password;
      await user.save();
   
   res.status(200).json({
         success:true,
      })
   })
   

   exports.updateProfile = catchAsyncError(async (req,res,next)=>{
      let newUserData = {
         name:req.body.name,
         email:req.body.email
      }
   
      let avatar;
      let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV ==="production") {
      BASE_URL = `${req.protocol}://${req.get('host')}`
    }
      if (req.file) {
         avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
         newUserData = {...newUserData,avatar}
      }
   
   
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
         new:true,
         runValidators:true,
      })
      res.status(200).json({
         success:true,
         user
      })
   })

   exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
      const users = await User.find();
      res.status(200).json({
         success:true,
         users
      })
   })
   

   exports.getUser = catchAsyncError(async(req,res,next)=>{
      const user = await User.findById(req.params.id)
      if (!user) {
         return next(new ErrorHandler(`user not found with this id ${req.params.id}`))
      }
      res.status(200).json({
         success:true,
         user
      })
   })
   
   //Admin: update user       {{base_url}}/api/v1/admin/user/:id
   exports.updateUser =catchAsyncError(async(req,res,next)=>{
      const newUserData = {
         name:req.body.name,
         email:req.body.email,
         role:req.body.role
      }
      
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
         new:true,
         runValidators:true,
      })
      res.status(200).json({
         success:true,
         user
      })
   })
   
   //Admin: delete user    {{base_url}}/api/v1/admin/user/:id
   exports.deleteUser=catchAsyncError(async(req,res,next)=>{
      const user = await User.findById(req.params.id)
      if (!user) {
         return next(new ErrorHandler(`user not found with this id ${req.params.id}`))
      }
      await user.deleteOne();
      res.status(200).json({
         success:true
      })
   })
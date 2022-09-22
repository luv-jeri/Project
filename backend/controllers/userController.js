const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary"); 


// register user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
   
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder:"avatars",
    width:150,
    crop:"scale",
  })
    const {name, email, password, role} = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        role,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    });
    sendToken(user, 201, res);

})


//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new ErrorHandler("Please enter the email & password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(
        new ErrorHandler("Invalid email or password", 401)
      );
    }
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(
        new ErrorHandler("Invalid email & password", 401)
      );
    }
    sendToken(user, 200, res);
  });

  // logout 
  exports.logout = catchAsyncErrors(async (req,res, next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    } );
    res.status(200).json({
        success: true,
        message:"Logout Success"

    })
  })

  //forget password

 exports.forgetPassword = catchAsyncErrors(async(req, res, next)=>{
  const user = await User.findOne({email:req.body.email});

  if(!user){
    return next(new ErrorHandler("user not found with this email ", 404));

  }

  //Get ResetPassword token

  const resetToken = user.getResetToken();
  await user.save({
    validateBeforeSave: false
  });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n${resetPasswordUrl} \n\n If you have not requested to reset password then please ignore it....`;

  try{
        await sendEmail({
            email : user.email,
            subject:`Restaurant password recovery`,
            message,
        });

        res.status(200).json({
          success:true,
          message: `Email send to ${user.email} successfully`,
        });
  }
  catch(error){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;



    await user.save({
      validateBeforeSave: false
    });

    return next(new ErrorHandler(error.message))
  }



 })


// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400 )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
 // get user details

 exports.userDetails = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
 });

 // update user password
 
 exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if(!isPasswordMatched){
    return next(
      new ErrorHandler("old password is incorrect", 400)
    );
  };
  if(req.body.newPassword !== req.body.confirmPassword){
    return next(
      new ErrorHandler("password not match with each other",400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user,200, res);

 })

 // update user profile
exports.updateProfile = catchAsyncErrors(async(req,res,next) =>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };
  if (req.body.avatar !==""){
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder:"avatars",
      width:150,
      crop:"scale",
    })
  

  newUserData.avatar={
    public_id:myCloud.public_id,
    url:myCloud.secure_url,
  }
}

  

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

 //Get All User --- Admin

 exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
  const users = await User.find();

  res.status(200).json({
    success:true,
    users,
  })
 })

// get single user details --admin

exports.getSingleUser = catchAsyncErrors(async(req, res, next)=>{
  const user = await User.findById(req.params.id);
  if(!user){
     return next(new ErrorHandler("User is not Found by this Id", 404))
  }
     res.status(200).json({
        success:true,
        user,
     })

  
});

   //Change user Role

   exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    //add cloudinary letter then giving condition for avatar
  
  
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false,
    });
  
  
    res.status(200).json({
      success:true,
      user,
    })
   })

   //delete user --  admin

   
   exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
  if(!user){
    return next(ErrorHandler(`User is not found ${req.params.id}`,400));
  }
  await user.remove();
  
    res.status(200).json({
      success:true,
      message:`user ${user.id} remove successfully `
    })
   })
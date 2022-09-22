const ErrorHandler =  require ('../utils/errorHandler');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message  = err.message || "Internal server error";

      // mongodb error
   if(err.name === "CastError"){
    const message = `Resources not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
   }


   //mongoose duplicate key error

   if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
   }

   
   // Wrong jwt error 
   
   if(err.name === "jsonWebTokenError"){
    const message = `Your Url is invalid please try again`;
    err = new ErrorHandler(message, 400);
   }
   

   //Jwt Expired error

   
   if(err.name === "TokenExpiredError"){
    const message = `Your Url is expired please try again`;
    err = new ErrorHandler(message, 400);
   } 

  
    res.status(err.statusCode).json({
        success:false,
        message: err.message,

    });
}

const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const apiFeatures = require('../utils/apiFeatures')
const cloudinary = require("cloudinary");


// create Product -- admin
exports.createProduct = catchAsyncErrors(async(req, res, next)=>{
  let images = [];
  
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
})

//update Product -- -admin

exports.updateProduct = catchAsyncErrors(async(req, res,next)=>
{
   let product = await Product.findById(req.params.id);
   if(!product){
      return  next(new ErrorHandler("Product is not found with this Id", 500))
      
   }
   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators:true,
      useUnified:false
   });
   res.status(200).json({
      success:true,
      product
   })

})
//delete product --admin

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
       return  next(new ErrorHandler("Product is not found with this Id", 500))
    }
    await product.remove();

    res.status(200).json({
       success:true,
       message:"product deleted successfully"
    })
 })



//get all products
exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{

    const resultPerPage = 10;
    const productCount = await Product.countDocuments();

    const apiFeature = new apiFeatures(Product.find(), req.query).search().filter();

    let products = await apiFeature.query;
    let filterProductCount = products.length;
    

    apiFeature.pagination(resultPerPage);

    

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filterProductCount
    })
})


//get single product

exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        
        return next(new ErrorHandler("Product is not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})



// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);



  const isReviewed = product.reviews.find(
    (rev) => rev.user === req.user._id.toString()
   
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
 });

// Get All reviews of a single product
exports.getSingleProductReviews = catchAsyncErrors(async (req, res, next) => {
   const product = await Product.findById(req.query.id);
 
   if (!product) {
     return next(new ErrorHandler("Product is not found with this id", 404));
   }
 
   res.status(200).json({
     success: true,
     reviews: product.reviews,
   });
   
 });
 
 // Delete Review --Admin
 exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
   const product = await Product.findById(req.query.productId);
 
   if (!product) {
     return next(new ErrorHandler("Product not found with this id", 404));
   }
 
   const reviews = product.reviews.filter(
     (rev) => rev._id.toString() !== req.query.id.toString()
   );
 
   let avg = 0;
 
   reviews.forEach((rev) => {
     avg += rev.rating;
   });
 
   let ratings = 0;
 
   if (reviews.length === 0) {
     ratings = 0;
   } else {
     ratings = avg / reviews.length;
   }
 
   const numOfReviews = reviews.length;
 
   await Product.findByIdAndUpdate(
     req.query.productId,
     {
       reviews,
       ratings,
       numOfReviews,
     },
     {
       new: true,
       runValidators: true,
       useFindAndModify: false,
     }
   );
 
   res.status(200).json({
     success: true,
   });
 });


 
//get by products category
exports.getProductCategory = catchAsyncErrors(async(req,res,next)=>{


  const products = await Product.find().populate('category');

  


  res.status(200).json({
    success: true,
    products,
  
})
});


//get  product  admin

exports.getAdminProduct= catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.find();
 

  
  if(!product && !users){
      
      return next(new ErrorHandler("Product is not found with this Id", 404));
  }

  res.status(200).json({
      success: true,
      product
  })
})

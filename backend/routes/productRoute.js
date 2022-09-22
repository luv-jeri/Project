const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct,getProductDetails, createProductReview,getSingleProductReviews, deleteReview } = require('../controllers/productController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');


const router = express.Router();


//create product route -- admin
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"),createProduct);
//update product route ---admin
router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
//delete product route ---admin
router.route("/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);


// get all Products
router.route("/products").get(getAllProducts); 
// get single product
router.route("/product/:id").get(getProductDetails); 

router.route("/product/review").post(isAuthenticatedUser,createProductReview)

router.route("/product/reviews").get(getSingleProductReviews)

router.route("/product/reviews").delete(isAuthenticatedUser, deleteReview)


module.exports = router;
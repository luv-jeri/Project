const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct,getProductDetails, createProductReview,getSingleProductReviews, deleteReview, getProductCategory, getAdminProduct } = require('../controllers/productController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');


const router = express.Router();


//create product route -- admin
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"),createProduct);
//update product route ---admin
router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
//delete product route ---admin
router.route("/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"), getAdminProduct); 

// get all Products
router.route("/products").get(getAllProducts); 

// get product by category
router.route('/products/category').get(getProductCategory)

//get single product details
router.route("/product/:id").get(getProductDetails); 

//create product reviews

router.route("/product/review").post(isAuthenticatedUser,createProductReview);

//get single product review

router.route("/product/reviews").get(getSingleProductReviews);

//user update reviews
router.route("/product/reviews").delete(isAuthenticatedUser, deleteReview)



module.exports = router;
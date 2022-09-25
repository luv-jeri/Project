const express = require("express");
const {
  addToWishlist,
  getWishlistData,
  removeWishlistData,
  addToCart,
  getCartData,
  updateCart,
  removeCartData,
} = require("../controllers/CartController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


//  user get their  wishlist
router.route("/wishlist").get(isAuthenticatedUser, getWishlistData);

//  user create their  wishlist
router.route("/addToWishlist").post(isAuthenticatedUser, addToWishlist);

//  user delete their  wishlist
router
  .route("/removeWishlist/:id")
  .delete(isAuthenticatedUser, removeWishlistData);

  
//  user add product to their cart
router.route("/addToCart").post(isAuthenticatedUser, addToCart);

//  user get product to their cart
router.route("/cart").get(isAuthenticatedUser, getCartData);

//  user update product to their cart
router.route("/cart/update/:id").put(isAuthenticatedUser, updateCart);


//  user delete product to their cart
router.route("/removeCart/:id").delete(isAuthenticatedUser, removeCartData);

module.exports = router;

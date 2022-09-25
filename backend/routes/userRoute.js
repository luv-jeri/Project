const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgetPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  getAllRestaurants,
} = require("../controllers/userController");
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();


//user Registration 
router.route("/register").post(registerUser);

//user login
router.route("/login").post(loginUser);

//user logout
router.route("/logout").get(logout);

// user forget password
router.route("/password/forgot").post(forgetPassword);

//user  reset their password
router.route("/password/reset/:token").put(resetPassword);

//user get his details
router.route("/me").get(isAuthenticatedUser, userDetails);

//user update his password
router.route("/me/update").put(isAuthenticatedUser, updatePassword);

//user update his profile
router.route("/me/update/info").put(isAuthenticatedUser, updateProfile);

//user get all restaurant list
router.route("/restaurants").get(getAllRestaurants);




//admin get all users
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

  //admin get single user
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);


  //admin update user role
router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);


  //admin delete user
router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

  

module.exports = router;

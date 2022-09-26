const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//user create order 
router.route("/order/new").post(isAuthenticatedUser, newOrder);

//user find his single order
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

//user get his all order
router.route("/orders/me").get(isAuthenticatedUser, myOrders);


//admin recieve user order
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

  //admin get user single order details
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  // admin delete order
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;

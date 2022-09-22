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


router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/seller/orders")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getAllOrders);

router
  .route("/seller/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("seller"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("seller"), deleteOrder);

module.exports = router;

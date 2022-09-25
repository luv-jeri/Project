const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const router = express.Router();
const {isAuthenticatedUser} = require("../middleware/auth");

// payment process
router.route("/payment/process").post(isAuthenticatedUser, processPayment);

//stripe key

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);


module.exports = router;
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {createOrder} = require("../controllers/Order");
const{auth}=require("../middlewares/Auth");


router.post("/create-order",auth,createOrder);
module.exports = router


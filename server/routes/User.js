const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {signup,login,nounce}= require("../controllers/Auth")
const{auth}=require("../middlewares/Auth");

router.post("/signup", signup);
router.post("/login",login);
router.post("/nounce",nounce);
module.exports = router
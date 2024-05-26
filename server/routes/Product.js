const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
createProduct,
deleteproduct,
updateproduct,
getAllProducts
} = require("../controllers/Product");
const{auth}=require("../middlewares/Auth");

const {
    createCategory
}=require("../controllers/Category")

router.post("/create-category",auth,createCategory);

router.post("/create-product",auth,createProduct);

// router.put("/update-product",updateproduct);
router.get("/get-product",getAllProducts);

module.exports = router


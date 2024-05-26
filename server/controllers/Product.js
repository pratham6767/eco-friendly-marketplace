const product = require("../models/Products");
const Category = require("../models/Category");
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createProduct = async (req, res) => {
    try {
      // Get user ID from request object
      const userId = req.user.payload.id
  
      // Get all required fields from request body
      let {
        productName,
        description,
        price,
        quantityAvailable,
        categoryName,
        unitOfMeasure,
      } = req.body
      // Get thumbnail image from request files
      const image = req.files.image
  
      
      // Check if any of the required fields are missing
      if (
        !productName||
        !description ||
        !price ||
        !quantityAvailable ||
        !categoryName ||
        !unitOfMeasure||
        !image
      ) {
        return res.status(400).json({
          success: false,
          message: "All Fields are Mandatory",
        })
      }
      
      // Check if the user is an instructor
      const sellerDetails = await User.findOne({
        _id: userId,
        $or: [
            { accountType: "Farmer" },
            { accountType: "Government" }
        ]
      });    
  
      if (!sellerDetails) {
        return res.status(404).json({
          success: false,
          message: "Seller Details Not Found",
        })
      }
  
      // Check if the tag given is valid
      const categoryDetails = await Category.find({name:categoryName})
      if (!categoryDetails) {
        return res.status(404).json({
          success: false,
          message: "Category Details Not Found",
        })
      }
      // Upload the Thumbnail to Cloudinary
      const productImage = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME
      )
      console.log(productImage)
      // Create a new course with the given details
      const newProduct= await product.create({
        productName:productName,
        description:description,
        price:price,
        quantityAvailable:quantityAvailable,
        seller:sellerDetails._id,
        unitOfMeasure:unitOfMeasure,
        image:productImage.secure_url,
      })
  
      // Add the new course to the User Schema of the seller
      await User.findByIdAndUpdate(
        {
          _id: sellerDetails._id,
        },
        {
          $push: {
            product: newProduct._id,
          },
        },
        { new: true }
      )
      // Add the new course to the Categories
      const categoryDetails2 = await Category.findByIdAndUpdate(
        { _id: categoryDetails._id },
        {
          $push: {
            products: newProduct._id,
          },
        },
        { new: true }
      )
      console.log("HEREEEEEEEE", categoryDetails2)
      // Return the new course and a success message
      res.status(200).json({
        success: true,
        data: newProduct,
        message: "Product Created Successfully",
      })
    } catch (error) {
      // Handle any errors that occur during the creation of the course
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to create product",
        error: error.message,
      })
    }
}

//edit product
exports.editProduct = async (req, res) => {
  try{
    
  }catch(err){

  }
}

//update after buy

//get all product by the individual sellar

exports.getSellerProducts=async(req,res)=>{
  const userId=req.user.id;

  const myProducts = await product.find({ seller: userId })
      .select('productName category price quantityAvailable');
  console.log(myProducts)

}


exports.getAllProducts = async (req, res) => {
    try {
      const allProducts = await product.find(
        {},
        {
            productName:true,
            description:true, 
            price:true,
            quantityAvailable:true,
            
            unitOfMeasure:true,
            
            image:true,
        }
      )
        .populate("seller")
        .exec()
  
      return res.status(200).json({
        success: true,
        data: allProducts,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Product Data`,
        error: error.message,
      })
    }
}

exports.deleteProduct=async(req,res)=>{
  try {
    const { productId } = req.body;
    const userId = req.user.id;
  
    // Find the product by ID and populate the category
    const findproduct = await product.findById(productId).populate('category');
    
    // Check if the product exists
    if (!findproduct) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
  
    const categoryId = findproduct.category._id; // Get the category ID from the populated category
  
    // Check if the user is the owner of the product
    const isOwner = findproduct.seller.toString() === userId.toString();
    if (isOwner) {
      // Remove product ID from Category's products array
      await Category.updateOne(
        { _id: categoryId },
        { $pull: { products: productId } }
      );
  
      // Remove product ID from User's product array
      await User.updateOne(
        { _id: userId },
        { $pull: { product: productId } }
      );
  
      return res.status(200).json({
        success: true,
        message: "Product successfully removed from category and user",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "User is not the owner of the product",
      });
    }
  } catch (error) {
    console.error('Error removing product:', error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while removing the product",
    });
  }
  
}

exports.getAllProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // Assuming the category ID is passed as a URL parameter

    // Find the category by ID and populate the products field
    const category = await Category.findById(categoryId).populate('products');
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Return the list of products
    return res.status(200).json({
      success: true,
      products: category.products,
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the products",
    });
  }
};

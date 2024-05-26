const { Mongoose } = require("mongoose");
const Order=require("../models/Order");
const User=require("../models/User");
const Product=require("../models/Products");


exports.createOrder = async (req, res) => {

  try {
    const productId=req.body.products;
    //console.log(productId);
    const userId=req.user.payload.id;
    console.log(userId);
    const ProductDetails = await Product.findById({
      _id:productId
    });  
      console.log(ProductDetails);
    const CoustmerDetail = await User.findById({
      _id: userId
    });    
    console.log(CoustmerDetail);
    if (!CoustmerDetail) {
      return res.status(404).json({
        success: false,
        message: "CUSTOMER Details Not Found",
      })
    } 

    const { 
      customer,
      products,
      orderTotal
    } = req.body;
      //console.log(productName);
      if (
    !customer||
    !products||
    !orderTotal
        ) {
        return res.status(400).json({
          success: false,
          message: "All Fields are Mandatory",
        })
      };
      const newOrder= await Order.create({
        products:ProductDetails._id,
        customer:CoustmerDetail._id,
        orderTotal:orderTotal
      })
      await Order.findByIdAndUpdate(
        {
          _id: CoustmerDetail._id,
        },
        {
          $push: {
            product: newOrder._id,
          },
        },
        { new: true })
        res.status(200).json({
          success: true,
          data: newOrder,
          message: "order Created Successfully",
        })
    const savedorder = await Order.save();
    const updatedorder = await User.findByIdAndUpdate(
      customer,
      { $push: { order: savedorder._id }},
      { new: true }
    )
    res.status(200).json({ order: updatedorder , status : true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
};

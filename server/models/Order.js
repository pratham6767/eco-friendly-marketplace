// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products:
    {
        type:Array,
        required: true,
    },

  orderTotal: { type: Number, required: true },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  orderDate: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
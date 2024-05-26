const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [{
        product:
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
            required: true },
        quantity:
        { 
            type:Number, 
            required: true },
        price: 
        { 
            type: Number, 
            required: true 
        }
      }],
    totalPrice: 
    {
        type: Number, 
        required: true
    },
    status:
    {
        type: String, 
        enum: ['pending', 'shipped', 'delivered', 'canceled'], 
        default: 'pending'
    },
    order_date: 
    { 
        type: Date,
        default: Date.now 
    },
});

module.exports = mongoose.model('Order', orderSchema);

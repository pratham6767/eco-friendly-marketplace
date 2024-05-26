const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    quantityAvailable: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    unitOfMeasure: {
        type: String,
        required: true,
        enum: ['Kilograms', 'Units']
    },
    boughtBy:[{
        type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
    }],
    image:{
        type:String
    }
});

module.exports = mongoose.model('Product', ProductSchema);

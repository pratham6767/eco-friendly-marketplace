const mongoose = require("mongoose");
const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlenght: 50,
        trim: true
    },
    email: {
        type: String,
        require: true,
        maxlenght: 13,
        trim: true
    },
    message:[
        {
        type:String,
        require:true,
        trim:true
        }
    ]
});

module.exports = mongoose.model("contactUs",contactUsSchema);
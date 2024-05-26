const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        Firstname:
        {
            type:String,
            required:true
        },
        Lastname:
        {
            type:String,
            required:true
        },
        Address:
        {
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        accountType: 
		{
			type: String,
			enum: ["Customer","Farmer","Goverment","Admin"],
			required: true
		},
        blockChainAddress:
        {
            type:String,
            required:true
        },
        additionalDetails:{
            type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
        },
        product: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Products",
			},
		],
        token: {
			type: String,
		},
    }
)
module.exports = mongoose.model("User", UserSchema);
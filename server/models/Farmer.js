const mongoose = require("mongoose");
const FarmerSchema = new mongoose.Schema(
    {
        Farmername:
        {
            type:"String",
            required:true
        },
        Farmeradd:
        {
            type:String,
            required:true
        },
        Description:
        {
            typr:String,
            required:true
        },
        Certification:
        {
            type:String,
            required:true
        },
    }
)
module.exports = mongoose.model("Farmer", FarmerSchema);
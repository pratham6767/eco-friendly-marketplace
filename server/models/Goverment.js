const mongoose = require("mongoose");
const GovermentSchema = new mongoose.Schema(
    {
    OrganizationName:
    {
        type:String,
        required:true
    },
    organizationType:
    {
        type:String,
        required:true
    }
    }
)
module.exports = mongoose.model("Goverment", GovermentSchema);
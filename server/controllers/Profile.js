const Profile = require("../models/Profile");
const profile=require("../models/Profile");
const User=require("../models/User");

exports.createProfile=async(req,res)=>
    {
        try
        {
            const userId = req.user.payload.id;
            const{  User,
                    gender,
                    dateOfBirth,
                    about,
                    contactNumber}=req.body;
        if (!gender||
            !User||
            !dateOfBirth||
            !about||
            !contactNumber
            )return res.status(400).json({
            success: false,
            message: "All Fields are Mandatory",
            })
            const UserDetails = await User.findOne({
                _id: userId});    
              if (!UserDetails) {
                return res.status(404).json({
                  success: false,
                  message: "user Details Not Found",
                })
              }
              const newProfile= await Profile.create({
                User:userId,
                gender:gender,
                about:about,
                contactNumber:contactNumber
              })
              await User.findByIdAndUpdate(
                {
                  _id: UserDetails._id,
                },
                {
                  $push: {
                    product: newProfile._id,
                  },
                },
                { new: true })
                res.status(200).json({
                    success: true,
                    data: newProfile,
                    message: "Profile Created Successfully",
                  })}
        catch(error)
        {
            console.error(error)
            res.status(500).json({
              success: false,
              message: "Failed to create profile",
              error: error.message,
            })
        }
    }
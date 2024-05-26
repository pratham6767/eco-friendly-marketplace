const jwt=require("jsonwebtoken")
const ethers=require("ethers")
const User = require("../models/User");
const Profile = require("../models/Profile")
require("dotenv").config();
const crypto=require("crypto")

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
    try{
        const {email,Address,Lastname,Firstname,accountType } = req.body;
        
        if( !email||!Address||!Lastname||!Firstname||!accountType){
            return res.status(403).send({
                success: false,
                message: "All Fields are required",})
        }
       
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      } 

      // Generate a new Ethereum wallet
      const wallet = ethers.Wallet.createRandom();
       // Get the address and private key of the new wallet
      
       const blockChainAddress = wallet.address;
       const blockchainPrivateKey = wallet.privateKey;
       console.log(blockChainAddress);
       console.log(blockchainPrivateKey);
       // Save user data in MongoDB
       const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      })      
       const user = await User.create({ email,Address,Lastname,Firstname,accountType:accountType, blockChainAddress:blockChainAddress,additionalDetails: profileDetails._id});
       
 

  
       return res.status(200).json({
        success: true,
        user,
        message: "User registered successfully",
    });


    }catch(error){
        console.error(error);
      res.status(500).json({ message: 'User cannot be registerd' });

    }
}

exports.nounce = async (req, res) => {
  try {
    const { address } = req.body;
    const stringAddress = address.toString();
    const blockChainAddress=stringAddress
    
    const foundUser = await User.findOne({ blockChainAddress });

    console.log(foundUser);
    if (!foundUser) {
      return res.status(400).json({ message: 'Please register first' });
    }

    const nonce = crypto.randomBytes(32).toString('hex');
    res.status(200).json({ message: nonce });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.login=async(req,res)=>{
  try{
      
      const {data}=req.body;
      
      const signedMessage=data.signedMessage;
      const nonce=data.nonce;
      const address=data.address
      // console.log(signedMessage, nonce,  address);
    // const { signedMessage, nonce,  address } = req.body;
    // console.log(signedMessage, nonce, address)

    const recoveredAddress = ethers.utils.verifyMessage(nonce, signedMessage);
    
    // console.log("hii");
    console.log(recoveredAddress);
        if (recoveredAddress !== address) {
          return res.status(401).json({ error: 'Invalid signature' });
        }
        const user=await User.findOne({blockChainAddress:address})
      
        const payload={ email: user.email,address:user.blockChainAddress, id: user._id, accountType: user.accountType };
        const secretKey=process.env.JWT_SECRET;
        // console.log(secretKey);
        // Generate the JWT token
        const token = jwt.sign({payload}, secretKey, { expiresIn: '10h' });
        // console.log(payload);
        user.token=token;
        await user.save();
        
        res.cookie("token", token, { expiresIn: '10h' }).status(200).json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        })
        


      
  

  }catch(error){
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });


  }
}

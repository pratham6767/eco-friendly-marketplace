const express=require('express');
const app=express();
const userRoutes = require("./routes/User");
const productRoutes=require("./routes/Product");
const cors=require("cors")
const database=require("./config/Database");
const dotenv=require("dotenv");
dotenv.config();
const PORT=process.env.PORT || 5000;
const bodyParser = require('body-parser');

database.connect();
app.use(bodyParser.json());


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Your frontend URL
    credentials: true  // Allow credentials (cookies) to be sent in cross-origin requests
  }));
  

app.use("/api/v1/auth", userRoutes);

app.use("/api/v1/auth", productRoutes);
app.get("/",(req,res)=>
{
    return res.json(
        {
            success:true,
            messsage:'your server is up and running',
        }
    );
});

app.listen(PORT,()=>
{
    console.log(`server is connected succesfully at ${PORT}`);
});
const mongoose=require('mongoose');
require('dotenv').config();

exports.connect = () =>
{
    mongoose.connect(process.env.DATABASE_URL)
    .then(() =>
    {
        console.log("DB CONNECTED SUCCESFULLY");
    })
    .catch((Error) =>
    {
        console.log("DB CONNECTION FAILED");
        console.log(Error.message);
        process.exit(1);
    })
}
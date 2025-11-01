const mongoose=require("mongoose");
const URI=process.env.MONGO_URI;

const connectDb=async()=>{
    try {
        await mongoose.connect(URI);
        console.log("mongo")
    } catch (error) {
        console.log("connection failed");
    }
}
module.exports=connectDb;
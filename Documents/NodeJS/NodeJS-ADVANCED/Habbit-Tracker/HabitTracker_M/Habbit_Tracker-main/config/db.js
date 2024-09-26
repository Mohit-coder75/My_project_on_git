import mongoose from "mongoose";
const url = "mongodb+srv://pamohit47:NOpoRcjaMPXX5bZ7@cluster0.4jpy6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/registration";

// NOpoRcjaMPXX5bZ7
const connectDB = async ()=>{
    try{
        await mongoose.connect(url);
        console.log("Connected to Mongodb");
    }
    catch(err){
        console.log("Error connecting to mongodb",err.message);
    }
  

}
export default connectDB;

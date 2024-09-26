import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: {
            type:Number,
            required:true,
            unique:true,
        },
        name: { 
            type:String,
            required:true,
            unique:true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

//create  model from the schema..........

const UserModel = mongoose.model('User',userSchema);

//export the model..........
export default UserModel;
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
     name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 5,
      maxLength: 256,
      trim: true,
      required: true,
    },
    balance:Number,
    role:{
        type:String,
        enum:['OWNER','ADMIN','INVESTOR'],
        default:'OWNER'
    }
});



const User = mongoose.model('User',userSchema);

export default User;
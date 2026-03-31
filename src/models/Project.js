import { number, required } from "joi";
import mongoose, { Mongoose } from "mongoose";

const status = ['open, closed']
const projectSchema = mongoose.Schema({

    title:{
        type:String,
        trim:true,
        required: true,
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    capital:{
        type:Number,
        required:true,
    },
    status:{
        type: String,
        enum : status,
        default: 'open',
    },
    initialInvestement:{type:Number, required:true,trim:true,},
    maxInvestement:{type:Number, required:true,trim:true,},
    percentageInvestement:{type:Number, required:true,trim:true,},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    
});

const Project = new mongoose.model('Project',projectSchema)

export default Project;
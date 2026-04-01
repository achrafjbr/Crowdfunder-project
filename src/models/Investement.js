import mongoose from "mongoose";

const investementSchema = mongoose.Schema({

    investor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },

    amount:Number,
    
    date:{
        type:Date,
        default:Date.now,
    }
});

const Investement = new mongoose.model('Investement',investementSchema);

export default Investement;
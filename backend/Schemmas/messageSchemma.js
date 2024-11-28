import { Schema } from "mongoose";
import mongoose from "mongoose";

const messageSchemma = new Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    }
},{ timestamps: true })

export const messageModel = mongoose.model('message', messageSchemma);

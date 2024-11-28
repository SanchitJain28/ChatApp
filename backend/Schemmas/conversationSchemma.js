import mongoose, { Schema } from "mongoose";

const conversationSchemma = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "message",
            default:[]
        }
    ]
},
    { timestamps: true }
)

export const conversationModal =mongoose.model("conversation", conversationSchemma)
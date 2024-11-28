import { Schema } from "mongoose";
import mongoose from "mongoose";

const UserSchemma=new Schema({
    name:{
        type:String,
        required:true
      },
      phoneNo:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      }, // String is shorthand for {type: String}
      password:{
        type:String,
        required:true
      }
})

export const userModel=mongoose.model('user', UserSchemma);

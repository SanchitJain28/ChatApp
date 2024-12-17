import { Router } from 'express';
import { verifyUser } from '../middleware.js/verifyUser.js';
export const router = Router();
import { userModel as user } from '../Schemmas/UserSchemma.js';
import { messageModel as message } from '../Schemmas/messageSchemma.js';
import { conversationModal as conversation } from '../Schemmas/conversationSchemma.js';
import { body, param, validationResult,query } from "express-validator";
import { getReceiverId, io } from '../socket/socket.js';

router.get("/api/messagetest", async (req, res) => {
    res.send("This shit is running")
})

router.get('/api/searchuser',async(req,res)=>{
    const{search}=req.query
    if(!search){
       return res.send([])
    }
    try {
        const users=await user.find({
            $or:[
                {name: { $regex: `^${search}`, $options: 'i' }},
                {email: { $regex: `^${search}`, $options: 'i' }}
            ]            
        })
        res.send(users)
    } catch (error) {
        console.log(error)
    }
})

router.post("/api/sendmessage",
    body("message").notEmpty(),
    query("Chatuser").notEmpty(), verifyUser, async (req, res) => {
        const {Chatuser}=req.query
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        try {
            //find user by name or email
            if(!Chatuser){
                return res.send({errors:[{msg:"Please enter an user"}]})
            }
            const findUser = await user.findOne({
                $or: [
                    { name: Chatuser },
                    { email: Chatuser }
                ]
            })

            //finds the user by name
            if (!findUser) {
                return res.send("User cannot be found")
            }

            //Avoiding a major glitch
            if (findUser._id == req.user.user_id) {
               return res.send({errors:[{msg:"You cannot message yourselves currently,THIS FUNCTIONALITY IS DISABLED NOW"}]})
            }

            //this part sees if there is any converstaion ,if there is no conversation it creates a new conversation 
            let newConversation = await conversation.findOne({
                //$all helps to find all array elements given,
                //if all elements are there it will return true else it will return false
                participants: { $all: [req.user.user_id, findUser._id] }
            })

            if (!newConversation) {
                //create a new conversation
                newConversation = await conversation.create({
                    participants: [req.user.user_id, findUser._id],
                });
            }

            //creates a message
            const newMessage = new message({
                message: req.body.message,
                sender: req.user.user_id,
                receiver: findUser._id
            })

            //if there is a message,push to the current conversation
            if (newMessage) {
                newConversation.messages.push(newMessage._id);
            }

            //save the new message 
            await newMessage.save()

            //save the updated conversation
            await newConversation.save()

            //SOcket io functionality

            const recieverSocketId=getReceiverId(findUser._id)
            if(recieverSocketId){
                io.to(recieverSocketId).emit("newMessage",newMessage)
                console.log(recieverSocketId)
                console.log(newMessage)
            }
            res.send(newMessage)
        } catch (error) {
            console.log(error)
        }
    })

router.get("/api/getconversation", verifyUser, async (req, res) => {
    try {
        const messages = await conversation.find({
            participants: { $in: [req.user.user_id] }
        }).populate("participants")
        res.send(messages)
    } catch (error) {
        console.log(error)
    }
})

router.get("/api/getindividualconversation",verifyUser,async(req,res)=>{
    const {receiver}=req.query
    if(!receiver){
        return res.send({errors:[{msg:"Please send the receiver id to get the consverstation"}]})
    }
    try {
        const User=await user.findOne({email:receiver})
        if(!User){
            return res.send({errors:[{msg:"Sorry cant find the conservation"}]})
        }
        const messages=await conversation.find({
            participants:{ $all: [req.user.user_id,User._id] }
        }).populate("messages")
        if(messages.length==0){
            return res.send({errors:[{msg:"Sorry no message to display ,You have currently 0 messages with ${User.name}"}]})
        }
        res.send(messages)
    } catch (error) {
        console.log(error)
    }
})
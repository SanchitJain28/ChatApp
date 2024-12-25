import {Server} from "socket.io"
import express from 'express'
import http from 'http'
//HAr socket io me chiz same rahegi

export const app = express();
//HAr socket io me chiz same rahegi

export const server=http.createServer(app)
//HAr socket io me chiz same rahegi
export const io=new Server(server,{
    cors:{
        //frontend link jayegi isme
        origin:["https://instantchatify.netlify.app"],
        methods:["GET","POST"]
    }
})


const userSocketMap={}

export const getReceiverId=(receiverId)=>{
    return userSocketMap[receiverId]
}
io.on('connection',(socket)=>{
    console.log("a user connected",socket.id)

    const userId=socket.handshake.query.userId
    console.log(userId)
    if(userId!="undefined"){userSocketMap[userId]=socket.id}

    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    socket.on("disconnected",()=>{
        console.log("DIsconnected",socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))

    })
})
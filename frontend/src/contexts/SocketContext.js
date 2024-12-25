import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import { authAPI } from "./authContext";
import io from 'socket.io-client'
export const socketApi = createContext(null)


export function SocketContext(props) {
    const[socket,setSocket]=useState(null)
    const[onlineUsers,setOnlineUsers]=useState(null)
    const{loginInfo}=useContext(authAPI)
    useEffect(() => {
      if(loginInfo){
        //BACKEND URL
        const socket=io("https://chatapp-cwdy.onrender.com",{
            query:{
                userId:loginInfo._id
            }
        })
        setSocket(socket)
        socket.on("getOnlineUsers",(users)=>{
            setOnlineUsers(users)
        })
      }
      else{
        if(socket){
            socket.close()
            setSocket(null)
        }
      }
    }, [loginInfo])
    
    return (
        <socketApi.Provider value={{socket,setSocket,onlineUsers,setOnlineUsers}}>
            {props.children}
        </socketApi.Provider>
    )
}

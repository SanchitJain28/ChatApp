import { createContext, useState } from "react";
import React from 'react'
import SimpleAlert from "../components/alert";
export const chatAPI=createContext(null)

export  function ChatContext(props) {

    const[currentChat,setCurrentChat]=useState(localStorage.getItem("currentChat")?localStorage.getItem("currentChat"):null)
    const[alert,setAlert]=useState(false)

    const showAlert=()=>{
        return <SimpleAlert/>
    }

    const searchUser=async(search)=>{
        const url=`http://localhost:3001/api/searchuser?search=${search}`
        const response=await fetch(url,{
            method:"GET"
        })
        const data=await response.json()
        return data
    }

    const fetchConservation=async()=>{
        const url="http://localhost:3001/api/getconversation"
        const response=await fetch(url,{
            method:"GET",
            headers:{
                "auth-token":localStorage.getItem("userToken")
            }
        })
        const data=await response.json()
        return data
    }

    const sendMessage=async(user,message)=>{
        try {
            const url=`http://localhost:3001/api/sendmessage?Chatuser=${user}`
            const response=await fetch(url,{
                method:"POST",
                body:JSON.stringify({
                    message
                }),
                headers:{
                    "auth-token":localStorage.getItem("userToken"),
                    "content-type": "application/json"
                }
            })
            const data=await response.json()
            return data
        } catch (error) {
            console.log(error)
        }
       
    }


    const getIndividualConservation=async(recieverEmail)=>{
        try {
            const url=`http://localhost:3001/api/getindividualconversation?receiver=${recieverEmail}`
            const response=await fetch(url,{
                method:"GET",
                headers:{
                    "auth-token":localStorage.getItem("userToken")
                }
            })
            const data=await response.json()
            return data
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <chatAPI.Provider  value={{searchUser,currentChat,setCurrentChat,fetchConservation,sendMessage,alert,setAlert,showAlert,getIndividualConservation}}>
        {props.children}
    </chatAPI.Provider>
  )
}

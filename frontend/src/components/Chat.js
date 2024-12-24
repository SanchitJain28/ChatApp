import React, { useContext, useEffect, useState } from 'react'
import ButtonAppBar from '../ImportedComponents.js/Appbar'
import { Button, Fade, Grow, Input, ListItemButton, ListItemText, Slide, TextField, Zoom } from '@mui/material'
import { chatAPI } from '../contexts/ChatContext'
import {  useNavigate } from 'react-router-dom'
import { authAPI } from '../contexts/authContext'
import Login from './Login'
import { socketApi } from '../contexts/SocketContext'



export default function Chat() {
    const navigate = useNavigate()
    const chatContext = useContext(chatAPI)
    const authContext = useContext(authAPI)
    const socketContext = useContext(socketApi)
    const { searchUser, setCurrentChat, fetchConservation,alert } = chatContext
    const { loginInfo } = authContext
    const { onlineUsers, socket } = socketContext

    const [searchValue, setSearchValue] = useState("")
    const [searchedUsers, setSearchedUsers] = useState([])
    const [chats, setChats] = useState([])
    const fetchChats = async () => {
        const data = await fetchConservation()
        setChats(data)
        console.log(data)
    }
    useEffect(() => {
        fetchChats()
    }, [])
    useEffect(() => {
      if(!loginInfo){
        navigate("/")
      }
    }, [])
    
    const showChats=()=>{
        return chats.map((e) => {
            const Chatuser = e.participants.filter((event1) => {
                return event1._id !== loginInfo._id
            })
            return <>
            <Zoom in={true} timeout={750}>
                <div className='p-4 mb-2 border border-zinc-900 rounded-xl mr-2 ml-2 ' onClick={() => {
                    e.participants = Chatuser
                    localStorage.setItem("currentChat",e.participants[0].email)
                    setCurrentChat(e.participants[0].email)
                    navigate('/individualchat')
                }} >
                    <p className='text-xl'>{Chatuser[0].name}</p>
                    <p>{onlineUsers?.indexOf(Chatuser[0]._id) !== -1 ? <i class="fa-solid fa-globe"></i> : <>
                    <i className="fa-solid fa-globe "></i> <p className='text-red-600	'>Offline</p>
                     </>}</p>
                </div>
                </Zoom>
            </>
        })
    }
    const emptyChats=()=>{
        return <>
        <div className="flex">
            <p className='mx-4 text-xl font-bold' >No chats to show<br/>search users to start chatting</p>
        </div>
        </>
    }
    return (
        <>
            {loginInfo ? <>
                <ButtonAppBar message="" />
                <div className=" bg-black min-h-screen text-slate-300 p-4">
                    {/* <p className='text-2xl mx-4'>Your chats</p> */}
                    {chats.length==0 ? emptyChats() : showChats()}   
                </div>
            </> : <>
                <Login />
            </>}

        </>
    )
}

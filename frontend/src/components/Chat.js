import React, { useContext, useEffect, useState } from 'react'
import ButtonAppBar from '../ImportedComponents.js/Appbar'
import { Button, Input, ListItemButton, ListItemText, TextField } from '@mui/material'
import { chatAPI } from '../contexts/ChatContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { authAPI } from '../contexts/authContext'
import Login from './Login'
import { Card } from 'flowbite-react'
import { socketApi } from '../contexts/SocketContext'
import Divider from '@mui/material/Divider';
import SimpleAlert from './alert'


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
    return (
        <>
              {/* {alert && <SimpleAlert />} */}

            {console.log(onlineUsers)}
            {loginInfo ? <>
                <ButtonAppBar message="Chat" />
                <div className=" bg-zinc-800 min-h-screen text-slate-300 p-4">
                    {/* <p className='text-2xl mx-4'>Your chats</p> */}
                    {chats.map((e) => {
                        const Chatuser = e.participants.filter((event1) => {
                            return event1._id !== loginInfo._id
                        })
                        return <>
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
                        </>
                    })}
                </div>
            </> : <>
                <Login />
            </>}

        </>
    )
}

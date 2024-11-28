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


export default function Chat() {
    const navigate = useNavigate()
    const chatContext = useContext(chatAPI)
    const authContext = useContext(authAPI)
    const socketContext = useContext(socketApi)
    const { searchUser, setCurrentChat, fetchConservation } = chatContext
    const { loginInfo } = authContext
    const { onlineUsers, socket } = socketContext

    const [searchValue, setSearchValue] = useState("")
    const [searchedUsers, setSearchedUsers] = useState([])
    const [chats, setChats] = useState([])
    const fetchChats = async () => {
        const data = await fetchConservation()
        setChats(data)
        // console.log(data)
    }
    useEffect(() => {
        fetchChats()
    }, [])
    return (
        <>


            {console.log(onlineUsers)}
            {loginInfo ? <>
                <ButtonAppBar message="Chat" />
                <div className=" bg-zinc-800 text-slate-300 h-screen ">
                    {/* <p className='text-2xl mx-4'>Your chats</p> */}
                    {chats.map((e) => {
                        const Chatuser = e.participants.filter((event1) => {
                            return event1._id !== loginInfo._id
                        })
                        return <>
                            <ListItemButton className='m-20 p-20' component="a" href="#simple-list" onClick={() => {

                                e.participants = Chatuser
                                setCurrentChat(e)
                                navigate('/individualchat')
                            }} >
                                <ListItemText primary={Chatuser[0].name} />
                                <p>{onlineUsers?.indexOf(Chatuser[0]._id) !== -1 ? <>online</> : <>Not online</>}</p>
                            </ListItemButton>
                            <Divider className='text-white bg-white'/>
                        </>
                    })}
                </div>
            </> : <>
                <Login />
            </>}

        </>
    )
}

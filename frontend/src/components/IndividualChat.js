import { Button, Fade, Input, Slide } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ButtonAppBar from '../ImportedComponents.js/Appbar'
import { chatAPI } from '../contexts/ChatContext'
import { authAPI } from '../contexts/authContext'
import Login from './Login'
import { socketApi } from '../contexts/SocketContext'
import SimpleAlert from './alert'
import { TextInput } from 'flowbite-react'
import Snackbars from '../ImportedComponents.js/SnackBar'
import { useNavigate } from 'react-router-dom'

export default function IndividualChat() {
  const endRef = useRef(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight + 100,
      behavior: 'smooth',
    });
  };

  const navigate=useNavigate()
  const { currentChat, fetchConservation, sendMessage, alert, setAlert, getIndividualConservation } = useContext(chatAPI)
  const { loginInfo } = useContext(authAPI)
  const { socket } = useContext(socketApi)
  const [sendMessages, setsendMessages] = useState("")
  const [messages, setMessages] = useState([])
  const [sendMsgStatus, setSendMsgStatus] = useState(false)
  const getConservation = async () => {
    const data = await getIndividualConservation(currentChat)
    if(data.errors){
      return 
    }
    setMessages(data[0].messages)
    console.log(data)
  }
  useEffect(() => {
    getConservation()
    console.log(currentChat)
  }, [])
  useEffect(() => {
    getConservation()
  }, [currentChat])
  
   useEffect(() => {
        if(!loginInfo){
          navigate("/")
        }
      }, [])

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log("hi")
      setMessages([...messages, newMessage])
      scrollToBottom()
    })
    return () => {
      socket?.off("newMessage")
    }
  }, [socket, messages, setMessages])

  return (
    <>
      {sendMsgStatus && <Snackbars />}
      <Snackbars />
      {loginInfo ? <>
        <ButtonAppBar message={currentChat} />
        <div className="flex flex-col justify-items-end bg-zinc-800 min-h-screen pb-40">
          {messages.length!==0 ?messages?.map((e) => {
            return <>
              {loginInfo._id == e.sender ? <>
              <Slide in={true} direction='left'>
                <div ref={endRef} re className="flex justify-end items-end mx-4 my-1">
                  <p className=' bg-zinc-950 text-white p-4 rounded-2xl'>{e.message}</p>
                </div>
                </Slide>
              </>
                : <>
                <Slide  in={true} direction='right'>
                  <div ref={endRef} className="flex items-start mx-4 my-1">
                    <p className=' bg-blue-800 text-white p-4 rounded-2xl'>{e.message}</p>
                  </div>
                  </Slide>
                </>}
            </>
          }
          ):<><p className='text-3xl white'>No messages to display</p></> }
        </div>
        {/* this gives the alert in the app */}
        {alert && <SimpleAlert />}
        <div className="flex fixed bottom-0 bg-zinc-900 py-4 justify-between w-full ">
          <input onChange={(e) => {
            console.log(sendMessages)
            setsendMessages(e.target.value)
          }} variant="outlined" value={sendMessages} className='w-full rounded mx-2 bg-zinc-700 text-white p-4' />
          <Button className='p-4' onClick={async () => {
            const data = await sendMessage(currentChat, sendMessages)
            console.log(data)
            if (data.errors) {
              return setAlert({ msg: data.errors[0].msg, status: "error" })
            }
            setSendMsgStatus(true)
            scrollToBottom()
            setMessages([...messages, data])
            setsendMessages("")
          }} variant='contained' >Send</Button>
        </div>
      </> : <>
        <Login />
      </>}
    </>

  )
}


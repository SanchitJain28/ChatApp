import { Button, Input } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ButtonAppBar from '../ImportedComponents.js/Appbar'
import { chatAPI } from '../contexts/ChatContext'
import { authAPI } from '../contexts/authContext'
import Login from './Login'
import { socketApi } from '../contexts/SocketContext'
import SimpleAlert from './alert'
import { TextInput } from 'flowbite-react'

export default function IndividualChat() {
  const endRef = useRef(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };
  const { currentChat, fetchConservation, sendMessage,alert,setAlert } = useContext(chatAPI)
  const { loginInfo } = useContext(authAPI)
  const { socket } = useContext(socketApi)
  const [sendMessages, setsendMessages] = useState("")
  const [messages, setMessages] = useState([])
  const fetchChats = async () => {
    const data = await fetchConservation()
    console.log(data)
  }
  useEffect(() => {
    setMessages(currentChat.messages)
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
      {loginInfo ? <>
        <ButtonAppBar message={currentChat.name} />
        <div className="flex flex-col justify-items-end bg-zinc-800 p-4">
          {messages?.map((e) => {
            return <>
              {loginInfo._id == e.sender ? <>
                <div ref={endRef} re className="flex justify-end items-end mx-4 my-1">
                  <p className=' bg-zinc-950 text-white p-4 rounded-2xl'>{e.message}</p>
                </div>
              </>
                : <>
                  <div ref={endRef} className="flex items-start mx-4 my-1">
                    <p className=' bg-blue-800 text-white p-4 rounded-2xl'>{e.message}</p>
                  </div>
                </>}
            </>
          }
          ) || <p>NO messages to display</p>}
        </div>
        {/* this gives the alert in the app */}
        {alert && <SimpleAlert />}
        <div className="flex fixed bottom-0 bg-zinc-900 py-4 justify-between  p-4  w-full mt-20">
          <input onChange={(e) => {
            setsendMessages(e.target.value)
          }} variant="outlined" value={sendMessages} className='w-full rounded mx-2 bg-zinc-400	p-4' />
          <Button className='p-4' onClick={async () => {
            const data = await sendMessage(currentChat.participants[0].email, sendMessages)
            console.log(data)
            if (data.errors) {
              return setAlert({msg:data.errors[0].msg,status:"error"})
            }
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


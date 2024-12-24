import { Button, Fade, Input, Slide } from "@mui/material";
import {  Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { authAPI } from "../contexts/authContext";
import { chatAPI } from "../contexts/ChatContext";
import SimpleAlert from "./alert";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"


export default function SignUp() {
  const navigate=useNavigate()
  const [openModal, setOpenModal] = useState(false);
    const authContext=useContext(authAPI)
    const chatContext=useContext(chatAPI)
    const {signUp,setLoginInfo}=authContext
    const {alert, setAlert}=chatContext
    const [name,setName]=useState("")
    const[email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
  return (
    <>
    {/* FOR TRANSITIONS TO TAKE PLACE THERE SHOULD BE ONLY ONE CHILD?DIRECT CHILD */}
      <motion.div className="my-2" initial={{opacity:0}} animate={{opacity:1,transition:0.5}}>
      <motion.button whileHover={{ scale: 1.5 }} onClick={() => setOpenModal(true)} variant="contained" className="text-xl  lg:w-40 p-4 bg-blue-600 rounded-lg min-h-12">Sign Up</motion.button>
        <div className="">
      <Modal style={{borderRadius:2}} show={openModal} onClose={() => setOpenModal(false)} className="rounded-xl bg-black" >
        <Modal.Header className="bg-black ">Sign Up</Modal.Header>
        <Modal.Body style={{backgroundColor:"black"}} className="bg-black rounded-xl">
          <div className="space-y-6 flex flex-col">
           <input placeholder="Name" onChange={(e)=>{setName(e.target.value)}}></input>
           <input placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}></input>
           <input placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
           <input placeholder="PHONE NO" onChange={(e)=>{setPhone(e.target.value)}}></input>
            <Button variant="outlined" onClick={async()=>{
               const data=await signUp(name,email,password,phone)
               if (data.errors) {
                return setAlert({msg:data.errors[0].msg,status:"error"})
              }
              localStorage.setItem("userToken", data.token)
              localStorage.setItem("loginDetails", JSON.stringify(data.user))
              setLoginInfo(data.user)
              setAlert({msg:"Register succesful", status:"success"})
              navigate("/chat")

               console.log(data)
            }}>SignUp</Button>
          </div>
        </Modal.Body>
      </Modal>
      </div>

      </motion.div>
            {alert && <SimpleAlert />}
      
    </>
  );
}
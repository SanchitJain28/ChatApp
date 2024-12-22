import { Button, Fade, Input, Slide } from "@mui/material";
import {  Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { authAPI } from "../contexts/authContext";
import { chatAPI } from "../contexts/ChatContext";
import SimpleAlert from "./alert";
import { useNavigate } from "react-router-dom";


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
    <Slide in={true}>
      <div className="my-2">
      <Button onClick={() => setOpenModal(true)} variant="contained" className="mx-4 w-full border my-2">Sign Up</Button>
      <Slide in={true}>
        <div className="">
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 flex flex-col">
           <Input placeholder="Name" onChange={(e)=>{setName(e.target.value)}}></Input>
           <Input placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}></Input>
           <Input placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}></Input>
           <Input placeholder="PHONE NO" onChange={(e)=>{setPhone(e.target.value)}}></Input>
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

      </Slide>
      </div>

      </Slide>
            {alert && <SimpleAlert />}
      
    </>
  );
}
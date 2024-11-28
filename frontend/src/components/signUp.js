import { Button, Input } from "@mui/material";
import {  Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { authAPI } from "../contexts/authContext";


export default function SignUp() {
  const [openModal, setOpenModal] = useState(false);
    const authContext=useContext(authAPI)
    const {signUp}=authContext
    const [name,setName]=useState("")
    const[email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
  return (
    <>
      <Button onClick={() => setOpenModal(true)} variant="contained" className="mx-4">Sign Up</Button>
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
               console.log(data)
            }}>SignUp</Button>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}
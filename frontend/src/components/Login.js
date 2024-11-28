import { Button, Fade, Grow, Input, Slide, Snackbar } from "@mui/material";
import { Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { authAPI } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import SimpleAlert from "./alert";
import { chatAPI } from "../contexts/ChatContext";


export default function Login() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()
  const authContext = useContext(authAPI)
  const { login, setLoginInfo } = authContext
  const { alert, setAlert } = useContext(chatAPI)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <>
      {alert && <SimpleAlert />}
      <Button onClick={() => setOpenModal(true)} variant="contained" className="mx-4">Log in</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)} className="py-40">
        <Modal.Header>Log In</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 flex flex-col">
            <Input placeholder="email" onChange={(e) => { setEmail(e.target.value) }}></Input>
            <Input placeholder="password" onChange={(e) => { setPassword(e.target.value) }}></Input>
            <Button variant="outlined" onClick={async () => {
              const data = await login(email, password)
              if (data.errors) {
                return setAlert({msg:data.errors[0].msg,status:"error"})
              }
              localStorage.setItem("userToken", data.token)
              localStorage.setItem("loginDetails", JSON.stringify(data.user))
              setLoginInfo(data.user)
              setAlert({msg:"Login succesful", status:"success"})
              console.log(data)
              navigate("/chat")
            }}>Log In</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
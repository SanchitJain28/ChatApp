import { Button, Fade, Grow, Input, Slide, Snackbar,Modal, AppBar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { authAPI } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import SimpleAlert from "./alert";
import { chatAPI } from "../contexts/ChatContext";
import MagicLinkAlertSignInPage from "../ImportedComponents.js/MUIloginPage";
import ButtonAppBar from "../ImportedComponents.js/Appbar";


export default function Login() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()
  const authContext = useContext(authAPI)
  const { login, setLoginInfo,loginInfo } = authContext
  const { alert, setAlert, showAlert } = useContext(chatAPI)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  useEffect(() => {
    if(loginInfo){
      navigate("/chat")
      return
    }
  }, [])
  
  return (
    <>
    <ButtonAppBar/>
        <div className="bg-zinc-800 min-h-screen py-40 px-4">

        <Slide in={true}>

              <div className="space-y-6 flex flex-col">
                <input placeholder="email" className="border border-zinc-600 p-4 rounded w-full bg-zinc-800" onChange={(e) => { setEmail(e.target.value) }}></input>
                <input placeholder="password" className="border border-zinc-600 p-4 rounded w-full bg-zinc-800" onChange={(e) => { setPassword(e.target.value) }}></input>
                <Button variant="outlined" onClick={async () => {
                  const data = await login(email, password)
                  if (data.errors) {
                    return setAlert({ msg: data.errors[0].msg, status: "error" })
                  }
                  localStorage.setItem("userToken", data.token)
                  localStorage.setItem("loginDetails", JSON.stringify(data.user))
                  setLoginInfo(data.user)
                  setAlert({ msg: "Login succesful", status: "success" })
                  console.log(data)
                  navigate("/chat")
                }}>Log In</Button>
              </div>
              </Slide>

        </div>
      {alert && <SimpleAlert />}

    </>
  );
}
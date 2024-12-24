import { Button, Fade, Grow, Input, Slide, Snackbar,Modal, AppBar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { authAPI } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import SimpleAlert from "./alert";
import { chatAPI } from "../contexts/ChatContext";
import MagicLinkAlertSignInPage from "../ImportedComponents.js/MUIloginPage";
import ButtonAppBar from "../ImportedComponents.js/Appbar";
import { motion } from "motion/react";


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
        <div className="bg-black min-h-screen py-40 px-4">

        <Slide in={true}>

              <div className="space-y-6 flex flex-col p-8">
                <motion.input whileFocus={{scale:1.1}} placeholder="email" className="focus:outline-none  text-white font-mono text-xl border border-green-600 p-4 rounded w-full bg-black" onChange={(e) => { setEmail(e.target.value) }}></motion.input>
                <motion.input whileFocus={{scale:1.1}} placeholder="password" className="focus:outline-none text-white font-mono text-xl border border-green-600 p-4 rounded w-full bg-black" onChange={(e) => { setPassword(e.target.value) }}></motion.input>
                <button variant="outlined" onClick={async () => {
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
                }} className="lg:text-4xl text-xl font-mono text-black w-40 min-h-8 rounded-lg p-4 bg-blue-600">Log In</button>
              </div>
              </Slide>

        </div>
      {alert && <SimpleAlert />}

    </>
  );
}
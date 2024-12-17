import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import { authAPI, AuthContext } from '../contexts/authContext';
import { chatAPI } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MaterialUIModal() {
    const authContext = React.useContext(authAPI)
    const { login, setLoginInfo } = authContext
  const { alert, setAlert,showAlert } = React.useContext(chatAPI)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
        </Box>
      </Modal>
    </div>
  );
}

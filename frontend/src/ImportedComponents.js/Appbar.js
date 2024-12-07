import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemButton, ListItemText, TextField } from '@mui/material';
import { chatAPI } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar(props) {
  const { searchUser, setCurrentChat, fetchConservation } = React.useContext(chatAPI)
  const [searchValue, setSearchValue] = React.useState("")
  const [searchedUsers, setSearchedUsers] = React.useState([])
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className='bg-black'>
        <AppBar position="static" className='bg-black' >
          <Toolbar className='bg-zinc-900		'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.message}
            </Typography>
            <TextField placeholder='Search user by name or email' variant='outlined' color="secondary" className='m-20 text-white' size="small" onChange={async (e) => {
              const data = await searchUser(e.target.value)
              setSearchedUsers(data)

              console.log(data)
              // setSearchedUsers(data)
              setSearchValue(e.target.value)
            }} />
          </Toolbar>
        </AppBar>
      </Box>
      <div className="flex flex-col justify-center bg-zinc-800 	">
        {searchedUsers.length == 0 ? <p></p> : searchedUsers.map((e) => {
          return <>
            <div className="flex justify-between mx-4 border rounded-xl px-4 py-2 my-2" onClick={() => {
              setCurrentChat(e.email)
              navigate("/individualchat")
            }} >
              <p>
                <p className='text-xl text-white'>{e.name}</p>
                <p className='text-xs text-white'>{e.email}</p>
              </p>
            </div>
          </>
        })}
      </div>
    </>
  );
}

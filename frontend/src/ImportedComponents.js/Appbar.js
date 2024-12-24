import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, ListItemButton, ListItemText, TextField } from '@mui/material';
import { chatAPI } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../contexts/authContext';
import AppDrawer from './Drawer';

export default function ButtonAppBar(props) {
  const {loginInfo}=React.useContext(authAPI)
  const { searchUser, setCurrentChat, fetchConservation } = React.useContext(chatAPI)
  const [searchValue, setSearchValue] = React.useState("")
  const [searchedUsers, setSearchedUsers] = React.useState([])
  const[toggleBar,setToggleBar]=React.useState(null)
  const initailRender=()=>{
    return <>
     <Box sx={{ flexGrow: 1,padding:2 }} className='bg-black'>
        <AppBar sx={{borderRadius:2}} position="static" className='bg-black' >
          <Toolbar sx={{borderRadius:2}} className='bg-black border border-zinc-600 rounded-lg p-4'>
          <AppDrawer/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.message}
            </Typography>
            {loginInfo?<>
              <Button onClick={()=>{
              setToggleBar(searchRender())
            }}><i class="fa-solid fa-magnifying-glass"></i></Button>
            </>:<>
            </>}
          </Toolbar>
        </AppBar>
      </Box>
      
    </>
  }
  const searchRender=()=>{
    return <>
     <Box sx={{ flexGrow: 1,padding:2 }} className='bg-black'>
        <AppBar sx={{borderRadius:2}} position="static" className='bg-black' >
          <Toolbar className='bg-black border border-zinc-600 rounded-lg p-4'>
            <input placeholder='Search user by name or email'  className='w-full p-2 bg-black rounded' size="small" onChange={async (e) => {
              const data = await searchUser(e.target.value)
              setSearchedUsers(data)

              console.log(data)
              // setSearchedUsers(data)
              setSearchValue(e.target.value)
            }} />
            <Button onClick={()=>{
              setToggleBar(initailRender())
              setSearchedUsers([])
            }} className='border'><i class="fa-solid fa-circle-xmark fa-xl"></i></Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
   
  }
  const searchResults=()=>{
    return <>
     <div className="flex flex-col justify-center bg-black 	">
        {searchedUsers.length == 0 ? <p></p> : searchedUsers.map((e) => {
          return <>
            <div className="flex justify-between mx-4 border border-zinc-900 rounded px-4 py-1 my-1" onClick={() => {
              setCurrentChat(e.email)
              navigate("/individualchat")
              setToggleBar(initailRender())
              setSearchedUsers([])

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
  }
  React.useEffect(() => {
    setToggleBar(initailRender())
  }, [])
  
  const navigate = useNavigate()
  return (
    <>
     {toggleBar}
    {searchResults()}
    </>
  );
}

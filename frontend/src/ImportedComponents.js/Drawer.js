import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { authAPI } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { motion } from 'motion/react';

export default function AppDrawer() {
    const [open, setOpen] = React.useState(false);
    const { setLoginInfo } = React.useContext(authAPI)
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const navigate = useNavigate()
    const DrawerList = (
        <>
        <div className="hidden lg:block">
            <Box sx={{ width: 700, height: 920, bgcolor: '#090B0D', border: 2 }} role="presentation" onClick={toggleDrawer(false)} className="bg-black">
                <div className=" flex flex-col my-2">
                    <button variant='contained' sx={{
                        bgcolor: "black", marginLeft: 4, margin: 1
                    }} className='mx-4 my-2 bg-blue-400 p-4 text-xl font-mono'>Your profile </button>
                    <button variant='contained' sx={{ bgcolor: "black", margin: 1 }} onClick={() => {
                        setLoginInfo(null)
                    }} className='mx-4 my-2 bg-blue-400 p-4 text-xl font-mono'><LogoutIcon /></button>
                    <button sx={{ bgcolor: "black", margin: 1 }} variant='contained' onClick={() => {
                        navigate("/")
                    }} className='mx-4 my-2 bg-blue-400 p-4 text-xl font-mono'>Home</button>
                     <button sx={{ bgcolor: "black", margin: 1 }} variant='contained' onClick={() => {
                    navigate("/chat")
                }} className='mx-4 my-2 bg-blue-400 p-4 text-xl font-mono'>Chats</button>
                </div>
            </Box>
        </div>
        <div className="block lg:hidden">
        <Box sx={{ width: 300, height: 950, bgcolor: '#090B0D', border: 2,padding:4 }} role="presentation" onClick={toggleDrawer(false)} className="bg-black">
            <div className=" flex flex-col my-2">
                <motion.button variant='contained' sx={{
                    bgcolor: "black", marginLeft: 4, margin: 1
                }} className='mx-4 my-2 bg-blue-700 p-4 text-lg font-bold text-white font-mono rounded-xl' whileInView={{scale:1.1}}>Your profile </motion.button>
                <motion.button whileInView={{scale:1.1}} variant='contained' sx={{ bgcolor: "black", margin: 1 }} onClick={() => {
                    setLoginInfo(null)
                }} className='mx-4 my-2 bg-blue-700 p-4 text-lg font-bold text-white font-mono rounded-xl'><LogoutIcon /></motion.button>
                <motion.button whileInView={{scale:1.1}} sx={{ bgcolor: "black", margin: 1 }} variant='contained' onClick={() => {
                    navigate("/")
                }} className='mx-4 my-2 bg-blue-700 p-4 text-lg font-bold text-white font-mono rounded-xl'>Home</motion.button>
                  <motion.button whileInView={{scale:1.1}} sx={{ bgcolor: "black", margin: 1 }} variant='contained' onClick={() => {
                    navigate("/chat")
                }} className='mx-4 my-2 bg-blue-700 p-4 text-lg font-bold text-white font-mono rounded-xl'>Chats</motion.button>
            </div>
        </Box>
    </div>
        </>
        

    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)} >
                {DrawerList}
                <div className="bg-black">

                </div>
            </Drawer>
        </div>
    );
}

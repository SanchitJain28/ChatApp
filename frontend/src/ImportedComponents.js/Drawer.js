import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { authAPI } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

export default function AppDrawer() {
    const [open, setOpen] = React.useState(false);
    const {setLoginInfo}=React.useContext(authAPI)
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const navigate=useNavigate()
    const DrawerList = (
        <Box sx={{ width: 250, height: 10000, bgcolor: '#007FFF' }} role="presentation" onClick={toggleDrawer(false)} className="bg-black">
            <div className="flex flex-col my-2">
                <Button variant='contained' sx={{
                    bgcolor: "black", marginLeft: 4, margin: 1

                }}>Your profile </Button>
                <Button variant='contained' sx={{ bgcolor: "black", margin: 1 }} onClick={() => {
                    setLoginInfo(null)
                }}><LogoutIcon/></Button>
                <Button  sx={{ bgcolor: "black", margin: 1 }} variant='contained'  onClick={()=>{
                    navigate("/")
                }}>Home</Button>
            </div>


        </Box>
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

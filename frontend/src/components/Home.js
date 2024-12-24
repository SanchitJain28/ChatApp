import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import SignUp from './signUp';
import Login from './Login';
import MaterialUIModal from '../ImportedComponents.js/MaterialUIModal';
import { Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import { authAPI } from '../contexts/authContext';
import Logout from './Logout';
import ButtonAppBar from '../ImportedComponents.js/Appbar';
import { motion } from "motion/react"
export default function Home() {
    const { loginInfo } = useContext(authAPI)
    return (
        <>
            <ButtonAppBar />
            <div className="bg-black min-h-screen p-4">
                <Fade in={true} timeout={1000}>

                    <motion.div className="border border-green-600 font-mono p-4 rounded-xl" whileHover={{scale:0.95}}>
                        <p className='lg:text-2xl text-white p-12'>Welcome to ChatNext
                            Stay Connected, Anytime, Anywhere

                            Seamlessly chat, connect, and share with friends, family, and colleagues.

                            Why Choose Us?
                            Fast & Reliable: Built on the cutting-edge MERN stack, ensuring smooth and real-time communication.
                            Beautiful Design: Tailored with Tailwind CSS for a sleek and intuitive interface.
                            Secure Conversations: Your privacy is our top priority with end-to-end encryption.
                            Features
                            Instant Messaging
                            Group Chats
                            Media Sharing
                            Cross-Platform Support
                            Ready to connect?
                            Get Started Now</p>

                        {loginInfo ? <div className="px-4 py-2 flex">
                            <Link to="/chat">
                                <motion.button component={Link} to="/chat" variant='outlined' className='text-xl mx-4 lg:w-40 p-4 bg-green-600 rounded-lg min-h-12' whileHover={{ scale: 1.5 }}>Chat</motion.button>
                            </Link>
                            <Logout />
                        </div> : <div className="py-2 px-4">
                            <Link to="/login">
                            <motion.button whileHover={{ scale: 1.5 }} component={Link} to="/login" className='text-xl mx-4 lg:w-40 p-4 bg-blue-600 rounded-lg min-h-12' variant='contained' >Login</motion.button>

                            </Link>
                            <div className="py-4 mx-4">
                                <p className='lg:text-4xl text-xl font-mono text-green-600'>New user?</p>
                                <SignUp className="mx-4 my-2" />

                            </div>
                        </div>}


                    </motion.div>
                </Fade>

            </div>

        </>
    )
}

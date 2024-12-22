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

export default function Home() {
    const { loginInfo } = useContext(authAPI)
    return (
        <>
            <ButtonAppBar/>
            <div className="bg-zinc-800 min-h-screen">
                <Fade in={true} timeout={1000}>

                    <div className="">
                        <p className='text-2xl text-white p-12'>Welcome to ChatNext
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
                        {loginInfo && <div className="px-4 py-2">
                            <Button component={Link} to="/chat" variant='outlined' className='mx-4 w-full'>CHat</Button>
                        </div>}

                        {loginInfo ?<div>
                            <Logout />
                        </div> :<div className="py-2 px-4">
                            <Button component={Link} to="/login" className='w-full my-20' variant='contained' >Login</Button>
                            <div className="py-4">
                                <p className='text-2xl text-white'>New user?</p>
                                <SignUp className="mx-4 my-2" />

                            </div>
                        </div>  }


                    </div>
                </Fade>

            </div>

        </>
    )
}

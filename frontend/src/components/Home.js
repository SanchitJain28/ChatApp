import React from 'react'
import Button from '@mui/material/Button';
import SignUp from './signUp';
import Login from './Login';

export default function Home() {
    return (
        <>
        <div className="bg-zinc-800 min-h-screen">
            <p className='text-xl text-white p-8'>Welcome to ChatNext
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
            <div className="flex justify-between p-20">
                <SignUp className="mx-4"/>
                <Login />
            </div>
            </div>
        </>
    )
}

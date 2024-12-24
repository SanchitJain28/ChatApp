import React, { useContext } from 'react'
import { authAPI } from '../contexts/authContext'
import { Button } from '@mui/material'
import { motion } from "motion/react"

export default function Logout() {
    const {loginInfo,setLoginInfo}=useContext(authAPI)
  return (
    <div className=''>
        <motion.button whileHover={{ scale: 1.5 }} className='text-xl mx-4 lg:w-40 p-4 bg-red-600 rounded-lg min-h-12' variant='contained' onClick={()=>{
            setLoginInfo(null)
        }}>Logout</motion.button>
    </div>
  )
}

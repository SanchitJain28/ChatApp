import React, { useContext } from 'react'
import { authAPI } from '../contexts/authContext'
import { Button } from '@mui/material'

export default function Logout() {
    const {loginInfo,setLoginInfo}=useContext(authAPI)
  return (
    <div className='mx-4 my-2'>
        <Button className='w-full ' variant='contained' onClick={()=>{
            setLoginInfo(null)
        }}>Logout</Button>
    </div>
  )
}

import { createContext, useState } from "react";
import React from 'react'

export const authAPI = createContext([])

export function AuthContext(props) {
  const [loginInfo,setLoginInfo]=useState(JSON.parse(localStorage.getItem("loginDetails"))?JSON.parse(localStorage.getItem("loginDetails")):null
)

  const signUp = async (name, email, password, phoneNo) => {
    const url = "http://localhost:3001/api/createuser"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name, email, password, phoneNo
      })
    })
    const data = await response.json()
    return data
  }

  const login=async(email,password)=>{
   const url="http://localhost:3001/api/login" 
   const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
       email, password
    })
  })
  const data = await response.json()
  return data
  }

  return (
    <authAPI.Provider value={{ signUp,login,loginInfo,setLoginInfo }}>
      {props.children}
    </authAPI.Provider>
  )
}

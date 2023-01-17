import React from 'react'
import { auth, provider } from '../Config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'





export default function Login() {

const navigate = useNavigate(); 

 const handleSignIn = async () => {
 const result = await signInWithPopup(auth, provider)
 console.log(result)
 navigate ("/")
 
}

  return (
    <div>
        <h1>Sign in with Google to continue</h1>
        <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  )
}

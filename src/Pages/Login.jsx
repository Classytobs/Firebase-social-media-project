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
    <div className='flex flex-col gap-y-5 text-2xl items-center mt-12'>
        <h1>Sign in with Google to continue</h1>
        <button onClick={handleSignIn}  className='shadow-md  text-sm h-fit px-2 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 w-fit'>Sign in with Google</button>
    </div>
  )
}

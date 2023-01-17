import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

export default function Navbar() {
    const [user]=useAuthState(auth)

    const signUserOut = async () => {
        await signOut(auth)
    }

    return (
        <div className='flex flex-row px-8 py-5 bg-slate-500 h-fit w-full text-2xl font-serif justify-end content-center items-center mb-5'>
            <div className='flex gap-x-5 mr-12'>
            <Link to="/">Home</Link>
            {!user?
            <Link to="/login">Login</Link>:
            <Link to="/createpost">Create Post</Link>
            }   
            </div>

            <div className='flex flex-row items-center justify-end gap-x-2'>{user &&(<>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL  || ""} alt='' className='rounded-full h-8 w-8'/>
            <button className='shadow-md text-sm h-fit px-2 py-2 rounded-lg bg-blue-900 hover:bg-blue-800'
            onClick={signUserOut}>Sign out</button></>)}
            </div>

        </div>
      )
}

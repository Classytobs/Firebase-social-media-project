import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../Config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

export default function Createform() {
    const [user]=useAuthState(auth); 
    const navigate = useNavigate(); 

    const schema = yup.object().shape({
        title:yup.string().required('You must add a title'),
        description:yup.string().required('you must add a description')
    })

    const {register, handleSubmit, formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })

    const postsRef = collection(db, '1111');

    const createPost = async (data) =>{
        await addDoc(postsRef, {
            // title:data.title,
            // description:data.description,
            ...data,
            username: user?.displayName,
            userId:user?.uid,

        } )
        navigate ("/")
    }


  return (
    <div className='bg-green-500 p-12 justify-center items-center content-center rounded-md mt-12'>
    <form onSubmit={handleSubmit(createPost)} className='flex flex-col gap-y-5 items-center'>
    <input placeholder='Title...' {...register('title')}
     className='px-3 py-2 bg-white border-slate-300 rounded-md text-sm shadow-sm
      placeholder:italic focus:outline-none focus:border-sky-500 text-black'/>
    <p className='text-red-500'>{errors.title?.message}</p>
    <textarea placeholder='Description...'{...register('description')}
     className='px-3 py-2 bg-white border-solid border-2 border-slate-300 rounded-md 
     text-sm shadow-sm placeholder:italic focus:outline-none focus:border-sky-500 text-black'/>
    <p className='text-red-500'>{errors.description?.message}</p>
    <input type='submit' className='shadow-md  text-sm h-fit px-2 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer w-fit'/>
    </form>
    </div>
  )
}



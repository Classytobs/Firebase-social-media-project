import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../Config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'

export default function Createform() {
    const [user]=useAuthState(auth); 

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
            title:data.title,
            description:data.description,
            username: user?.displayName,
            userId:user?.uid

        } )
    }
  return (
    <form onSubmit={handleSubmit(createPost)}>
    <input placeholder='Title...' {...register('title')}/>
    <p className='text-red-500'>{errors.title?.message}</p>
    <textarea placeholder='Description...'{...register('description')}/>
    <p className='text-red-500'>{errors.description?.message}</p>
    <input type='submit'/>
        
    </form>
  )
}

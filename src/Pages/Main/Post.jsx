import { addDoc, getDocs, deleteDoc, doc, collection, query, where } from 'firebase/firestore'
import { db,auth } from '../../Config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import React, {useEffect, useState } from 'react'

export default function Post(props) {

    const[user]=useAuthState(auth);

    const likesRef = collection (db, 'likes');

    const[likeAmount, setLikeAmount] = useState(null)

    const likesDoc = query(likesRef, where('postId','==', props.post.id))

    const addLikes = async () =>{
        try{
        await addDoc(likesRef, {
            userId:user?.uid,
            postId:props.post.id
        })   
        if(user){
        setLikeAmount((prev) =>prev? [...prev, {userId: user.uid}]:[{userId: user.uid}])
        }
    } catch (err){
        console.log(err)
    }
    }
    const deleteLikes = async () =>{
        try{
            const LikeToDeleteQuery =query(likesRef, 
                where('postId','==', props.post.id),
                 where('userId', '==', user?.uid))
            const likeToDeleteData= await getDocs(LikeToDeleteQuery)
            const likeToDelete = doc(db, 'likes', likeToDeleteData.docs[0].id)
            
        await deleteDoc(likeToDelete)   
        if(user){
        setLikeAmount((prev) => prev && prev?.filter((like)=> like.id === likeToDeleteData.docs[0].id))
        }
    } catch (err){
        console.log(err)
    }
    }


     const getLikes = async () => {
        const data=await getDocs(likesDoc)
        setLikeAmount(data.docs.map((doc) =>(
              {userId: doc.data().userId}
            )))
     }

     const hasUserLiked = likeAmount?.find((like)=> like.userId === user?.uid)


     useEffect(() => {
         getLikes()
     }, [])


  return (
    <div className='flex flex-col mb-8 p-5 divide-y-8 border-4 border-double border-black rounded-lg m-8'>
        <div className='flex flex-col items-center justify-center content-center gap-y-3  text-center'>
            <div className='text-4xl'>{props.post.title}</div>
            <div className='text-2xl'>{props.post.description}</div>
            <div className='flex flex-col items-center justify-center content-center'>
                <h1>@{props.post.username}</h1>
                <button onClick={hasUserLiked? deleteLikes: addLikes}>{hasUserLiked? <>&#128078;</>:<> &#128077;</>}</button>
                {likeAmount && <h1>Likes:{likeAmount?.length}</h1>}
            </div>
        </div>
    </div>
  )
}

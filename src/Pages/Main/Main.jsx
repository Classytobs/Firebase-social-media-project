import React, {useState, useEffect} from 'react'
import {getDocs, collection} from 'firebase/firestore'
import {  db } from '../../Config/firebase'
import Post from './Post';

export default function Main() {
  const postsRef = collection(db, '1111');

  const [postList, setPostList] = useState(null)

  const getPosts= async () => {
     const data = await getDocs(postsRef)
     setPostList(data.docs.map((doc) =>{
        return(
          {...doc.data(), id:doc.id}
        )
      }))
  }
  
  useEffect(() => {
    getPosts()
  }, [])


  return (
    <div>{postList?.map((post) => <Post post={post}/>) }</div>
  )
}

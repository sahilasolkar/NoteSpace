import React, { useState } from 'react'
import classes from './Delete.module.css'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import firebase from 'firebase/compat/app'
const Delete = (props) => {

  const [notes, setNotes] = useState(props)
  const {currentUser} = useAuth()

  const onDeleteHandler = () =>{
    const results = window.confirm('are you sure?')
    if(results){db.collection(currentUser.uid).doc('task').get().then((doc)=>{
      if(doc.exists){

        console.log(notes.id)
        console.log(currentUser.uid)

        db.collection(currentUser.uid).doc('notes').update({
          [`${notes.id}`]:firebase.firestore.FieldValue.delete()
          
        }).then(()=>{
          console.log("note sucessfully deleted")

          props.onDeleteData()
        }).catch((error)=>{
          console.error("error deleting the task", error)
        })
      }
    })}
  }

  return (
    <div onClick={onDeleteHandler} className={classes.icons}>
      <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
      <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
      <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352" />
      <path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
    </svg>
    </div>
  )
}

export default Delete

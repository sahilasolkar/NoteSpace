import React, { useEffect, useState } from "react";
import classes from "./NotesBox.module.css";
import Delete from "./Delete";
import { ReactComponent as Trash } from "../icons/trash-outline.svg";
import { useAuth } from "../context/AuthContext";
import firebase from "firebase/compat/app";
import { db } from "../firebase";

const NotesBox = (props) => {

  const {currentUser} = useAuth()

  // console.log(props.data)
  // console.log(props.id)
  
  const onDeleteHandler = () =>{
    db.collection(currentUser.uid).doc('task').get().then((doc)=>{
      if(doc.exists){

        // console.log(notes.id)

        db.collection(currentUser.uid).doc('task').update({
          ['f50a225b-3218-46d5-9677-0fe14a951f50']:firebase.firestore.FieldValue.delete()
          
        }).then(()=>{
          console.log("note sucessfully deleted")

          props.onDeleteData()
        }).catch((error)=>{
          console.error("error deleting the task", error)
        })
      }
    })
  }

  const onUpdate = () =>{
    props.updateData()
  }

  // console.log('running')
  // const { currentUser } = useAuth();
  // const [noteData, setNoteData] = useState(null)

  // useEffect(() => {
  //   db.collection(currentUser.uid)
  //     .doc("notes")
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         // console.log(doc.data());
  //         // const noteData = doc.data()
  //         setNoteData(doc.data())
          
  //         // console.log(noteData)
  //         // console.log(noteData)
  //         // console.log('hey') 
  //       } else {
  //         console.log("document not found");
  //       }
  //     });
  // }, []);

  return (
    <div className={classes["notes-container"]}>
      <div>
      <p className={classes["notes-date"]}>{props.date}</p>

      {/* <Trash  className={classes.icons}/> */}

      <Delete onDeleteData={()=>onUpdate()} id={props.id} data={props.data}/>

      </div>
      <h4 className={classes["notes-topic"]}>{props.title}</h4>
      <p>{props.note}</p>
      <div>tags</div>
    </div>
  );
};

export default NotesBox;

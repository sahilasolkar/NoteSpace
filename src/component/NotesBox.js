import React, { useEffect, useState } from "react";
import classes from "./NotesBox.module.css";


const NotesBox = (props) => {
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
      <p className={classes["notes-date"]}>{props.date}</p>
      <h4 className={classes["notes-topic"]}>{props.title}</h4>
      <p>{props.note}</p>
      <div>tags</div>
    </div>
  );
};

export default NotesBox;

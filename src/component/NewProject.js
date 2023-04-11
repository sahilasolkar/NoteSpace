import React, { useRef, useEffect } from "react";
import classes from "./NewProject.module.css";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate();

  const titleRef = useRef();
  const descriptionRef = useRef();

  const { currentUser } = useAuth();

  //to handle the textarea sizing 
  const handleChange = (event) => {
    // setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleNewNoteSubmit = async(event) => {
    event.preventDefault();
    const projectid = uuidv4();
    // db.collection(currentUser.uid)
    //   .doc(`notes`)
    //   .set({
    //     [noteid]: {
    //       title: titleRef.current.value,
    //       note: descriptionRef.current.value,
    //       date: new Date().toLocaleDateString(),
    //     },
    //   });

    await db.collection(currentUser.uid).doc("project").get().then((doc)=>{
      if(doc.exists){
        db.collection(currentUser.uid)
        .doc(`project`)
        .update({
          [projectid]: {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            date: new Date().toLocaleDateString(),
          },
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      }
      else{
        db.collection(currentUser.uid)
        .doc(`project`)
        .set({
          [projectid]: {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            date: new Date().toLocaleDateString(),
          },
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      }
    })
      console.log(true)
      
      navigate('/')
  };

  return (
    <div className={classes["form-container"]}>
      <form onSubmit={handleNewNoteSubmit}>
        
        <input ref={titleRef} name="title" type="text" />
        
        <textarea
          ref={descriptionRef}
          onChange={handleChange}
          className={classes["notebody"]}
          name="note"
          placeholder="Start typing here"
          type="text"
        />
        <div
          className={classes["back-button"]}
          onClick={() => {
            navigate("/");
          }}>
          Back
        </div>
        <button type="submit" className={classes["new-note-button"]}>
          Done
        </button>
      </form>
    </div>
  );
};

export default NewProject;

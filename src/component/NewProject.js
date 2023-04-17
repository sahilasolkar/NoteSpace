import React, { useRef, useEffect } from "react";
import classes from "./NewProject.module.css";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewProject = () => {
  const navigate = useNavigate();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const priorityRef = useRef();

  const { currentUser, setNotification } = useAuth();

  //to handle the textarea sizing 
  const handleChange = (event) => {
    // setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleNewNoteSubmit = async(event) => {
    event.preventDefault();
    const projectid = uuidv4();

    await db.collection(currentUser.uid).doc("project").get().then((doc)=>{
      if(doc.exists){
        db.collection(currentUser.uid)
        .doc(`project`)
        .update({
          [projectid]: {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            date: new Date().toLocaleDateString(),
            priority: priorityRef.current.value,
            dueDate: dateRef.current.value, 
            inProgress: 0,
            toDo: 0,
            completed: 0,
            task: {}
          },
        })
        .then(() => {
          console.log("project successfully created");
        })
        .catch((error) => {
          console.error("Error creating the project", error);
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
            priority: priorityRef.current.value,
            dueDate: dateRef.current.value, 
            inProgress: 0,
            toDo: 0,
            completed: 0,
            task: {}
          },
        })
        .then(() => { 
          console.log("project successfully created 1st time");
        })
        .catch((error) => {
          console.error("Error creating the project", error);
        });
      }
    })
      
      navigate(-1)

    //notification 
    setNotification("Added New Project", true, "👏")
    
  };

  return (
    <div className={classes["form-container"]}>
      <form onSubmit={handleNewNoteSubmit}>
        
        <input required className={classes.nameinput} ref={titleRef} name="title" type="text" placeholder="Title..."/>

        {/* <div className={classes.metadata}>

        <input ref={dateRef} className={classes.dateinput} type="date"  />

        <input ref={priorityRef} className={classes.priorityinput} placeholder="Priority.." type="text" />

        </div> */}

<div className={classes.metadata}>
        <input required ref={dateRef} className={classes.dateinput} type="date" />
        <select required ref={priorityRef} className={classes.priorityinput} placeholder="Priority.." type="text">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>


        {/* <select ref={priorityRef} className={classes.priorityinput} placeholder="Priority.." type="text" />
        <option value="low">low</option>
  <option value="medium">medium</option>
  <option value="high">high</option>
        </select> */}
        
        <textarea
          ref={descriptionRef}
          onChange={handleChange}
          className={classes["projectbody"]}
          name="note"
          placeholder="Describe your project"
          type="text"
        />
        <div
          className={classes["back-button"]}
          onClick={() => {
            navigate(-1);
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

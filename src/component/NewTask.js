import React, { useRef, useEffect } from "react";
import classes from "./NewTask.module.css";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const navigate = useNavigate();

  const titleRef = useRef();
  const taskRef = useRef();

  const { currentUser } = useAuth();

  //to handle the textarea sizing 
  const handleChange = (event) => {
    // setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleNewTaskSubmit = async(event) => {
    event.preventDefault();
    const taskid = uuidv4();
    
    await db.collection(currentUser.uid).doc("task").get().then((doc)=>{
      if(doc.exists){
        db.collection(currentUser.uid).doc('task').update({
          [taskid]:{
            title: titleRef.current.value,
            task: taskRef.current.value,
            done: false,
            important: false,
          }
        }).then(()=>{
          console.log("task successfully added")
        }).catch((error)=>{
          console.error("error adding the task", error)
        })
      }
      else{
        db.collection(currentUser.uid).doc('task').set({
          [taskid]:{
            title: titleRef.current.value,
            task: taskRef.current.value,
            done: false,
            important: false, 
          }
        }).then(()=>{
          console.log("task added successfully")
        }).catch((error)=>{
          console.error("error adding the task", error)
        })
      }
    })

    navigate('/')
  };

  return (
    <div className={classes["form-container"]}>
      <form onSubmit={handleNewTaskSubmit}>
        {/* <label htmlFor="title">Title</label> */}
        <input placeholder="Task..." ref={titleRef} name="title" type="text" />
        {/* <label htmlFor="note"></label> */}
        <textarea
          ref={taskRef}
          onChange={handleChange}
          className={classes["notebody"]}
          name="note"
          placeholder="describe your task.."
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

export default NewTask;

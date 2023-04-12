import React, { useRef, useEffect, useState } from "react";
import classes from "./NewProject.module.css";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const NewProjectTask = () => {
  const navigate = useNavigate();

  const titleRef = useRef();
  const descriptionRef = useRef();

  const { currentUser } = useAuth();

  const [projectTasks, setProjectTasks] = useState(null)

  const {id} = useParams()

  // console.log(id)

  //to handle the textarea sizing
  const handleChange = (event) => {
    // setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleNewNoteSubmit = async (event) => {
    event.preventDefault();
    const projectTaskId = uuidv4();
    let taskdata =  {   
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        date: new Date().toLocaleDateString(),
        status: ""
    }

    // console.log(taskdata)

    await db
      .collection(currentUser.uid)
      .doc("project")
      .get()
      .then ((doc) => {
        if (doc.exists) {
          // console.log(doc.data()[id].task)
          setProjectTasks(doc.data()[id].task)
          console.log(doc.data()[id].task)
          const temp = doc.data()[id].task;
          temp[projectTaskId]=taskdata
          // console.log(temp)

         db.collection(currentUser.uid)
            .doc(`project`)
            .update({
              [`${id}`]: {
                ...doc.data()[id],
                task: temp
              }
            })
            .then(() => {
              console.log("project successfully created");
            })
            .catch((error) => {
              console.error("Error creating the project", error);
            });
        } 
      });

    navigate(-1);
  };

  return (
    
    <div className={classes["form-container"]}>
      
      <form onSubmit={handleNewNoteSubmit}>
        <input
          className={classes.nameinput}
          ref={titleRef}
          name="title"
          type="text"
        />

        <textarea
          ref={descriptionRef}
          onChange={handleChange}
          className={classes["projectbody"]}
          name="note"
          placeholder="Start typing here"
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

export default NewProjectTask;

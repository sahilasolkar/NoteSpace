import React from "react";
import classes from "./ProjectFolder.module.css";
import { ReactComponent as Trash } from "../icons/trash-outline.svg";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
//to make
//https://dribbble.com/shots/20666000-Task-Management-Dashboard

const ProjectFolder = (props) => {
  const { currentUser, setNotification } = useAuth();

  const onDeleteHandler = (event) => {
    event.preventDefault()

    const results = window.confirm('are you sure?')
    if(results){

      db.collection(currentUser.uid)
      .doc("project")
      .get()
      .then((doc) => {
        // console.log(doc.data())
        
        if (doc.exists) {
          
          // console.log(props.id)
          
          db.collection(currentUser.uid)
            .doc("project")
            .update({
              [`${props.id}`]: firebase.firestore.FieldValue.delete(),
            })
            .then(() => {
              // console.log(props.data.status)
              console.log("task successfully updated");
              props.rerender();
              
              //notification of done
              setNotification("Deleted Project", false, "❌")
              
            })
            .catch((error) => {
              console.error("error updating the task", error);
            });

          }
        });
      }
  };

  return (
    <div onClick={props.onClick} className={classes.customshape}>
      <div className={classes.customshapeinside}>
        <div className={classes.projectheading}>
          <h4>{props.data.title}</h4>
          <Trash onClick={onDeleteHandler} className={classes.icons} />
        </div>
        <p>{props.data.date}</p>
      </div>
    </div>
  );
};

export default ProjectFolder;

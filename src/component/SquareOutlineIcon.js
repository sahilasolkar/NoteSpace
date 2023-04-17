import React, { useState } from "react";
import classes from "./SquareOutlineIcon.module.css";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import firebase from "firebase/compat/app";

const SquareOutlineIcon = (props) => {
  const { currentUser } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [tasks, setTasks] = useState(props);
  // console.log(props);

  const onCheckHandler = () => {
    let result = false
    setIsChecked(!isChecked);
    if(!tasks.data.done){
      result = window.confirm("mark task as done?");
    }else{
      result = window.confirm("do you want to mark the task undone?");
    }
    if (result === true) {

      // mark the item as done
      db.collection(currentUser.uid)
        .doc("task")
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log(tasks.id);

            db.collection(currentUser.uid)
              .doc("task")
              .update({
                [`${tasks.id}`]: {
                  ...tasks.data,
                  done: !tasks.data.done,
                },
              })
              .then(() => {
                console.log("Task updated successfully");
                props.updateData();
              })
              .catch((error) => {
                console.log("Error deleting task:", error);
              });
          } else {
            console.log("couldnt delete the task");
          }
        });
    } 
  };

  return (
    <div onClick={onCheckHandler} className={classes.check}>
      {!tasks.data.done ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512">
          <path
            d="M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0 0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512">
          <rect
            x="64"
            y="64"
            width="384"
            height="384"
            rx="48"
            ry="48"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M352 176L217.6 336 160 272"
          />
        </svg>
      )}
    </div>
  );
};

export default SquareOutlineIcon;

import React, {useState} from "react";
import classes from './TaskTitle.module.css'
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import firebase from "firebase/compat/app";

const TaskTitle = (props) => {

  const {currentUser} = useAuth()
  const [tasks, setTasks] = useState(props);

  const taskDeleteHandler = () =>{

    console.log(props.id)

    const result = window.confirm('Are you sure you want to delete the task?')

    // console.log(tasks.id)

    if(result){
      // console.log(tasks)
      db.collection(currentUser.uid).doc('task').get().then((doc)=>{
        if(doc.exists){
          db.collection(currentUser.uid).doc('task').update({
            [`${tasks.id}`]: firebase.firestore.FieldValue.delete()
          }).then(()=>{
            console.log("task sucessfully deleted")
            props.updateData()
          }).catch((error)=>{
            console.error("error deleting task", error)
          })
        }
      })
    }
  }

  return (
    <div onClick={taskDeleteHandler} className={classes["task-info"]}>
      <h4>{props.donetask}</h4>
    </div>
  );
};

export default TaskTitle;

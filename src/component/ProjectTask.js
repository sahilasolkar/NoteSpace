import React from "react";
import classes from './ProjectTask.module.css'
import { ReactComponent as Done } from "../icons/checkmark-done-circle-outline.svg";
import { ReactComponent as Trash } from "../icons/trash-outline.svg";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {ReactComponent as Checkmark} from "../icons/checkmark-done.svg"
import firebase from "firebase/compat/app";

const ProjectTask = (props) => {

  const {currentUser} = useAuth()

  const onDeleteHandler = () =>{
    db.collection(currentUser.uid).doc('project').get().then((doc)=>{
      // console.log(doc.data())

      if(doc.exists){

        const temp = doc.data()[props.projectid].task
        // temp[props.dataid]= {
        //   ...props.data,
        //   status: "inprogress"
        // }
        delete temp[props.dataid]

        // console.log(props.dataid)
        // console.log(doc.data())
        db.collection(currentUser.uid).doc('project').update({
          [props.projectid]:{
            ...doc.data()[props.projectid],
            task: temp
          }
        }).then(()=>{
          // console.log(props.data.status)
          console.log("task successfully updated")
          props.rerender()  
        }).catch((error)=>{
          console.error("error updating the task",error)
        })
      }
    })
  }

  const onHandleCompleted = () =>{
    db.collection(currentUser.uid).doc('project').get().then((doc)=>{
      // console.log(doc.data())

      if(doc.exists){

        const temp = doc.data()[props.projectid].task
        temp[props.dataid]= {
          ...props.data,
          status: "completed"
        }

        // console.log(props.dataid)
        // console.log(doc.data())
        db.collection(currentUser.uid).doc('project').update({
          [props.projectid]:{
            ...doc.data()[props.projectid],
            task: temp,
            inProgress: doc.data()[props.projectid].inProgress-1,
            completed: doc.data()[props.projectid].completed+1
          }
        }).then(()=>{
          // console.log(props.data.status)
          console.log("task successfully updated")
          props.rerender()
        }).catch((error)=>{
          console.error("error updating the task",error)
        })
      }
    })
  }

  const onHandleInProgress = () =>{
    db.collection(currentUser.uid).doc('project').get().then((doc)=>{
      // console.log(doc.data())

      if(doc.exists){

        const temp = doc.data()[props.projectid].task
        temp[props.dataid]= {
          ...props.data,
          status: "inprogress"
        }

        // console.log(props.dataid)
        // console.log(doc.data())
        db.collection(currentUser.uid).doc('project').update({
          [props.projectid]:{
            ...doc.data()[props.projectid],
            task: temp,
            toDo: doc.data()[props.projectid].toDo-1,
            inProgress: doc.data()[props.projectid].inProgress+1
          }
        }).then(()=>{
          // console.log(props.data.status)
          console.log("task successfully updated")
          props.rerender()
        }).catch((error)=>{
          console.error("error updating the task",error)
        })
      }
    })
  }

  return (
    <div className={classes.tasks}>
      {/* {console.log(value)} */}
      <h5>{props.data.title} 
      <div className={classes.iconholder}>
      <Trash onClick={onDeleteHandler} className={classes.icons}/>
      {!props.data.status && <Done onClick={onHandleInProgress} className={classes.icons}/>}
      {props.data.status==="inprogress" && <Checkmark onClick={onHandleCompleted} className={classes.icons}/>}
      </div>
      </h5>
      <div className={classes.projectnotebody}>
        <p>{props.data.description}</p>
      </div>
      <div className={classes.taskdate}>
        {props.data.date}
      </div>
    </div>
  );
};

export default ProjectTask;

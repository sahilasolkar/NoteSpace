import React from "react";
import classes from "./ProjectFolder.module.css";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

//to make
//https://dribbble.com/shots/20666000-Task-Management-Dashboard

const ProjectFolder = (props) => {
  
  // console.log(props)
  // props.updateData()
  return (
    <div className={classes.customshape}>
      <div className={classes.customshapeinside}>
        <h4>{props.data.title}</h4>
        <p>{props.data.date}</p>
      </div>
    </div>
  );
};

export default ProjectFolder;

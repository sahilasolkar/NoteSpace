import React, { useState, useEffect } from "react";
import classes from "./ProjectBoard.module.css";
import { ReactComponent as Folder } from "../icons/folder-outline.svg";
import ProjectFolder from "./ProjectFolder";
import { ReactComponent as Doc } from "../icons/document-outline.svg";
import NotesBox from "./NotesBox";
import { ReactComponent as Add } from "../icons/add-circle-outline.svg";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProjectBoard = (props) => {

  const { currentUser } = useAuth();
  const [noteData, setNoteData] = useState(null);
  const [projectData, setProjectData] = useState(null);

  const onUpdateHandler = () => {
    getAllNotes();
  };

  const getAllNotes = () => {
    db.collection(currentUser.uid)
      .doc("notes")
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log(doc.data());
          setNoteData(doc.data());
          // console.log(noteData)
        } else {
          console.log("document not found");
        }
      });
  };

  const getAllProjects = () => {
    db.collection(currentUser.uid)
      .doc("project")
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log(doc.data())
          setProjectData(doc.data());
        } else {
          console.log("projects not found");
        }
      });
  };

  useEffect(() => {
    getAllNotes();
    getAllProjects();
  }, []);

  const navigate = useNavigate();

  const onAddNoteHandler = () => {
    navigate("/new-note");
  };

  const backgroundColors = ["#F0F0F0", "#FEF2F4", "#FCC8D1", "#F2E3DB", "#B9EDDD", "#DAF7A6", "#E9EDC9", "#F4EEE0", "#EEEEEE", "#ECF2FF","#ECF9FF","#FFFFE8","#D7E9B9","#FFF6BD","#E8F3D6","#FEFCF3","#DEF5E5",];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
}

  // console.log('running in main area')
  return (
    <div className={classes["main-container"]}>
      <div className={classes.heading}>Welcome back, name!</div>
      <div className={classes.projects}>
        <div className={classes.metaData}>
          <div className={classes.metaLeft}>
            <h4>Priority </h4>
            <h4>Due Date </h4>
          </div>
          <div className={classes.metaRight}>
            <h4>In Progress </h4>
            <h4>To Do </h4>
            <h4>Completed </h4>
          </div>
        </div>
      </div>
      <div className={classes.notes}>
        <p className={classes["notes-heading"]}>
          <Doc className={classes.icons} />
          New Task <Add onClick={onAddNoteHandler} className={classes.icons} />
        </p>
        <div className={classes['task-holders']}>
        <h4 className={classes.taskheading}>To Do</h4>
        <h4 className={classes.taskheading}>To Do</h4>
        <h4 className={classes.taskheading}>To Do</h4>
        </div>
        <div className={classes["notes-box-container"]}>
          <div className={classes['task-container']}>
            
            <div style={{ backgroundColor: getRandomColor() }} className={classes.tasks}>
              <h5>some heading</h5>
              <p>some description</p>
              <div className={classes.taskdate}>some date</div>
            </div>
            
          </div>
          <div className={classes['task-container']}>
           
          <div style={{ backgroundColor: getRandomColor() }} className={classes.tasks}>
              <h5>some heading</h5>
              <p>some description</p>
              <div className={classes.taskdate}>some date</div>
            </div>
          </div>
          <div className={classes['task-container']}>
           
          <div style={{ backgroundColor: getRandomColor() }} className={classes.tasks}>
              <h5>some heading</h5>
              <p>some description</p>
              <div className={classes.taskdate}>some date</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBoard;

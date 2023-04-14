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
import ProjectTask from "./ProjectTask";

const ProjectBoard = (props) => {
  const { currentUser } = useAuth();
  const [noteData, setNoteData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [tasksData, setTasksData] = useState(null);

  const getAllProjects = () => {
    db.collection(currentUser.uid)
      .doc("project")
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log(doc.data())
          // console.log(props.projectId)
          setProjectData(doc.data());
          // console.log(projectData)
        } else {
          console.log("projects not found");
        }
      });
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const navigate = useNavigate();

  const onAddNoteHandler = () => {
    navigate(`new-project-task/${props.projectId}`);
  };

  const backgroundColors = [
    "#F0F0F0",
    "#FEF2F4",
    "#FCC8D1",
    "#F2E3DB",
    "#B9EDDD",
    "#DAF7A6",
    "#E9EDC9",
    "#F4EEE0",
    "#EEEEEE",
    "#ECF2FF",
    "#ECF9FF",
    "#FFFFE8",
    "#D7E9B9",
    "#FFF6BD",
    "#E8F3D6",
    "#FEFCF3",
    "#DEF5E5",
  ];

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * backgroundColors.length);
    return backgroundColors[randomIndex];
  }

  const onDashboardHandler = () =>{
    navigate(`/${currentUser.displayName}`)
  }
  const onProjectHandler = () =>{
    
  }

  // console.log('running in main area')
  return (
    <div className={classes["main-container"]}>
      {/* {projectData && console.log(projectData[props.projectId].task)} */}
      {projectData && (
        <div className={classes.heading}>
          <h4 className={classes.dashboard} onClick={onDashboardHandler}>Dashboard</h4>
          <h4 onClick={onProjectHandler}>/Projects</h4>
          <h4>/{projectData[props.projectId].title}</h4>
        </div>
      )}
      <div className={classes.projects}>
        <div className={classes.metaData}>
          {projectData && (
            <div className={classes.metaLeft}>
              <h4>Priority: {projectData[props.projectId].priority}</h4>

              <h4>Due Date: {projectData[props.projectId].dueDate}</h4>
            </div>
          )}

          {projectData && (
            <div className={classes.metaRight}>
              <h4>In Progress: {projectData[props.projectId].inProgress}</h4>

              <h4>To Do: {projectData[props.projectId].toDo}</h4>

              <h4>Completed {projectData[props.projectId].completed}</h4>
            </div>
          )}
        </div>
      </div>
      <div className={classes.notes}>
        <p className={classes["notes-heading"]}>
          <Doc className={classes.icons} />
          New Task <Add onClick={onAddNoteHandler} className={classes.icons} />
        </p>
        <div className={classes["task-holders"]}>
          <h4 className={classes.taskheading}>To Do</h4>
          <h4 className={classes.taskheading}>In Progress</h4>
          <h4 className={classes.taskheading}>Completed</h4>
        </div>
        <div className={classes["notes-box-container"]}>
          <div className={classes["task-container"]}>
            {projectData &&
              Object.keys(projectData[props.projectId].task).map((key) => {
                
                if(!projectData[props.projectId].task[key].status){

                  return <div key={key} className={classes.changecolor} style={{ backgroundColor: getRandomColor() }}>
                    {console.log(projectData[props.projectId].task[key])}
                    <ProjectTask rerender={getAllProjects} projectid={props.projectId} dataid={key} data={projectData[props.projectId].task[key]} />
                  
                </div>
                }
})}
          </div>
          <div className={classes["task-container"]}>
          {projectData &&
              Object.keys(projectData[props.projectId].task).map((key) => {
                
                if(projectData[props.projectId].task[key].status==="inprogress"){

                  return <div key={key} style={{ backgroundColor: getRandomColor() }}>
                    {console.log(projectData[props.projectId].task[key])}
                    <ProjectTask rerender={getAllProjects} projectid={props.projectId} dataid={key} data={projectData[props.projectId].task[key]} />
                  
                </div>
                }
})}
          </div>
          <div className={classes["task-container"]}>
          {projectData &&
              Object.keys(projectData[props.projectId].task).map((key) => {
                
                if(projectData[props.projectId].task[key].status==="completed"){

                  return <div key={key} style={{ backgroundColor: getRandomColor() }}>
                    {console.log(projectData[props.projectId].task[key])}
                    <ProjectTask rerender={getAllProjects} projectid={props.projectId} dataid={key} data={projectData[props.projectId].task[key]} />
                  
                </div>
                }
})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBoard;

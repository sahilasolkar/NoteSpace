import React, { useState, useEffect } from "react";
import classes from "./MainArea.module.css";
import { ReactComponent as Folder } from "../icons/folder-outline.svg";
import ProjectFolder from "./ProjectFolder";
import { ReactComponent as Doc } from "../icons/document-outline.svg";
import NotesBox from "./NotesBox";
import { ReactComponent as Add } from "../icons/add-circle-outline.svg";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainArea = (props) => {
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
    navigate("/:id/new-note");
  };

  const onAddProjectHandler = () => {
    navigate("/:id/new-project");
  };

  const onProjectFolderHandler = () => {
    navigate(`/:id/project`);
  };

  // console.log(currentUser)

  // console.log('running in main area')
  return (
    <div className={classes["main-container"]}>
      <div className={classes.heading}>Welcome back, {currentUser.displayName}</div>
      <div className={classes.projects}>
        <p className={classes["project-heading"]}>
          <Folder className={classes.icons} /> My Projects
          <Add onClick={onAddProjectHandler} className={classes.icons} />
        </p>

        <div className={classes["folder-container"]}>
          {projectData &&
            Object.keys(projectData).map((doc) => (
              <Link key={doc} style={{ textDecoration: "none" }} to={`/:id/project/${doc}`}>
                <ProjectFolder
                  updateData={() => onUpdateHandler()}
                  
                  data={projectData[doc]}
                />
              </Link>
            ))}
        </div>
      </div>
      <div className={classes.notes}>
        <p className={classes["notes-heading"]}>
          <Doc className={classes.icons} />
          My Notes <Add onClick={onAddNoteHandler} className={classes.icons} />
        </p>
        <div className={classes["notes-box-container"]}>
          {noteData &&
            Object.keys(noteData).map((doc) => (
              <NotesBox
                updateData={() => onUpdateHandler()}
                key={doc}
                note={noteData[doc].note}
                title={noteData[doc].title}
                date={noteData[doc].date}
                data={noteData[doc]}
                id={doc}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainArea;

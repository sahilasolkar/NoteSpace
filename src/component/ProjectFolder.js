import React from "react";
import classes from "./ProjectFolder.module.css";

const ProjectFolder = () => {
  return (
    <div className={classes.customshape}>
      <div className={classes.customshapeinside}>
        <p>name of the project</p>
        <p>date</p>
      </div>
    </div>
  );
};

export default ProjectFolder;

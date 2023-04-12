import React from "react";
import classes from './ProjectTask.module.css'

const ProjectTask = (props) => {
  return (
    <div className={classes.tasks}>
      {/* {console.log(value)} */}
      <h5>{props.data.title}</h5>
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

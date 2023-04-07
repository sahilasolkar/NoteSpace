import React, { useEffect, useState } from "react";
import classes from "./Rightbar.module.css";
import { ReactComponent as Check } from "../icons/checkmark-circle-outline.svg";
import { ReactComponent as CheckSquare } from "../icons/checkbox-outline.svg";
// import { ReactComponent as Star } from "../icons/star-outline.svg";
import { ReactComponent as Time } from "../icons/time-outline.svg";
import { ReactComponent as Add } from "../icons/add-circle-outline.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import Star from "./Star";

const Rightbar = (props) => {
  const [isStarred, setIsStarred] = useState(false);
  const { currentUser } = useAuth();

  const handleStarClick = (val) => {
    console.log("handleStarClick", val);
    setIsStarred(!isStarred);
    if (isStarred) {
      db.collection(currentUser.uid).doc("task").get();
    }
  };

  const [taskData, setTaskData] = useState(null);

  const navigate = useNavigate();

  const onAddTaskHandler = () => {
    navigate("/new-task");
  };

  useEffect(() => {
    db.collection(currentUser.uid)
      .doc("task")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setTaskData(doc.data());
        } else {
          console.log("document not found");
        }
      });
    // console.log(taskData)
  }, []);

  return (
    <div className={classes["main-container"]}>
      <div className={classes["my-task"]}>
        <p>
          <Check className={classes.icons} /> My Task
          <Add onClick={onAddTaskHandler} className={classes.icons} />
        </p>
        <div className={classes["task-container"]}>
          <div className={classes["task-message-container"]}>
            {taskData &&
              Object.keys(taskData).map((key, index) => (
                <div key={index} className={classes["task-messages"]}>
                  <CheckSquare className={classes.check} />
                  <div className={classes["task-info"]}>
                    <h4>{taskData[key].title}</h4>
                    <div>{taskData[key].description}</div>
                  </div>
                  <Star
                    data={taskData[key]}
                    id={key}
                    className={classes.star}
                  />
                </div>
              ))}
          </div>
        </div>
        <div>
          <p>
            <Time className={classes.icons} />
            Recent Activity
          </p>
          <div className={classes["recent-activity-container"]}></div>
        </div>
      </div>
      <div className={classes["recent-activity"]}></div>
    </div>
  );
};

export default Rightbar;

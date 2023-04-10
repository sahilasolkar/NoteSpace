import React, { useCallback, useEffect, useState } from "react";
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
  const [taskData, setTaskData] = useState(null);
  const { currentUser } = useAuth();

  // const handleStarClick = (val) => {
  //   console.log("handleStarClick", val);
  //   setIsStarred(!isStarred);
  //   if (isStarred) {
  //     db.collection(currentUser.uid).doc("task").get();
  //   }
  // };

  const onUpdateHandler = (data) => {
    // setTaskData(data)
    getAlltasks();
  };

  //to set important
  // const StarClickHandler = (taskdata) => {
  //   console.log("clicked");
  //   // console.log(taskdata)
  // };

  const navigate = useNavigate();

  const onAddTaskHandler = () => {
    navigate("/new-task");
  };

  console.log(taskData);

  //removed the callback() here. 
  const getAlltasks = () => {
    db.collection(currentUser.uid)
      .doc("task")
      .get()
      .then((doc) => {
        if (doc.exists) {
          // const ordered = Object.keys(doc.data())
          //   .sort()
          //   .reduce((obj, key) => {
          //     obj[key] = doc.data()[key];
          //     return obj;
          //   }, {});
          setTaskData(doc.data());
        } else {
          console.log("document not found");
        }
      });
  };

  //to run the fetch get fn and settaskdata
  useEffect(() => {
    getAlltasks();
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
              Object.keys(taskData).map((taskid) => (
                <div key={taskid} className={classes["task-messages"]}>
                  <CheckSquare className={classes.check} />
                  <div className={classes["task-info"]}>
                    <h4>{taskData[taskid].title}</h4>
                    <div>{taskData[taskid].description}</div>
                  </div>
                  <Star
                    key={`${taskData[taskid].important}`}
                    updateData={() => onUpdateHandler()}
                    data={taskData[taskid]}
                    id={taskid}
                    // onClick={StarClickHandler}
                    // className={classes.star}
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

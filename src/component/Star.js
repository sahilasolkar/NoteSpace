import React, { useEffect, useMemo, useState } from "react";
import classes from "./Star.module.css";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const Star = (props) => {
  // const [isSelected, setIsSelected] = useState(false);

  const [tasks, setTasks] = useState(props);

  const { currentUser } = useAuth();

  const onClickHandler = async () => {
    await db
      .collection(currentUser.uid)
      .doc("task")
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log(doc.data());
          // console.log(props);

          db.collection(currentUser.uid)
            .doc("task")
            .update({
              [tasks.id]: {
                ...tasks.data,
                important: !tasks.data.important,
              },
            })
            .then(() => {
              console.log("task sucessfully updated");
              props.updateData();
              console.log(tasks);
            })
            .catch((error) => {
              console.error("error updating the task", error);
            });

          // props.updateData(tasks)

          // console.log('inside star')
          // console.log(tasks.id)
          // console.log(tasks.data.title)
          // console.log(tasks.data.title)
          // console.log(tasks.data.task)
          // console.log(tasks.data.status)
          // console.log(tasks.data.important)
        } else {
          console.log("document not found");
        }
      });
  };

  // const starClasssss = useMemo(() => {
  //   if (tasks.data.important === true) {
  //     return classes["star-selected"];
  //   }
  //   return classes["star"];
  // }, [tasks]);

  // console.log({ starClasssss });

  return (
    <div className={classes.starClass} onClick={() => onClickHandler()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ionicon"
        viewBox="0 0 512 512">
        <path
          d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
          fill={tasks.data.important === true ? "yellow" : "none"}
          stroke="currentColor"
          stroke-line-join="round"
          strokeWidth="32"
        />
      </svg>
    </div>
  );
};

export default Star;

import React, { useEffect, useState } from "react";
import classes from "./Star.module.css";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const Star = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const { currentUser } = useAuth();

  const onClickHandler = () => {
    // setIsSelected(!isSelected);
    // console.log(props.data)
    db.collection(currentUser.uid)
      .doc("task")
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log(doc.data());
          console.log(props);
          const tasks = props;
          console.log(tasks.id)

          //these are my changes
          console.log('leaging git hub')

        } else {
          console.log("document not found");
        }
      });
  };

  const starClass = isSelected ? classes["star-selected"] : classes["star"];

  return (
    <div className={classes.starClass} onClick={onClickHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ionicon"
        viewBox="0 0 512 512">
        <path
          d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
          fill={isSelected ? "yellow" : "none"}
          stroke="currentColor"
          stroke-line-join="round"
          strokeWidth="32"
        />
      </svg>
    </div>
  );
};

export default Star;

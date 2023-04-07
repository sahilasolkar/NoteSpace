import React, {useState} from "react";
import classes from "./Dashboard.module.css";
import Sidebar from "./Sidebar";
import MainArea from "./MainArea";
import Rightbar from "./Rightbar";
import NewNote from "./NewNote";
import { useAuth } from "../context/AuthContext";
// import {db} from '../firebase'

const Dashboard = () => {

  const [isNewNote, setIsNewNote] = useState(false)

  const handleNewNoteState = (newNoteState) =>{
    setIsNewNote(newNoteState)
  }

  return (
    <div className={classes.container}>
      {/* <NewNote/> */}
      <Sidebar/>
      <MainArea newNoteState={handleNewNoteState}/>
      <Rightbar/>
    </div>
  );
};

export default Dashboard;

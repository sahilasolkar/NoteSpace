import React, {useState} from "react";
import classes from "./Sidebar.module.css";
import dummyImage from "../image/dp.jpg";
import { ReactComponent as Check } from '../icons/checkmark-circle-outline.svg';
import { ReactComponent as Doc } from '../icons/document-outline.svg';
import { ReactComponent as Home } from '../icons/home-outline.svg';
import { ReactComponent as Search } from '../icons/search-outline.svg';
import {ReactComponent as Folder} from '../icons/folder-outline.svg';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const {currentUser, logout} = useAuth()
  const [error, setError] = useState()
  const navigate = useNavigate()

  // console.log(currentUser.email)

  const handleLogout = async () =>{
    setError('')
    try{
      await logout()
      navigate('/login')
    }catch{
      setError('couldnt logout')
    }
  }

  const takeToProfile = () =>{
    navigate('/user-details')
  }

  return (
    <div className={classes["side-bar-container"]}>
      <div className={classes["profile-with-image"]}>
        <img onClick={takeToProfile} src={dummyImage} alt="" />
        <div className={classes["profile-short"]}>
          <h1>name</h1>
          <p>{currentUser.email}</p>
        </div>
      </div>

      <div className={classes.projects}>
        <button>+ New Project</button>
        <div className={classes['projects-functions']}>
          <p><Check className={classes.icons}/> Search</p>
          <p><Doc className={classes.icons}/> Home</p>
          <p><Home className={classes.icons}/> Notes</p>
          <p><Search className={classes.icons}/> Tasks</p>
        </div>
      </div>

      <div className={classes["project-list"]}>
        <p><Folder className={classes.icons}/>Projects</p>
        <ul className={classes['project-list-items']}>
          <li>project-1</li>
          <li>project-2</li>
          <li>project-3</li>
          <li>project-4</li>
        </ul>
      </div>

      <div className={classes.support}>support</div>
      <div className={classes.logout} onClick={handleLogout}>logout</div>
    </div>
  );
};

export default Sidebar;

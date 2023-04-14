import React, {useState, useEffect} from "react";
import classes from "./Sidebar.module.css";
import dummyImage from "../image/dp.jpg";
import { ReactComponent as Check } from '../icons/checkmark-circle-outline.svg';
import { ReactComponent as Doc } from '../icons/document-outline.svg';
import { ReactComponent as Home } from '../icons/home-outline.svg';
import { ReactComponent as Search } from '../icons/search-outline.svg';
import {ReactComponent as Folder} from '../icons/folder-outline.svg';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";

const Sidebar = (props) => {
  const {currentUser, logout} = useAuth()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const [projectData, setProjectData] = useState(null)

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
    navigate(`/${currentUser.displayName}/user-details`)
  }

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

  const newProjectClickHandler = () =>{
    navigate(`/${currentUser.displayName}/new-project`)
  }

  useEffect(() => {

    getAllProjects();
  }, []);

  return (
    <div className={classes["side-bar-container"]}>
      <div className={classes["profile-with-image"]}>
        <img onClick={takeToProfile} src={dummyImage} alt="" />
        <div className={classes["profile-short"]}>
          <h1>{currentUser.displayName}</h1>
          <p>{currentUser.email}</p>
        </div>
      </div>

      <div className={classes.projects}>
        <button onClick={newProjectClickHandler}>+ New Project</button>
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
        {projectData && Object.keys(projectData).map((doc)=>(
          <Link className={classes.linkele} key={doc} style={{ textDecoration: "none" }} to={`/${currentUser.displayName}/project/${doc}`}>
          <li>{projectData[doc].title}</li>
          </Link>
        ))}
        </ul>
      </div>

      <div className={classes.support}>support</div>
      <div className={classes.logout} onClick={handleLogout}>logout</div>
    </div>
  );
};

export default Sidebar;

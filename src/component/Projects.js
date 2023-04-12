import React from 'react'
import Sidebar from './Sidebar'
import Rightbar from './Rightbar'
import classes from './Projects.module.css'
import ProjectBoard from './ProjectBoard'
import { useParams } from 'react-router-dom'

const Projects = () => {

 const {id} = useParams()

  return (
    <div>
      <div className={classes.container}>
      <Sidebar/>
      <ProjectBoard projectId={id}/>
      <Rightbar/>
    </div>
    </div>
  )
}

export default Projects
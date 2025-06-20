import { useContext, useEffect, useRef, useState } from "react";
import { CanvasContext } from "../app";
import ProjectIframe from "./ProjectIframe";
import './Project.css'
import ProjectMenu from "./ProjectMenu";
import ProjectInfo from "./ProjectInfo";

export default function Project (props){
  const canvas = useContext(CanvasContext)
  const [projectStatus, setProjectStatus] = useState("miniature")
  const [projectShowing, setProjectShowing] = useState("show-page")
  const maxX = 20
  const maxY = 20
  const project3dPosition = useRef({
    x: `${props.position.x + (Math.random() * 2 - 1) * maxX}`, 
    y: `${props.position.y + (Math.random() * 2 - 1) * maxY}`, 
    z: Math.ceil(Math.random() * -1000)})

  function moveToProject(){
    const posX = -(window.innerWidth * props.scene.x / 100) - (window.innerWidth  * (project3dPosition.current.x / 100 ))
    const posY =  -(window.innerHeight * props.scene.y/ 100)  - (window.innerHeight * (project3dPosition.current.y / 100 ))
    const posZ = -(props.scene.z) - project3dPosition.current.z

    canvas.updateContainer3dPosition(posX, posY, posZ) // recibe px tambien
    canvas.moveContainer3d() // usa todo pixeles
  }

  let style = {
    transform: `
      translate3d(
        ${project3dPosition.current.x}%, 
        ${project3dPosition.current.y}%,
        ${project3dPosition.current.z}px)
    `
  };
  
  const miniatureClasses = useRef("")

  if (canvas.activeSceneIdState === "ini") {
    miniatureClasses.current = "project-miniature miniature-hidden"
  } else if (canvas.activeSceneIdState === props.scene.id){ 
    if (projectStatus === "miniature"){
      miniatureClasses.current = "project-miniature miniature-appear"
      style.pointerEvents = canvas.activeProjectIdRef === props.projectData.id ? 'none' : 'auto'
    } else if (projectStatus === "start") {
      miniatureClasses.current = "project-miniature miniature-disappear"
    } else {
      miniatureClasses.current = "project-miniature miniature-hidden"
    }
  } else if (canvas.activeSceneIdState !== props.scene.id){
    console.log("!==",miniatureClasses.current)
    if (miniatureClasses.current.includes("miniature-appear")){
      miniatureClasses.current = "project-miniature miniature-disappear"
    }
  }
   console.log("projectstatus: ", projectStatus)

  return (
    <article 
      className='project'
      style={style}
      id={props.projectData.id}
      onClick={() => {
        moveToProject()
        setProjectStatus("start")
        canvas.activateProjectById(props.projectData.id)
        canvas.hideHeadline()
      }}
    >
      <div 
        className={miniatureClasses.current}
        style={{backgroundImage: `url(${props.projectData.projectMiniatureUrl})`}} 
      >
      </div>
      
      {
        (projectStatus === "start") && 
          <>
            <ProjectMenu 
              projectData={props.projectData} 
              projectStatus={projectStatus}  
              setProjectStatus={setProjectStatus} 
              setProjectShowing={setProjectShowing}
              projectShowing={projectShowing}
            />
            <ProjectInfo 
              projectData={props.projectData}  
              projectShowing={projectShowing}
            />
            <ProjectIframe 
              projectData={props.projectData} 
              projectShowing={projectShowing}
            />
          </>
      }
      
    </article>
  )
}



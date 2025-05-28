import { useContext, useRef } from "react";
import { CanvasContext } from "../app";
import ModuleWeb from "./ModuleWeb";

export default function Project (props){
  const canvas = useContext(CanvasContext)
  const maxX = 30
  const maxY = 30
  const style = {};
  const project3dPosition = useRef({
    x: `${props.position.x + (Math.random() * 2 - 1) * maxX}`, 
    y: `${props.position.y + (Math.random() * 2 - 1) * maxY}`, 
    z: 0})

  project3dPosition.current.z = Math.ceil(Math.random() * -1000)
  style.transform = `translate3d(${project3dPosition.current.x}%, ${project3dPosition.current.y}%, ${project3dPosition.current.z}px)`

  function moveToproject(){
    if (props.scene.id === canvas.activeSceneIdRef.current) {
      const posX = -(window.innerWidth * props.scene.x / 100) - (window.innerWidth  * (project3dPosition.current.x / 100 ))
      const posY =  -(window.innerHeight * props.scene.y/ 100)  - (window.innerHeight * (project3dPosition.current.y / 100 ))
      const posZ = -(props.scene.z) - project3dPosition.current.z
      canvas.updateContainer3dPosition(posX, posY, posZ) // recibe px tambien
      canvas.moveContainer3d() // usa todo pixeles
      canvas.activateProjectById(props.projectData.id)
    } 
  }

  return (
    <div 
      className='project'
      style={style}
      id={props.projectData.id}
      onClick={moveToproject}
    >
        <ModuleWeb projectData={props.projectData}/>
    </div>
  )
}



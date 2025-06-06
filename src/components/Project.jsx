import { useContext, useEffect, useRef, useState } from "react";
import { CanvasContext } from "../app";
import ModuleWeb from "./ModuleWeb";
import ProjectFloatingMenu from "./ProjectFloatingMenu";

export default function Project (props){
  const canvas = useContext(CanvasContext)
  const maxX = 20
  const maxY = 20
  const style = {};
  const project3dPosition = useRef({
    x: `${props.position.x + (Math.random() * 2 - 1) * maxX}`, 
    y: `${props.position.y + (Math.random() * 2 - 1) * maxY}`, 
    z: Math.ceil(Math.random() * -1000)})
  
  style.transform = `translate3d(${project3dPosition.current.x}%, ${project3dPosition.current.y}%, ${project3dPosition.current.z}px)`

  function activateToproject(){
    if (props.scene.id === canvas.activeSceneIdRef.current) {
      const posX = -(window.innerWidth * props.scene.x / 100) - (window.innerWidth  * (project3dPosition.current.x / 100 ))
      const posY =  -(window.innerHeight * props.scene.y/ 100)  - (window.innerHeight * (project3dPosition.current.y / 100 ))
      const posZ = -(props.scene.z) - project3dPosition.current.z
      canvas.updateContainer3dPosition(posX, posY, posZ) // recibe px tambien
      canvas.moveContainer3d() // usa todo pixeles
      canvas.activateProjectById(props.projectData.id)
    } 
  }

  const isActive = props.scene.id === canvas.activeSceneIdState;
  const [showModule, setShowModule] = useState(isActive);// MANEJA si el módulo debe renderizarse
  const [fadeOut, setFadeOut] = useState(false); // agrega clase fade-out

  useEffect(() => {
    if (isActive) {
      setFadeOut(false);
      setShowModule(true);
    } else if (showModule) {
      setFadeOut(true);
      const timeout = setTimeout(() => setShowModule(false), 1000); 
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  return (
    <article 
      className='project'
      style={style}
      id={props.projectData.id}
      onClick={activateToproject}
    >
        { showModule && 
          <>
            <div className={fadeOut ? "project--content fade-out" : "project--content"}>
              <ModuleWeb projectData={props.projectData} />
            </div>
          </>
          
        }
    </article>
  )
}



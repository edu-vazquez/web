import { useRef } from "react";
import Project from "./Project";

export default function Scene(props){
  const sceneRef = useRef(null);
  const projectsPositions = [
    { x: -50, y: -50 },
    { x: -50, y: 50 },
    { x: 50, y: 50 },
    { x: 50, y: -50 },
    { x: 150, y: -50 },
    { x: 150, y: 50 },
    { x: -150, y: 50 },
    { x: -150, y: -50 },
  ]
  let projectsPositionsIndex = 0

  return (
      <section 
        className="scene"
        id={props.scene.id}
        ref={sceneRef}
        style={{
          transform: `translate3d(${props.scene.x}%, ${props.scene.y}%, ${props.scene.z}px)`,
        }}
      >
        {props.scene.projects.map((project, index) => (
          <>
            <Project
              key={project.id}
              projectData={project}
              scene={props.scene}
              position={projectsPositions[projectsPositionsIndex++]}
            />

            <EmptyProject
              key={index}
              sceneId={props.scene.id}
              position={projectsPositions[projectsPositionsIndex++]}
            />
          </>
        ))}
      </section>
    )
}

function EmptyProject (props){
  const maxX = 200
  const maxY = 200
  const minZ = 500
  const maxZ = 3000
  const style = {};
  const project3dPosition = useRef({
    x: `${props.position.x + (Math.random() * 2 - 1) * maxX}`, 
    y: `${props.position.y + (Math.random() * 2 - 1) * maxY}`, 
    z: (Math.floor(Math.random() * (maxZ - minZ + 1)) + minZ) * -1})

  style.transform = `translate3d(${project3dPosition.current.x}%, ${project3dPosition.current.y}%, ${project3dPosition.current.z}px)`

  return (
    <section 
      className={'project project--empty'}
      style={style}
    >
    </section>
  )
}




import Project from "./Project";
import { useRef } from 'preact/hooks';

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
      <div 
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
      </div>
    )
}

function EmptyProject (props){
  const maxX = 30
  const maxY = 30
  const style = {};
  const project3dPosition = useRef({
    x: `${props.position.x + (Math.random() * 2 - 1) * maxX}`, 
    y: `${props.position.y + (Math.random() * 2 - 1) * maxY}`, 
    z: 0})

  project3dPosition.current.z = (Math.floor(Math.random() * (2000 - 500 + 1)) + 500) * -1

  style.transform = `translate3d(${project3dPosition.current.x}%, ${project3dPosition.current.y}%, ${project3dPosition.current.z}px)`

  return (
    <div 
      className={'project-empty'}
      style={style}
    >
    </div>
  )
}




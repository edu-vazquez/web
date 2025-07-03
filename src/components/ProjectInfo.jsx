import { useRef } from "preact/hooks";
import './ProjectInfo.css'

export default function ProjectInfo(props){
  const classes = useRef("ini")

  console.log(props.projectShowing)
  if( props.projectShowing === "ini"){
    classes.current = "project-info project-info-ini"
  } else if (props.projectShowing === 'show-page'){
    classes.current = "project-info project-info-show-page"
  } else if (props.projectShowing === 'show-info') {
    classes.current = "project-info project-info-show-info"
  }


  return (
    <div 
      className={classes.current}
      id={`${props.projectData.id}-info`}
      >
      <h3>
        {props.projectData.projectName} 
        <a 
          href={props.projectData.projectUrl} 
          target="_blank"
          onClick={(e) => e.stopPropagation()}
        >
          <i class="fa-solid fa-up-right-from-square"></i>
        </a>
      </h3>
        
      <p>{props.projectData.description}</p>
      <ul>
        {
          props.projectData.technologies.map((item, index) => {
            return <li key={`tech-${index}`}>{item}</li>
          })
        }
      </ul>
      
    </div>
  )
}

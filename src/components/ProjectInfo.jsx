import './ProjectInfo.css'

export default function ProjectInfo(props){
  let classes = ''

  if (props.projectStatus === 'start'){
    classes = "project-info project-info-start"
  } else if (props.projectStatus === 'info') {
    classes = "project-info project-info-info"
  }


  return (
    <div 
      className={classes}
      id={`${props.projectData.id}-info`}
      >
      <a 
        href={props.projectData.projectUrl} 
        target="_blank"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{props.projectData.projectName} <i class="fa-solid fa-up-right-from-square"></i></h3>
        
      </a>
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
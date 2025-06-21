import './ProjectInfo.css'

export default function ProjectInfo(props){
  let classes = ''

  if (props.projectShowing === 'show-page'){
    classes = "project-info project-info-show-page"
  } else if (props.projectShowing === 'show-info') {
    classes = "project-info project-info-show-info"
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

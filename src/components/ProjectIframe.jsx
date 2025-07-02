import './ProjectIframe.css'
export default function ProjectIframe(props){

  let iframeContainerClass = ""

  if (props.projectShowing === 'show-page'){
    iframeContainerClass = 'project-iframe-container project-iframe-show-page'
  } else if (props.projectShowing === 'show-info') {
    iframeContainerClass = 'project-iframe-container project-iframe-show-info'
  }

  return (
    <div
      className={iframeContainerClass}
    >
      <iframe 
        src={props.projectData.projectUrl} 
        frameborder="0"
        id={`${props.projectData.id}-iframe`}
      >
      </iframe>
    </div>
  )
}

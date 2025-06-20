import { useEffect, useState } from 'react'
import './ProjectIframe.css'
export default function ProjectIframe(props){

  const [iframeClasses, setIframeClasses] = useState('');

  useEffect(() => {
    if (props.projectShowing === 'show-page'){
      setIframeClasses('project-iframe-container project-iframe-start')
    } else if (props.projectShowing === 'show-info') {
      setIframeClasses('project-iframe-container project-iframe-info')
    }
  }, [props.projectShowing])


  return (
    <div
      className={iframeClasses}
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

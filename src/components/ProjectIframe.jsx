import { useEffect, useState } from 'react'
import './ProjectIframe.css'
export default function ProjectIframe(props){

  const [iframeClasses, setIframeClasses] = useState('');

  useEffect(() => {
    if (props.projectStatus === 'start'){
      setIframeClasses('project-iframe-container project-iframe-start')
    } else if (props.projectStatus === 'info') {
      setIframeClasses('project-iframe-container project-iframe-info')
    }
  }, [props.projectStatus])


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
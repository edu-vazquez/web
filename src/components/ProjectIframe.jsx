import { useEffect, useRef } from "react";

export default function ProjectIframe(props){

  return (
    <div
      className='project-content'
    >
      <iframe 
        src={props.projectData.projectUrl} 
        frameborder="0"
        id={`${props.projectData.id}-iframe`}
        onLoad={() => {
          console.log(document.querySelector(`#${props.projectData.id}-iframe`).contentDocument.body.scrollHeight)
        }}
      >
      </iframe>
    </div>
  )
}
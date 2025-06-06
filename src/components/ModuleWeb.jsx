import { useEffect, useRef, useState } from "react";
import "./ModuleWeb.css";

export default function ModuleWeb(props){
  const moduleWebRef = useRef(null)
  const iframeRef = useRef(null)
  const [isProjectAct, setIsProjectAct] = useState(false)

  function activateProject(){
    setTimeout(() => {
      moduleWebRef.current.style.backgroundImage = `none`
    }, 1000)
    
    moduleWebRef.current.classList.add(`module-web-active`)
  }

  useEffect(() => {

    moduleWebRef.current.style.backgroundImage = `url(${props.projectData.projectMiniatureUrl})`
    
    moduleWebRef.current.addEventListener('click', () => {
      activateProject()
    })

    if (isProjectAct && iframeRef.current) {
    const iframe = iframeRef.current;

    const handleLoad = () => {
      iframe.classList.add('iframe-visible');
    };

    iframe.addEventListener('load', handleLoad);

    return () => {
      iframe.removeEventListener('load', handleLoad); // limpieza
    };
  }

  }, [isProjectAct]);



  return (
    <div
      className='module-web'
      id={props.projectData.id}
      ref={moduleWebRef}
      onClick={() => setIsProjectAct(!isProjectAct)}
    >
      {
        isProjectAct && (
          <div 
            className="module-web-info"
          >
            <div>
                <h3>{props.projectData.projectName}</h3>
              <p>{props.projectData.description}</p>
              <ul>
                {
                  props.projectData.technologies.map(item => {
                    return <li>{item}</li>
                  })
                }
              </ul>
            </div>
            <span class="material-symbols-outlined">arrow_back_ios</span>
          </div>
          )
      }
      {
        isProjectAct && 

        <>
          <div className="buttons-container">
            <button>
              <p>info+</p>
            </button>
            <button>
              <p>close</p>
            </button>
          </div>
          <div className="module-web-page">
            <iframe 
              src={props.projectData.projectUrl} 
              frameborder="0"
              ref={iframeRef}
            >
            </iframe>
          </div>
        </>
      }
    </div>
  )
}
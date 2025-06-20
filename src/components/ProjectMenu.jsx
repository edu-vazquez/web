import "./ProjectMenu.css"
import { CanvasContext } from '../app';
import { useContext } from 'preact/hooks';

export default function ProjectMenu(props){
  const canvas = useContext(CanvasContext);

  function handleInfoBtn(e){
    e.stopPropagation()

    if (props.projectStatus === 'start'){
      props.setProjectStatus('info')
      document.querySelector('#project-menu-info-btn').textContent = 'info-'
    } else if (props.projectStatus === 'info') {
      props.setProjectStatus('start')
      document.querySelector('#project-menu-info-btn').textContent = 'info+'
    }
  }

  function handleCloseBtn(e){
    e.stopPropagation()
    props.setProjectStatus('miniature')
    canvas.activateSceneById(canvas.activeSceneIdState)
    canvas.showHeadline()
  }

  return (
    <nav className="project-menu">
      <div className="project-menu-container-btn">
        <button
          onClick={handleInfoBtn}
          id="project-menu-info-btn"
        >
          info+
        </button>
      </div>
      <div className="project-menu-container-btn">
        <button
          onClick={handleCloseBtn}
          id="project-menu-close-btn"
        >close</button>
      </div>
    </nav>
  )
}

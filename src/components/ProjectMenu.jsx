import "./ProjectMenu.css"
import { CanvasContext } from "../app";
import { useContext } from "preact/hooks";

export default function ProjectMenu(props){
  const canvas = useContext(CanvasContext);

  function handleInfoBtn(e){
    e.stopPropagation()

    if (props.projectShowing === "show-page" || props.projectShowing === "ini"){
      document.querySelector("#project-menu-info-btn").textContent = "info-"
      props.setProjectShowing("show-info")
    } else if (props.projectShowing === "show-info") {
      document.querySelector("#project-menu-info-btn").textContent = "info+"
      props.setProjectShowing("show-page")
    }
  }

  function handleCloseBtn(e){
    e.stopPropagation()
    props.setProjectStatus("miniature")
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

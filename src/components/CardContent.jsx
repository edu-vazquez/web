import { useContext, useEffect, useRef, useState } from "react"
import { CanvasContext } from "../app";


export default function CardContent(props){
  const canvas = useContext(CanvasContext)

  const [contentState, setContentState] = useState(null)

  function handleClick(){
    if (props.scene.id === canvas.activeSceneRef.current){
      contentState ? setContentState(null) : setContentState('something')
    }
  }

  const cubeRef = useRef(null)
  const face01 = useRef(null)
  const face02 = useRef(null)
  const face03 = useRef(null)
  const face04 = useRef(null)
  const face05 = useRef(null)
  const face06 = useRef(null)

  // Aplica la imagen de fondo cuando contentState cambia a "something"
  useEffect(() => {
    if (contentState) {
      face01.current.style.backgroundImage = `url(${props.card.image01})`
      face02.current.style.backgroundImage = `url(${props.card.image02})`
      face03.current.style.backgroundImage = `url(${props.card.image03})`
      face04.current.style.backgroundImage = `url(${props.card.image04})`
      face05.current.style.backgroundImage = `url(${props.card.image05})`
      face06.current.style.backgroundImage = `url(${props.card.image06})`
    }
  }, [contentState, props.card.image01])

  return (
    <div
      className="card-content"
      onClick={handleClick}
    >
      {
        contentState && (
          <div className="cube-container">
            <div class="cube" id="cube" ref={cubeRef}>
              <div className="face face01" ref={face01}>Front</div>
              <div className="face face02" ref={face02}>Back</div>
              <div className="face face03" ref={face03}>Right</div>
              <div className="face face04" ref={face04}>Left</div>
              <div className="face face05" ref={face05}>Top</div>
              <div className="face face06" ref={face06}>Bottom</div>
            </div>
          </div>
        )
      }
      
    </div>
  )
}
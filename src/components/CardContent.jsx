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
  const faceFront = useRef(null)
  const faceBack = useRef(null)
  const faceRight = useRef(null)
  const faceLeft = useRef(null)
  const faceTop = useRef(null)
  const faceBottom = useRef(null)

  // Aplica la imagen de fondo cuando contentState cambia a "something"
  useEffect(() => {
    if (contentState && faceFront.current) {
      faceFront.current.style.backgroundImage = `url(${props.card.image01})`
      faceBack.current.style.backgroundImage = `url(${props.card.image02})`
      faceRight.current.style.backgroundImage = `url(${props.card.image03})`
      faceLeft.current.style.backgroundImage = `url(${props.card.image04})`
      faceTop.current.style.backgroundImage = `url(${props.card.image05})`
      faceBottom.current.style.backgroundImage = `url(${props.card.image06})`
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
              <div className="face front" id="face-front" ref={faceFront}>Front</div>
              <div className="face back" id="face-back" ref={faceBack}>Back</div>
              <div className="face right" id="face-right" ref={faceRight}>Right</div>
              <div className="face left" id="face-left" ref={faceLeft}>Left</div>
              <div className="face top" id="face-top" ref={faceTop}>Top</div>
              <div className="face bottom" id="face-bottom" ref={faceBottom}>Bottom</div>
            </div>
          </div>
        )
      }
      
    </div>
  )
}
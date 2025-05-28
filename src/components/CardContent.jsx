import { useContext, useEffect, useRef, useState } from "react"
import { CanvasContext } from "../app";
import CardImagesContainer from "./CardImagesContainer";


export default function CardContent(props){
  const canvas = useContext(CanvasContext)

  const [contentState, setContentState] = useState(false)

  function handleClick(){
    if (props.scene.id === canvas.activeSceneIdRef.current){
      contentState ? setContentState(false) : setContentState(true)
    }
  }

  return (
    <div
      className="card-content"
      onClick={handleClick}
    >
      { contentState && <CardImagesContainer card={props.card} /> } 
    </div>
  )
}
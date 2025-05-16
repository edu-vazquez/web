import { useContext, useRef } from "react";
import { CanvasContext } from "../app";

export default function Card (props){
  const canvas = useContext(CanvasContext)
  const maxX = 5
  const maxY = 5

  const cardId = props.card?.id ?? props.cardRandomId;
  const style = {};
  const card3dPosition = useRef({
    x: `${props.position.x + (Math.random() * 2 - 1) * maxX}`, 
    y: `${props.position.y + (Math.random() * 2 - 1) * maxY}`, 
    z: 0})

  if (props.card?.imageUrl) {
    style.backgroundImage = `url(${props.card.imageUrl})`;
    card3dPosition.current.z = Math.ceil(Math.random() * -200)
  } else {
    card3dPosition.current.z = Math.ceil(Math.random() * -300)
  }
  style.transform = `translate3d(${card3dPosition.current.x}%, ${card3dPosition.current.y}%, ${card3dPosition.current.z}px)`


  return (
    <div 
      className={props.className}
      style={style}
      id={cardId}
      onClick={() => canvas.activateCardById(props.sceneId, cardId)}
    >
    </div>
  )
}



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

  function moveToCard(){
    const posX = -(window.innerWidth * props.scene.x / 100) - (window.innerWidth  * (card3dPosition.current.x / 100 ))
    const posY =  -(window.innerHeight * props.scene.y/ 100)  - (window.innerHeight * (card3dPosition.current.y / 100 ))
    const posZ = -(props.scene.z) - card3dPosition.current.z
    canvas.updateContainer3dPosition(posX, posY, posZ) // recibe px tambien
    canvas.moveContainer3d() // usa todo pixeles
    canvas.activateCardById(cardId)
  }

  return (
    <div 
      className={props.className}
      style={style}
      id={cardId}
      onClick={moveToCard}
      /* onClick={() => canvas.activateCardById(cardId)} */
    >
    </div>
  )
}



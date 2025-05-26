import Card from "./Card";
import { useRef } from 'preact/hooks';

export default function Scene(props){
  const sceneRef = useRef(null);

  const cardsPositions = [
    { x: -150, y: 50 },
    { x: -150, y: -50 },
    { x: -50, y: -50 },
    { x: -50, y: 50 },
    { x: 50, y: 50 },
    { x: 50, y: -50 },
    { x: 150, y: -50 },
    { x: 150, y: 50 },
  ]
  let cardsPositionsIndex = 0

  return (
      <div 
        className="scene"
        id={props.scene.id}
        ref={sceneRef}
        style={{
          transform: `translate3d(${props.scene.x}%, ${props.scene.y}%, ${props.scene.z}px)`,
        }}
      >
        {props.scene.cards.map((card, index) => (
          <>
            <Card
              key={card.id}
              card={card}
              scene={props.scene}
              className={'project'}
              position={cardsPositions[cardsPositionsIndex++]}

              /* el cardId se asigna con el id del objeto card */
            />
            <Card
              key={index}
              className={'project-empty'}
              sceneId={props.scene.id}
              cardRandomId={`${props.scene.id}-project-empty-${index}`}
              position={cardsPositions[cardsPositionsIndex++]}
            />
          </>
        ))}
      </div>
    )
}


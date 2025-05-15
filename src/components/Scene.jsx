import Card from "./Card";
import { useRef } from 'preact/hooks';

export default function Scene(props){
  const sceneRef = useRef(null);

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
              className={'card'}
              sceneId={props.scene.id}
            />
            <Card
              key={index}
              className={'card-random'}
              sceneId={props.scene.id}
              cardRandomId={`${props.scene.id}-${index}`}
            />
          </>
        ))}
      </div>
    )
}


import Card from "./Card";
import { CanvasContext } from '../app';
import { useContext, useEffect, useRef } from 'preact/hooks';

export default function Scene(props){
  const canvas = useContext(CanvasContext);
  const sceneRef = useRef(null);

  return (
      <div 
        className="scene"
        id={props.scene.id}
        onClick={() => canvas.activateSceneById(props.scene.id)}
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
              class={'card'}
            />
            <Card
              key={index}
              class={'card-random'}
            />
          </>
        ))}
      </div>
    )
}


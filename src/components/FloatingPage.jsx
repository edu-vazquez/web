import Card from "./Card";
import { SceneContext } from '../app';
import { useContext, useEffect, useRef } from 'preact/hooks';



export default function FloatingPage(props){
  const scene = useContext(SceneContext);
  const pageRef = useRef(null);

  function moveToPage(){
    scene.container3dPosition.current.x = window.innerWidth * props.page.x / 100 * -1
    scene.container3dPosition.current.y = window.innerHeight * props.page.y / 100 * -1
    scene.container3dPosition.current.z = props.page.z * -1
    scene.moveContainer3d()
  }

  return (
      <div 
        className="page"
        onClick={moveToPage}
        ref={pageRef}
        style={{
          transform: `translate3d(${props.page.x}%, ${props.page.y}%, ${props.page.z}px)`,
        }}
      >
        {props.page.cards.map((card, index) => (
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


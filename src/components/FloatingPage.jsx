import Card from "./Card";
import { SceneContext } from '../app';
import { useContext } from 'preact/hooks';



export default function FloatingPage(props){
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const scene = useContext(SceneContext);

  function moveToPage(){
    scene.container3dPosition.current.x = windowWidth * props.page.x / 100 * -1
    scene.container3dPosition.current.y = windowHeight * props.page.y / 100 * -1
    scene.container3dPosition.current.z = props.page.z * -1
    scene.moveContainer3d()
  }

  return (
      <div 
        className="page"
        onClick={moveToPage}
        style={{
          transform: `translate3d(${props.page.x}%, ${props.page.y}%, ${props.page.z}px)`,
          borderColor: `${props.page.color}`,
          width: `${windowWidth}px`,
          height: `${windowHeight}px`,
        }}
      >
            <Card card={props.page.cards.card1}/>
            <Card card={props.page.cards.card2}/>
            <Card card={props.page.cards.card3}/>
            <Card card={props.page.cards.card4}/>
      </div>
    )
}


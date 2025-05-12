import { useContext } from 'preact/hooks';
import { CanvasContext } from '../app';

export default function Card (props){
  const canvas = useContext(CanvasContext);
  const maxY = 10
  const maxX = 30

  const style = {};

  if (props.card?.imageUrl) {
    style.backgroundImage = `url(${props.card.imageUrl})`;
    style.transform = `translate3d(${Math.random() * (maxX * 2) - maxX}%, ${Math.random() * (maxY * 2) - maxY}%, ${Math.ceil(Math.random() * -200)}px)`
  } else {
    style.transform = `translate3d(${Math.random() * (maxX * 2) - maxX}%, ${Math.random() * (maxY * 2) - maxY}%, ${Math.ceil(Math.random() * -800)}px)`
  }

  return (
    <div 
      className={props.class}
      style={style}
      onClick={() => canvas.activateSceneById(props.sceneId)}
    >
    </div>
  )
}



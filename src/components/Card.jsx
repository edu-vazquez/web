export default function Card (props){
  const maxY = 0
  const maxX = 0

  const style = {};

  if (props.card?.imageUrl) {
    style.backgroundImage = `url(${props.card.imageUrl})`;
    style.transform = `translate3d(${Math.random() * (maxX * 2) - maxX}%, ${Math.random() * (maxY * 2) - maxY}%, ${Math.ceil(Math.random() * -300)}px)`
  } else {
    style.transform = `translate3d(${Math.random() * (maxX * 2) - maxX}%, ${Math.random() * (maxY * 2) - maxY}%, ${Math.ceil(Math.random() * -800)}px)`
  }

  return (
    <div 
      className={props.class}
      style={style}
    >
    </div>
  )
}



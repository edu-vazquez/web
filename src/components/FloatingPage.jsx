import Card from "./Card";

export default function FloatingPage(props){

  return (
      <div 
        className="plano plano1" 
        data-x={props.posX} 
        data-y={props.posY} 
        data-z={props.posZ}
        style={{
          transform: `translate3d(${props.posX}px, ${props.posY}px, ${props.posZ}px)`,
          borderColor: `${props.borderColor}`
        }}
      >
            <p>{props.posX}</p>
            <Card />
      </div>
    )
}


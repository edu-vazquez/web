import Card from "./Card";

export default function FloatingPage(props){

  return (
      <div 
        className="page" 
        style={{
          transform: `translate3d(${props.page.x}%, ${props.page.y}%, ${props.page.z}px)`,
          borderColor: `${props.page.color}`
        }}
      >
            <p className="devP">`position {props.page.x}%, ${props.page.y}%, ${props.page.z}px`</p>
            <Card card={props.page.cards.card1}/>
            <Card card={props.page.cards.card2}/>
            <Card card={props.page.cards.card3}/>
            <Card card={props.page.cards.card4}/>
      </div>
    )
}


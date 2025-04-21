import Card from "./Card";

export default function FloatingPage(){

  return (
    <div class="plano plano1" data-x="-200" data-y="-200" data-z="0">
      <div className="carousel">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
      </div>  
    </div>
  )
}

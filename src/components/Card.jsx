export default function Card (props){

  // EFECTO CARRUSEL EN CADA PLANO
  document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".card");
    let posicion = 0;
    const velocidad = 1;
    
    function mover() {
        posicion -= velocidad;
        if (posicion <= -track.children[0].offsetWidth) {
            track.appendChild(track.children[0]); // Mueve el primer elemento al final
            posicion = 0;
        }
        track.style.transform = `translateX(${posicion}px)`;
        requestAnimationFrame(mover);
    }

    requestAnimationFrame(mover);
    });

  return (
    <div 
      className="card"
      style={{
        borderColor: `${props.card.borderColor}`
      }}

    >
        {/* <img src="https://picsum.photos/300" alt="1"/> */}
        <p>{props.card.borderColor}</p>
    </div>
  )
}



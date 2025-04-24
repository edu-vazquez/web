import { useContext, useEffect } from 'preact/hooks';
import { SceneContext } from './Scene';
import FloatingPage from "./FloatingPage"

export default function Container3d(){
  const { container3dPosition } = useContext(SceneContext);

  let isZooming = false // flag que se usa para evitar múltiples ejecuciones de requestAnimationFrame al mismo tiempo.

  window.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del scroll
    container3dPosition.current.z +=  event.deltaY * 13 //[1]

    if (!isZooming) {
      window.requestAnimationFrame(() => {
        document.getElementById('container3d').style.transform = `translate3d(0px, 0px, ${container3dPosition.current.z}px)`
        isZooming = false
      })
      isZooming = true
    }
  }, { passive: false }); //[2] para que event.preventDefault() funcione correctamente.

  return (
    <div className="container3d" id='container3d' >
      <FloatingPage posX={"-200"} posY={"-200"} posZ={"0"} borderColor={'red'}/>
      <FloatingPage posX={"+800"} posY={"+800"} posZ={"-2000"} borderColor={'blue'}/>
      <FloatingPage posX={"-150"} posY={"+200"} posZ={"-4000"} borderColor={'orange'}/>
      <FloatingPage posX={"-250"} posY={"-200"} posZ={"-6000"} borderColor={'purple'}/>
      <FloatingPage posX={"-200"} posY={"+100"} posZ={"-8000"} borderColor={'yellow'}/>
    </div>
  )
}

// NOTAS
//[1]
// event.deltaY representa el cambio en el scroll vertical desde el último evento 'wheel'.
// Un valor positivo indica scroll hacia abajo (alejar en Z), y uno negativo indica scroll hacia arriba (acercar).
// Este valor NO es acumulativo: se reinicia en cada evento 'wheel'.
// Lo usamos para modificar containerPosition.z y simular un zoom o desplazamiento en profundidad.

//[2]
// Usamos { passive: false } para que event.preventDefault() funcione correctamente.
// Por defecto, los navegadores asumen que los eventos 'wheel' son "passive",
// lo que impide bloquear el scroll nativo. Al marcarlo como false, evitamos el comportamiento
// por defecto del navegador y podemos manejar el scroll manualmente (por ejemplo, zoom en 3D).

import { useContext, useEffect, useRef } from 'preact/hooks';
import { CanvasContext } from '../app';
import FloatingPage from './Scene'
import { scenesData } from '../assets/scenesData';
import { forwardRef } from 'preact/compat';
import About from './About';

export const Container3d = forwardRef((props, ref) => {
  const canvas = useContext(CanvasContext);
  const body = document.querySelector('body')
/*   const container3dRef = useRef(null) */
  const prevTouchDistance = useRef(null)

  useEffect( () => {
    adddingListeners()
    return (() => {
      body.removeEventListener('touchmove', zoomWithPinch);
      body.removeEventListener('touchend', handleTouchEnd, { passive: false }); 
      body.removeEventListener('wheel', zoomWithScroll);
    })},
    [])

  function adddingListeners() {
    body.addEventListener('touchmove', zoomWithPinch, { passive: false }); 
    body.addEventListener('touchend', handleTouchEnd, { passive: false }); 
    body.addEventListener('wheel', zoomWithScroll, { passive: false }); 
    // {pasive: false} para que event.preventDefault() funcione correctamente.
  }

  function zoomWithScroll(event){
    event.preventDefault(); // Prevenir el comportamiento por defecto del scroll

    canvas.container3dPosition.current.z += event.deltaY
  
    if (canvas.container3dPosition.current.z < canvas.zMin.current) {
      canvas.container3dPosition.current.z = canvas.zMin.current;
    } else if (canvas.container3dPosition.current.z > canvas.zMax.current) {
      canvas.container3dPosition.current.z = canvas.zMax.current;
    }
    canvas.moveContainer3d()
  }

  function zoomWithPinch(event) {
    event.preventDefault();

    // Solo manejamos pinch con 2 dedos
    if (event.touches.length === 2) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];

      // Calculamos la distancia entre los dos dedos
      const distance = Math.sqrt(
        Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)
      );

      if (prevTouchDistance.current) {
        const zoomFactor = distance - prevTouchDistance.current;

        canvas.container3dPosition.current.z += zoomFactor * 10; // Ajusta el divisor para controlar la velocidad del zoom

        if (canvas.container3dPosition.current.z < canvas.zMin.current) {
          canvas.container3dPosition.current.z = canvas.zMin.current;
        } else if (canvas.container3dPosition.current.z > canvas.zMax.current) {
          canvas.container3dPosition.current.z = canvas.zMax.current;
        }

        canvas.moveContainer3d();
      }

      // Actualizamos la distancia anterior para el siguiente evento
      prevTouchDistance.current = distance;
    }
  }

  function handleTouchEnd() {
    prevTouchDistance.current = null;
  }

  return (
    <div className='container3d' id='container3d' ref={ref}>
      <About />
      {
        scenesData.map((scene) => {
          return (
            <FloatingPage 
              scene={scene}
              key={scene.id}
            />
          )
        })
      }
    </div>
  )
})

export default Container3d

// NOTAS
//[1]
// event.deltaY representa el cambio en el scroll vertical desde el último evento 'wheel'.
// Un valor positivo indica scroll hacia abajo (alejar en Z), y uno negativo indica scroll hacia arriba (acercar).
// Este valor NO es acumulativo: se reinicia en cada evento 'wheel'.
// Lo usamos para modificar containerPosition.z y simular un zoom o desplazamiento en profundidad.

//[2]
// Usamos { passive: false } para que event.preventDefault() funcione correctamente.
// Por defecto, los navegadores asumen que los eventos 'wheel' son 'passive',
// lo que impide bloquear el scroll nativo. Al marcarlo como false, evitamos el comportamiento
// por defecto del navegador y podemos manejar el scroll manualmente (por ejemplo, zoom en 3D).

import { useContext, useEffect, useRef, useState } from 'preact/hooks';
import { CanvasContext } from '../app';
import Scene from './Scene'
import { scenesData } from '../assets/scenesData';
import { forwardRef } from 'preact/compat';

export const Container3d = forwardRef((props, ref) => {
  const canvas = useContext(CanvasContext);
  const body = document.querySelector('body')

  const activePointers = new Map();

  const isPointerDown = useRef(false)

  const hypotPrev = useRef(null)

  useEffect(() => {
    body.addEventListener('pointerdown', handlePointerDown);
    body.addEventListener('pointermove', handlePointerMove);
    body.addEventListener('pointerup', handlePointerUp);

    // Wheel zoom
    body.addEventListener('wheel', zoomWithScroll, { passive: false });

    return () => {

      body.removeEventListener('pointerdown', handlePointerDown);
      body.removeEventListener('pointermove', handlePointerMove);
      body.removeEventListener('pointerup', handlePointerUp);

      // wheel zoom
      body.removeEventListener('wheel', zoomWithScroll);
    };
  }, []);

  function handlePointerDown(e) {
    isPointerDown.current = true /* esto es para que lea el click o sino handlepointermove seguira al pointer sin haber hecho click */
    activePointers.set(e.pointerId, { x: e.pageX, y: e.pageY });

  }
  
  function handlePointerMove(e) {
    if (!isPointerDown.current) return;

    if (activePointers.size === 1 && !canvas.activeCard.current && !canvas.activeScene.current){

      const lastPos = activePointers.get(e.pointerId);
      if (!lastPos) return;

      const deltaX = e.clientX - lastPos.x;
      const deltaY = e.clientY - lastPos.y;

      canvas.container3dPosition.current.x += deltaX;
      canvas.container3dPosition.current.y += deltaY;

      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    } else if (activePointers.size === 2){
      canvas.deactivateCardById(canvas.activeCard.current)
      canvas.activeScene.current = null
      const hypotPoints = Array.from(activePointers.values());
      
      const hypot = Math.hypot(
        hypotPoints[1].x - hypotPoints[0].x,
        hypotPoints[1].y - hypotPoints[0].y
      )
      
      if (hypotPrev.current === null) {
        hypotPrev.current = hypot;
        return; // Salir para no calcular el zoom en la primera iteración pra que no haya un SALTO muy grande
      }
      const zoom = hypot - hypotPrev.current
      canvas.container3dPosition.current.z += zoom * 5
      
      hypotPrev.current = hypot
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }
    canvas.moveContainer3d();
  }
  
  function handlePointerUp(e) {
    activePointers.delete(e.pointerId)
    isPointerDown.current = false
    hypotPrev.current = null
  }

  function zoomWithScroll(e) {
    e.preventDefault();
    canvas.deactivateCardById(canvas.activeCard.current)
    canvas.activeScene.current = null
    canvas.container3dPosition.current.z += e.deltaY;
    canvas.container3dPosition.current.z = Math.max(
      canvas.zMin.current,
      Math.min(canvas.zMax.current, canvas.container3dPosition.current.z)
    );
    canvas.moveContainer3d();
  }

  return (
    <div className='container3d' id='container3d' ref={ref}>
      {
        scenesData.map((scene) => {
          return (
            <>
             <Scene 
              scene={scene}
              key={scene.id}
            />
            </>

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

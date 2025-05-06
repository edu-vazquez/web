import { useContext, useEffect, useRef } from 'preact/hooks';
import { SceneContext } from '../app';
import FloatingPage from './FloatingPage'
import { pagesData } from '../assets/pagesData';
import { forwardRef } from 'preact/compat';

export const Container3d = forwardRef((props, ref) => {
  const scene = useContext(SceneContext);
  const body = document.querySelector('body')
/*   const container3dRef = useRef(null) */
  const prevTouchClientY = useRef(null)

  useEffect(
    adddingListeners, 
    [])

  function adddingListeners() {
    const isMobile = window.matchMedia('(pointer: coarse)').matches // detecta si es un movil o un escritorio

    if (isMobile) {
      body.addEventListener('touchmove', zoomWithTouch, { passive: false }); 
      body.addEventListener('touchend', handleTouchEnd, { passive: false }); 
    } else {
      body.addEventListener('wheel', zoomWithScroll, { passive: false }); //[2] para que event.preventDefault() funcione correctamente.
    }
    return () => {
      body.removeEventListener('touchmove', zoomWithTouch);
      body.removeEventListener('touchend', handleTouchEnd, { passive: false }); 
      body.removeEventListener('wheel', zoomWithScroll);
    }
  }

  function zoomWithScroll(event){
    event.preventDefault(); // Prevenir el comportamiento por defecto del scroll
    if (scene.container3dPosition.current.z < 0) {
      scene.container3dPosition.current.z = 0
      scene.container3dPosition.current.x = 0
      scene.container3dPosition.current.y = 0
    } else {
      scene.container3dPosition.current.z += event.deltaY
    }
    scene.moveContainer3d()
  }

  function zoomWithTouch(event){
    event.preventDefault(); // Prevenir el comportamiento por defecto del scroll
    /* if (event.touches.length !== 1) return; */

    if (prevTouchClientY.current) {
      scene.container3dPosition.current.z += (event.touches[0].pageY - prevTouchClientY.current) * 10;
    }
    prevTouchClientY.current = event.touches[0].pageY;
    scene.moveContainer3d()
  }
  function handleTouchEnd() {
    prevTouchClientY.current = null;
  }
  return (
    <div className='container3d' id='container3d' ref={ref}>
      <FloatingPage page={pagesData.webDevelopment} />
      <FloatingPage page={pagesData.codeHub} />
      <FloatingPage page={pagesData.vizualization3d} />
      <FloatingPage page={pagesData.architecture} />
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

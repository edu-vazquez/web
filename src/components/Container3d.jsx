import { useContext, useEffect, useRef, useState } from 'preact/hooks';
import { SceneContext } from './Scene';
import FloatingPage from './FloatingPage'
import { pagesData } from '../assets/pagesData';

export default function Container3d(){
  const { container3dPosition } = useContext(SceneContext);
  const body = document.querySelector('body')
  const container3dRef = useRef(null)
  const isZooming = useRef(false) // flag que se usa para evitar múltiples ejecuciones de requestAnimationFrame al mismo tiempo.
  const prevTouchClientY = useRef(null)

  useEffect(
    zoom, [])

  function zoom() {
    const isMobile = window.matchMedia('(pointer: coarse)').matches // detecta si es un movil o un escritorio

    if (isMobile) {
      body.addEventListener('touchmove', zoomWithTouch, { passive: false }); 
      body.addEventListener('touchend', handleTouchEnd, { passive: false }); 
    } else {
      body.addEventListener('wheel', zoomWithScroll, { passive: false }); //[2] para que event.preventDefault() funcione correctamente.
    }
    return () => {
      body.removeEventListener('touchmove', zoomWithTouch);
      body.removeEventListener('wheel', zoomWithScroll);
    }
  }

  function zoomWithScroll(event){
    event.preventDefault(); // Prevenir el comportamiento por defecto del scroll
    if (container3dPosition.current.z < 0) {
      container3dPosition.current.z = 0
    } else {
      container3dPosition.current.z += event.deltaY
    }
    moveContainer3d()
  }

  function zoomWithTouch(event){
    event.preventDefault(); // Prevenir el comportamiento por defecto del scroll
    /* if (event.touches.length !== 1) return; */

    if (prevTouchClientY.current !== null) {
      container3dPosition.current.z += (event.touches[0].pageY - prevTouchClientY.current) * 50;
    }
    prevTouchClientY.current = event.touches[0].pageY;
    moveContainer3d()
  }
  function handleTouchEnd() {
    prevTouchClientY.current = null;
  }

  function moveContainer3d() {
    if (!isZooming.current) {
      window.requestAnimationFrame(() => {
        container3dRef.current.style.transform = `translate3d(${container3dPosition.current.x}px, ${container3dPosition.current.y}px, ${container3dPosition.current.z}px)`
        isZooming.current = false
      })
      isZooming.current = true
    }
  }

  return (
    <div className='container3d' id='container3d' ref={container3dRef}>
      <FloatingPage page={pagesData.floatingPage1} />
      <FloatingPage page={pagesData.floatingPage2} />
      <FloatingPage page={pagesData.floatingPage3} />
      <FloatingPage page={pagesData.floatingPage4} />
      <FloatingPage page={pagesData.floatingPage5} />
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
// Por defecto, los navegadores asumen que los eventos 'wheel' son 'passive',
// lo que impide bloquear el scroll nativo. Al marcarlo como false, evitamos el comportamiento
// por defecto del navegador y podemos manejar el scroll manualmente (por ejemplo, zoom en 3D).

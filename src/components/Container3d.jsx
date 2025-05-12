import { useContext, useEffect, useRef } from 'preact/hooks';
import { CanvasContext } from '../app';
import FloatingPage from './Scene'
import { scenesData } from '../assets/scenesData';
import { forwardRef } from 'preact/compat';
import About from './About';

export const Container3d = forwardRef((props, ref) => {
  const canvas = useContext(CanvasContext);
  const body = document.querySelector('body')
  const touchMode = useRef(null); // 'drag' | 'pinch' | null
  const lastTouchPosition = useRef({ x: 0, y: 0 });
  const prevTouchDistance = useRef(null);
  const isPointerDown = useRef(false);
  const lastPointerPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Touch listeners
    body.addEventListener('touchstart', handleTouchStart, { passive: false });
    body.addEventListener('touchmove', handleTouchMove, { passive: false });
    body.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Pointer listeners
    body.addEventListener('pointerdown', handlePointerDown);
    body.addEventListener('pointermove', handlePointerMove);
    body.addEventListener('pointerup', handlePointerUp);

    // Wheel zoom
    body.addEventListener('wheel', zoomWithScroll, { passive: false });

    return () => {
      body.removeEventListener('touchstart', handleTouchStart);
      body.removeEventListener('touchmove', handleTouchMove);
      body.removeEventListener('touchend', handleTouchEnd);

      body.removeEventListener('pointerdown', handlePointerDown);
      body.removeEventListener('pointermove', handlePointerMove);
      body.removeEventListener('pointerup', handlePointerUp);

      body.removeEventListener('wheel', zoomWithScroll);
    };
  }, []);

  /* ######### LOGICA PARA MOVILES CON TOUCH EVENTS */

  function handleTouchStart(e) {
    if (e.touches.length === 1) {
      touchMode.current = 'drag';
      lastTouchPosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else if (e.touches.length === 2) {
      touchMode.current = 'pinch';
      const [touch1, touch2] = e.touches;
      prevTouchDistance.current = Math.hypot(
        touch2.pageX - touch1.pageX,
        touch2.pageY - touch1.pageY
      );
    }
  }
  
  function handleTouchMove(e) {
    e.preventDefault();
    if (touchMode.current === 'drag' && e.touches.length === 1) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouchPosition.current.x;
      const deltaY = touch.clientY - lastTouchPosition.current.y;
  
      canvas.container3dPosition.current.x += deltaX;
      canvas.container3dPosition.current.y += deltaY;
  
      lastTouchPosition.current = { x: touch.clientX, y: touch.clientY };
      canvas.moveContainer3d();
  
    } else if (touchMode.current === 'pinch' && e.touches.length === 2) {
      const [touch1, touch2] = e.touches;
      const distance = Math.hypot(
        touch2.pageX - touch1.pageX,
        touch2.pageY - touch1.pageY
      );
      const zoomFactor = distance - prevTouchDistance.current;
  
      canvas.container3dPosition.current.z += zoomFactor * 5;
      canvas.container3dPosition.current.z = Math.max(
        canvas.zMin.current,
        Math.min(canvas.zMax.current, canvas.container3dPosition.current.z)
      );
  
      prevTouchDistance.current = distance;
      canvas.moveContainer3d();
    }
  }
  
  function handleTouchEnd() {
    touchMode.current = null;
    prevTouchDistance.current = null;
  }

  /* ######### LOGICA PARA DESKTOP CON POINTER EVENTS */
  function handlePointerDown(e) {
    isPointerDown.current = true;
    lastPointerPosition.current = { x: e.clientX, y: e.clientY };
  }
  
  function handlePointerMove(e) {
    if (!isPointerDown.current) return;
  
    const deltaX = e.clientX - lastPointerPosition.current.x;
    const deltaY = e.clientY - lastPointerPosition.current.y;
  
    canvas.container3dPosition.current.x += deltaX;
    canvas.container3dPosition.current.y += deltaY;
  
    lastPointerPosition.current = { x: e.clientX, y: e.clientY };
    canvas.moveContainer3d();
  }
  
  function handlePointerUp() {
    isPointerDown.current = false;
  }

  function zoomWithScroll(e) {
    e.preventDefault();
    canvas.container3dPosition.current.z += e.deltaY;
    canvas.container3dPosition.current.z = Math.max(
      canvas.zMin.current,
      Math.min(canvas.zMax.current, canvas.container3dPosition.current.z)
    );
    canvas.moveContainer3d();
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

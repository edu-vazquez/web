import { createContext } from "preact";
import { useRef } from "preact/hooks";
import Container3d from "./Container3d";

export const SceneContext = createContext();

export default function Scene(){
  const container3dPosition = useRef({ x: 0, y: 0, z: 0 });
  const container3dRef = useRef(null)
  const isZooming = useRef(false) // flag que se usa para evitar múltiples ejecuciones de requestAnimationFrame al mismo tiempo.


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
    <SceneContext.Provider value={{ container3dPosition, moveContainer3d }}>
      <div className="scene">  
        <Container3d ref={container3dRef}/>
      </div>
    </SceneContext.Provider>
  )

}
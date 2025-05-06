import { createContext } from "preact";
import { useRef } from "preact/hooks";
import './app.css'

import Menu from './components/Menu';
import Scene from './components/Scene';
import Title from './components/Title';

export const SceneContext = createContext();

export function App() {
  const container3dPosition = useRef({ x: 0, y: 0, z: 0 });
  const isZooming = useRef(false) // flag que se usa para evitar múltiples ejecuciones de requestAnimationFrame al mismo tiempo.
  const container3dRef = useRef(null)


  function moveContainer3d() {
    if (!isZooming.current) {
      window.requestAnimationFrame(() => {
        container3dRef.current.style.transform = `translate3d(${container3dPosition.current.x}px, ${container3dPosition.current.y}px, ${container3dPosition.current.z}px)`
        isZooming.current = false
      })
      isZooming.current = true
    }
  }

  function setAppHeight() {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  }
  window.addEventListener('resize', setAppHeight);
  window.addEventListener('orientationchange', setAppHeight);
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(setAppHeight);
  });

  return (
    <SceneContext.Provider value={{ container3dPosition, moveContainer3d, container3dRef }}>
      <Menu />
      <Scene />
      <Title />
    </SceneContext.Provider>
  )
}

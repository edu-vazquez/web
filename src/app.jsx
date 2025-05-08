import { createContext } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import './app.css'

import Menu from './components/Menu';
import Scene from './components/Scene';
import Title from './components/Title';

export const SceneContext = createContext();

export function App() {
  const [currentScene, setCurrentScene] = useState('home');
  const container3dPosition = useRef({ x: 0, y: 0, z: 0 });
  const isZooming = useRef(false) // flag que se usa para evitar múltiples ejecuciones de requestAnimationFrame al mismo tiempo.
  const container3dRef = useRef(null)


  function moveContainer3d() {
    if (!isZooming.current) {
      isZooming.current = true;
      requestAnimationFrame(() => {
        if (container3dRef.current) {
          container3dRef.current.style.transform = `translate3d(${container3dPosition.current.x}px, ${container3dPosition.current.y}px, ${container3dPosition.current.z}px)`;
        }
        isZooming.current = false;
      });
    }
  }

  function initAppDimentions() {
    const setAppDimentions = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
      document.documentElement.style.setProperty('--app-width', `${window.innerWidth}px`);
      document.documentElement.style.setProperty('--card-height', `${window.innerHeight / 5}px`);
      document.documentElement.style.setProperty('--card-width', `${window.innerWidth / 5}px`);
    };
    setAppDimentions()
  
    window.addEventListener('resize', setAppDimentions);
    window.addEventListener('orientationchange', setAppDimentions);
  
    // Limpieza (si es parte de un efecto en React/Preact)
    return () => {
      window.removeEventListener('resize', setAppDimentions);
      window.removeEventListener('orientationchange', setAppDimentions);
    };
  }

  useEffect(() => initAppDimentions(), []);

  return (
    <SceneContext.Provider value={{ container3dPosition, moveContainer3d, container3dRef, currentScene }}>
      <Menu />
      <Scene />
      <Title />
    </SceneContext.Provider>
  )
}

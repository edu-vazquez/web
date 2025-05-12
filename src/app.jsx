import { createContext } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { scenesData } from "./assets/scenesData";

import Menu from './components/Menu';
import Canvas from './components/Canvas';
import Title from './components/Title';
import './app.css'

export const CanvasContext = createContext();

export function App() {
  const currentScene = useRef('home');
  const container3dPosition = useRef({ x: 0, y: 0, z: 0 });
  const container3dRef = useRef(null)
  let isZooming = false // flag que se usa para evitar múltiples ejecuciones de requestAnimationFrame al mismo tiempo.

  /* ###### LIMITES PARA ZOOMS, X e Y */
  const zMax = useRef(7000)
  const zMin = useRef(0)
  const XMax = useRef(100)
  const yMax = useRef(100)

  function moveContainer3d() {
    if (!isZooming) {
      isZooming = true;
      requestAnimationFrame(() => {
        if (container3dRef.current) {
          container3dRef.current.style.transform = `translate3d(${container3dPosition.current.x}px, ${container3dPosition.current.y}px, ${container3dPosition.current.z}px)`;
        }
        isZooming = false;
      });
    }
  }

  function activateSceneById(id) {
    const scene = scenesData.find(scene => scene.id === id);
    if (scene) {
      updateContainer3dPosition(
        window.innerWidth * scene.x / 100 * -1, 
        window.innerHeight * scene.y / 100 * -1, 
        scene.z * -1)
      moveContainer3d();
      currentScene.current = id;
    }
  };

  function updateContainer3dPosition(x, y ,z){
    container3dPosition.current.x = x
    container3dPosition.current.y = y
    container3dPosition.current.z = z
  }

  /* ################################ */
  /* VERIFICAR ESTA FUNCION, ME PARECE QUE TENGO QUE SACAR AFUERA DE LA FUNCION LOS WINDOW EVENT LISTENERS. 23.05.10 */
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
    <CanvasContext.Provider value={{ container3dPosition, container3dRef, currentScene, updateContainer3dPosition, moveContainer3d, activateSceneById, zMax, zMin }}>
      <Menu />
      <Canvas />
      <Title />
    </CanvasContext.Provider>
  )
}

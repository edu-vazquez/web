import { createContext } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { scenesData } from "./assets/scenesData";

import Menu from './components/Menu';
import Canvas from './components/Canvas';
import Title from './components/Title';
import './app.css'

export const CanvasContext = createContext();

export function App() {
  const activeScene = useRef(null);
  const activeCard = useRef(null)
  const container3dPosition = useRef({ x: 0, y: 0, z: 0 });
  const container3dRef = useRef(null)
  let isZooming = false // flag que se usa para evitar múltiples ejecuciones de requestAnimationFrame al mismo tiempo.

  /* ###### LIMITES PARA ZOOMS, X e Y */
  const zMax = useRef(6000)
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
      activeScene.current = id;
    }
  };

  function deactivateSceneById(id) {
    const scene = scenesData.find(scene => scene.id === id);
    if (scene) {
      updateContainer3dPosition(
        window.innerWidth * scene.x / 100 * -1, 
        window.innerHeight * scene.y / 100 * -1, 
        scene.z * -1)
      moveContainer3d();
      activeScene.current = id;
    }
  };


  function activateCardById(sceneId, cardId) {
    if (activeScene.current === sceneId && !cardId.includes("random")){
      const card = document.querySelector(`#${cardId}`)
      const title = document.querySelector(`#title`)

      title.classList.add(`title-hide`)
      card.classList.add('card-expanded'); 
      activeCard.current = cardId
    }
  }

  function deactivateCardById(sceneId, cardId) {
    if (activeCard.current){
      const card = document.querySelector(`#${cardId}`)
      const title = document.querySelector(`#title`)

      title.classList.remove(`title-hide`)
      card.classList.remove('card-expanded'); 
      activeCard.current = null
    }
  }

  function toggleCardState(sceneId, cardId) {
    if (activeScene.current === sceneId && !cardId.includes("random")){
      const card = document.querySelector(`#${cardId}`)
      const title = document.querySelector(`#title`)

      title.classList.toggle(`title-hide`)
      card.classList.toggle('card-expanded'); 
      activeCard.current === null ? activeCard.current = cardId : activeCard.current = null
    }
  }

  function updateContainer3dPosition(x, y ,z){
    container3dPosition.current.x = x
    container3dPosition.current.y = y
    container3dPosition.current.z = z
  }

  function initAppDimentions() {
    // No eliminar: necesario para obtener dimensiones reales del viewport en móviles.
    // Evita bugs con 100vh/100vw y es clave para cálculos de posición en la app.

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
    <CanvasContext.Provider value={{ 
        container3dPosition, 
        container3dRef, 
        activeScene, 
        activeCard,
        updateContainer3dPosition, 
        moveContainer3d, 
        activateSceneById,
        activateCardById, 
        deactivateCardById,
        zMax, 
        zMin }}>
      <Menu />
      <Canvas />
      <Title />
    </CanvasContext.Provider>
  )
}

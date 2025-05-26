import { createContext } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { scenesData } from "./assets/scenesData";

import Menu from './components/Menu';
import Canvas from './components/Canvas';
import Title from './components/Title';
import About from "./components/About";
import './app.css'

export const CanvasContext = createContext();

export function App() {
  const activeSceneRef = useRef(null);
  const activeCardRef = useRef(null)
  const container3dPosition = useRef({ x: 0, y: 0, z: 0 });
  const container3dRef = useRef(null)
  const isMobile = useRef(false)
  let isZooming = false // flag que se usa para evitar múltiples ejecuciones de requestAnimationFrame al mismo tiempo.

  /* ###### LIMITES PARA ZOOMS, X e Y */
  const zMax = useRef(6000)
  const zMin = useRef(0)
  const XMax = useRef(100)
  const yMax = useRef(100)

  function updateContainer3dPosition(x, y ,z){
    container3dPosition.current.x = x
    container3dPosition.current.y = y
    container3dPosition.current.z = z
  }

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
    const sceneEnteringData = scenesData.find(scene => scene.id === id); // esto es para extraer los datos de x e y para mover el container3d
    const title = document.querySelector(`#title`)
    const menu = document.querySelector(`#menu-${id}`)
  
    if (activeSceneRef.current){
      const menuLeaving = document.querySelector(`#menu-${activeSceneRef.current}`)
      menuLeaving.classList.remove(`menu-item-as-title`)

      const sceneLeavingData = scenesData.find(scene => scene.id === activeSceneRef.current)

      if (id !== activeSceneRef.current){
        const sceneLeavingEl = document.querySelector(`#${activeSceneRef.current}`)
        const sceneEnteringEl = document.querySelector(`#${id}`)

        if (sceneEnteringData.z < sceneLeavingData.z) {
          sceneLeavingEl.classList.add('scene-invisible')
          setTimeout(()=> sceneLeavingEl.classList.remove('scene-invisible'), 1000)
        } else {
          sceneEnteringEl.classList.add('scene-invisible')
          setTimeout(()=> sceneEnteringEl.classList.remove('scene-invisible'), 1600)
        }
      }
      
    }
    
    if (activeCardRef.current){
      deactivateCardById(activeCardRef.current)
    }
    updateContainer3dPosition(
      window.innerWidth * sceneEnteringData.x / 100 * -1, 
      window.innerHeight * sceneEnteringData.y / 100 * -1, 
      -(sceneEnteringData.z + 2000))
    moveContainer3d();
    activeSceneRef.current = id;
    menu.classList.add(`menu-item-as-title`)
    title.classList.add(`title-small`)
  };

  function goHome(){
    updateContainer3dPosition(0,0,0);
    moveContainer3d()
    if (activeSceneRef.current){
      const menuLeaving = document.querySelector(`#menu-${activeSceneRef.current}`)
      menuLeaving.classList.remove(`menu-item-as-title`)
    }
    document.querySelector(`#title`).classList.remove(`title-small`)
    const menuItemsArr = [...document.querySelectorAll('.menu-scenes > .menu-item')]
    menuItemsArr.forEach((el, index ) => {setTimeout(() => el.classList.remove('menu-item-about'), 100*index)});
  }

  function activateCardById(cardId) {
    if (activeSceneRef.current && !cardId.includes("random")){
      hideMenu()

      const sceneEl = document.querySelector(`#${activeSceneRef.current}`)
      sceneEl.classList.add('scene-with-card-active')

      document.querySelector(`#menu-main`).classList.add(`menu-main-hide`)

      document.querySelector(`#title`).classList.add(`title-hide`)

      document.querySelector(`#${cardId}`).classList.add('card-active');

      document.querySelector(`#menu-about`).classList.add(`menu-about-hidden`)

      activeCardRef.current = cardId
    }
  }

  function deactivateCardById(cardId) {
    if (activeCardRef.current){
      const card = document.querySelector(`#${cardId}`)
      const title = document.querySelector(`#title`)

      title.classList.remove(`title-hide`)
      card.classList.remove('card-active'); 
      activeCardRef.current = null
      document.querySelector(`#menu-about`).classList.remove(`menu-about-hidden`)
      showMenu()
    }
    if (activeSceneRef.current){
      const sceneEl = document.querySelector(`#${activeSceneRef.current}`)
      sceneEl.classList.remove('scene-with-card-active')
    }

  }

  function hideMenu(){
    const menuItemsArr = [...document.querySelectorAll('.menu-scenes > .menu-item')]
    menuItemsArr.forEach((el, index ) => {setTimeout(() => el.classList.add('menu-item-about'), 100*index)});
  }
  function showMenu(){
    const menuItemsArr = [...document.querySelectorAll('.menu-scenes > .menu-item')]
    menuItemsArr.forEach((el, index ) => {setTimeout(() => el.classList.remove('menu-item-about'), 100*index)});
  }

  function initAppDimentions() {
    // No eliminar: necesario para obtener dimensiones reales del viewport en móviles.
    // Evita bugs con 100vh/100vw y es clave para cálculos de posición en la app.

    const setAppDimentions = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
      document.documentElement.style.setProperty('--app-width', `${window.innerWidth}px`);
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
        activeSceneRef, 
        activeCardRef,
        isMobile,
        updateContainer3dPosition, 
        moveContainer3d, 
        activateSceneById,
        activateCardById, 
        deactivateCardById,
        goHome,
        hideMenu,
        showMenu,
        zMax, 
        zMin }}
        >
      <Menu />
      <Canvas />
      <Title />
      <About />
    </CanvasContext.Provider>
  )
}

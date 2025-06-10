import { createContext } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { scenesData } from "./assets/scenesData";

import Menu from './components/Menu';
import Canvas from './components/Canvas';
import Title from './components/Title';
import About from "./components/About";
import './app.css'
import { useMemo } from "react";

export const CanvasContext = createContext();

export function App() {
  const activeSceneIdRef = useRef(null)
  const activeProjectIdRef = useRef(null)
  const [activeSceneIdState, setActiveSceneSate] = useState(null)
  const container3dPosition = useRef({ x: 0, y: 0, z: 0 });
  const container3dRef = useRef(null)
  const isMobile = useRef(false)
  let isZooming = false // flag que se usa para evitar múltiples ejecuciones de requestAnimationFrame al mismo tiempo.

  /* ###### LIMITES PARA ZOOMS, X e Y */
  const zMax = useRef(6000)
  const zMin = useRef(0)

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
    const sceneEnteringData = scenesData.find(scene => scene.id === id)
    const title = document.querySelector(`#title`)
    const menu = document.querySelector(`#menu-${id}`)
    setActiveSceneSate(id)
  
    if (activeSceneIdRef.current){
      const menuLeaving = document.querySelector(`#menu-${activeSceneIdRef.current}`)
      menuLeaving.classList.remove(`menu-item-as-title`)

      const sceneLeavingData = scenesData.find(scene => scene.id === activeSceneIdRef.current)
    }
    
    if (activeProjectIdRef.current){
      deactivateProjectById(activeProjectIdRef.current)
    }

    updateContainer3dPosition(
      window.innerWidth * sceneEnteringData.x / 100 * -1, 
      window.innerHeight * sceneEnteringData.y / 100 * -1, 
      -(sceneEnteringData.z + 1500))
    moveContainer3d();

    activeSceneIdRef.current = id;
    menu.classList.add(`menu-item-as-title`)
    title.classList.add(`title-small`)
  };

  function goHome(){
    updateContainer3dPosition(0,0,0);
    moveContainer3d()
    if (activeSceneIdRef.current){
      const menuLeaving = document.querySelector(`#menu-${activeSceneIdRef.current}`)
      menuLeaving.classList.remove(`menu-item-as-title`)
    }
    document.querySelector(`#title`).classList.remove(`title-small`)
    const menuItemsArr = [...document.querySelectorAll('.menu-scenes > .menu-item')]
    menuItemsArr.forEach((el, index ) => {setTimeout(() => el.classList.remove('menu-item-about'), 100*index)});
  }

  function activateProjectById(cardId) {
    if (activeSceneIdRef.current){
      hideMenu()
      activeProjectIdRef.current = cardId
    }
  }

  function deactivateProjectById(cardId) {
    if (activeProjectIdRef.current){
      const card = document.querySelector(`#${cardId}`)
      const title = document.querySelector(`#title`)

      title.classList.remove(`title-hide`)
      card.classList.remove('project-active'); 
      activeProjectIdRef.current = null
      document.querySelector(`#menu-about`).classList.remove(`menu-about-hidden`)
      showMenu()
    }

  }

  function hideMenu(){
    const menuItemsArr = [...document.querySelectorAll('.menu-scenes > .menu-item')]
    menuItemsArr.forEach((el, index ) => {setTimeout(() => el.classList.add('menu-item-about'), 100*index)});
  
    document.querySelector(`#menu-main`).classList.add(`menu-main-hide`)

    document.querySelector(`#title`).classList.add(`title-hide`)

    document.querySelector(`#menu-about`).classList.add(`menu-about-hidden`)
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
        activeSceneIdRef, 
        activeSceneIdState,
        activeProjectIdRef,
        isMobile,
        updateContainer3dPosition, 
        moveContainer3d, 
        activateSceneById,
        activateProjectById, 
        deactivateProjectById,
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

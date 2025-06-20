import { createContext } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { scenesData } from "./assets/scenesData";

import Menu from './components/Menu';
import Canvas from './components/Canvas';
import Headline from './components/Headline';
import About from "./components/About";
import './app.css'
import { useMemo } from "react";

export const CanvasContext = createContext();

export function App() {
  const activeSceneIdRef = useRef("")
  const [activeSceneIdState, setActiveSceneState] = useState("ini")
  const activeProjectIdRef = useRef(null)
  const container3dPosition = useRef({ x: 0, y: 0, z: 0 });
  const container3dRef = useRef(null)
  const isMobile = useRef(false)
  let isZooming = false // flag que se usa para evitar múltiples ejecuciones de requestAnimationFrame al mismo tiempo.
  
  console.log(activeSceneIdState)

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
    const headline = document.querySelector(`#headline`)
    const menu = document.querySelector(`#menu-${id}`)
    setActiveSceneState(id)
 
    if (activeSceneIdRef.current){
      const menuLeaving = document.querySelector(`#menu-${activeSceneIdRef.current}`)
      menuLeaving.classList.remove(`menu-item-as-title`)
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
    headline.classList.add(`headline-small`)
  };

  function goHome(){
    updateContainer3dPosition(0,0,0);
    moveContainer3d()
    if (activeSceneIdRef.current){
      const menuLeaving = document.querySelector(`#menu-${activeSceneIdRef.current}`)
      menuLeaving.classList.remove(`menu-item-as-title`)
    }
    document.querySelector(`#headline`).classList.remove(`headline-small`)
    const menuItemsArr = [...document.querySelectorAll('.menu-scenes > .menu-item')]
    menuItemsArr.forEach((el, index ) => {setTimeout(() => el.classList.remove('menu-item-about'), 100*index)});
    setActiveSceneState("home")
  }

  function activateProjectById(cardId) {
    document.querySelector(`#menu-about`).classList.add(`menu-about-hidden`)
    if (activeSceneIdRef.current){
      hideMenu()
      activeProjectIdRef.current = cardId
    }
  }

  function deactivateProjectById(cardId) {
    if (activeProjectIdRef.current){
      const card = document.querySelector(`#${cardId}`)
      const headline = document.querySelector(`#headline`)

      headline.classList.remove(`headline-hide`)
      card.classList.remove('project-active'); 
      activeProjectIdRef.current = null
      document.querySelector(`#menu-about`).classList.remove(`menu-about-hidden`)
      showMenu()
    }

  }

  function hideMenu(){
    const menuItemsArr = [...document.querySelectorAll('.menu-scenes > .menu-item')]
    const headline = document.querySelector("#headline")
    const menu = document.querySelector("#menu-main")
    
    menuItemsArr.forEach(
      (el, index ) => {
        setTimeout(() => el.classList.add('menu-item-about'), 100*index)
      });
  }

  function showMenu(){
    const menuItemsArr = [...document.querySelectorAll('.menu-scenes > .menu-item')]
    const headline = document.querySelector("#headline")
    menuItemsArr.forEach(
      (el, index ) => {
        setTimeout(() => el.classList.remove('menu-item-about'), 100*index)});
  }

  function toggleHeadlineAccent(){
    document.querySelector("#headline").classList.toggle("headline-as-title")
  }
  
  function hideHeadline(){
    document.querySelector("#headline").classList.add("headline-hidden")
  }
  
  function showHeadline(){
    document.querySelector("#headline").classList.remove("headline-hidden")
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
        toggleHeadlineAccent,
        goHome,
        hideMenu,
        showMenu,
        zMax, 
        zMin,
        hideHeadline,
        showHeadline,
    }}
        >
      <Menu />
      <Canvas />
      <Headline />
      <About />
    </CanvasContext.Provider>
  )
}

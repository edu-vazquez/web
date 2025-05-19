import { CanvasContext } from '../app';
import { useContext } from 'preact/hooks';

export default function Menu(){
  const canvas = useContext(CanvasContext);
  

  function showAbout(){
    const btnAbout = document.querySelector('#menu-about')
    const title = document.querySelector(`#title`)
    const about = document.querySelector('#about')
    const menuItemsArr = [...document.querySelectorAll('.menu-scenes > .menu-item')]

    if (btnAbout.textContent === 'About') {
      btnAbout.textContent = 'Back'
      canvas.updateContainer3dPosition(0, window.innerHeight*-10, 0)
      canvas.moveContainer3d();
      about.classList.add('about-active')
      title.classList.add(`title-about`)

      menuItemsArr.forEach((el, index ) => {setTimeout(() => el.classList.add('menu-item-about'), 100*index)});
    } else {
      btnAbout.textContent = 'About'
      canvas.updateContainer3dPosition(0, 0, 0)
      canvas.moveContainer3d();
      
      about.classList.remove('about-active')
      title.classList.remove(`title-about`)

      menuItemsArr.forEach((el, index ) => {setTimeout(() => el.classList.remove('menu-item-about'), 300*index)});
    }
  }

  return (
    <nav 
      class="menu-main"
      id='menu-main'
    >
      <ul 
        className="menu-scenes"
        id='menu-titems'
      >
        <li 
          className="menu-item" 
          id='menu-webDevelopment' 
          onClick={() => canvas.activateSceneById('webDevelopment')}
        >
          WEB DEVELOPMENT
        </li>
        <li 
          className="menu-item" 
          id='menu-codeHub'
          onClick={() => canvas.activateSceneById('codeHub')}
          
        >
          CODE HUB
        </li>
        <li 
          className="menu-item"
          id='menu-vizualization3d' 
          onClick={() => canvas.activateSceneById('vizualization3d')}
        >
          3D VISUALIZATION
        </li>
        <li 
          className="menu-item" 
          id='menu-architecture'
          onClick={() => canvas.activateSceneById('architecture')}
        >
          ARCHITECTURE
        </li>
      </ul>

      <ul className={'menu-about'}>
        <li 
          className="menu-item" 
          id='menu-about'
          onClick={showAbout}
        >
          About
        </li>
      </ul>
    </nav>
  )
}
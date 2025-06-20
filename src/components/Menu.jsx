import "./Menu.css"
import { CanvasContext } from '../app';
import { useContext } from 'preact/hooks';

export default function Menu(){
  const canvas = useContext(CanvasContext);
  

  function toggleAboutVisibility(){
    const btnAbout = document.querySelector('#menu-about')
    const about = document.querySelector('#about')
    const movingDimension = window.innerHeight * 15

    canvas.toggleHeadlineAccent()

    if (btnAbout.textContent === 'About') {
      btnAbout.textContent = 'Back'
      canvas.updateContainer3dPosition(
        canvas.container3dPosition.current.x, 
        canvas.container3dPosition.current.y - movingDimension, 
        canvas.container3dPosition.current.z
      )
      canvas.moveContainer3d();
      about.classList.add('about-active')
      canvas.hideMenu()
    } else {
      btnAbout.textContent = 'About'
      canvas.updateContainer3dPosition(
        canvas.container3dPosition.current.x, 
        canvas.container3dPosition.current.y + movingDimension, 
        canvas.container3dPosition.current.z)
      canvas.moveContainer3d();
      about.classList.remove('about-active')
      canvas.showMenu()
    }
  }

  return (
    <nav 
      class="menu-main"
      id='menu-main'
    >
      <ul 
        className="menu-scenes"
        id='menu-items'
      >
        <li 
          className="menu-item " 
          id='menu-webDevelopment' 
          onClick={() => canvas.activateSceneById('webDevelopment')}
        >
          web development
        </li>
        <li 
          className="menu-item" 
          id='menu-codeHub'
          onClick={() => canvas.activateSceneById('codeHub')}
          
        >
          code hub
        </li>
        <li 
          className="menu-item"
          id='menu-vizualization3d' 
          onClick={() => canvas.activateSceneById('vizualization3d')}
        >
          3d visualization
        </li>
        <li 
          className="menu-item" 
          id='menu-architecture'
          onClick={() => canvas.activateSceneById('architecture')}
        >
          architecture
        </li>
      </ul>

      <ul className={'menu-about'}>
        <li 
          className="menu-item" 
          id='menu-about'
          onClick={toggleAboutVisibility}
        >
          About
        </li>
      </ul>
    </nav>
  )
}

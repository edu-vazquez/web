import { CanvasContext } from '../app';
import { useContext } from 'preact/hooks';

export default function Menu(){
  const canvas = useContext(CanvasContext);
  

  function showAbout(){
    const btnAbout = document.querySelector('#menu-about')
    const title = document.querySelector(`#title`)
    const about = document.querySelector('#about')

    if (btnAbout.textContent === 'About') {
      btnAbout.textContent = 'Back'
      canvas.updateContainer3dPosition(0, window.innerHeight*-15, 0)
      canvas.moveContainer3d();
      about.classList.add('about-active')
      title.classList.add(`title-about`)
      canvas.hideMenu()
    } else {
      btnAbout.textContent = 'About'
      canvas.updateContainer3dPosition(0, 0, 0)
      canvas.moveContainer3d();
      
      about.classList.remove('about-active')
      title.classList.remove(`title-about`)

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
        id='menu-titems'
      >
        <li 
          className="menu-item" 
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
          onClick={showAbout}
        >
          About
        </li>
      </ul>
    </nav>
  )
}
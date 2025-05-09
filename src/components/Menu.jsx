import { CanvasContext } from '../app';
import { useContext } from 'preact/hooks';

export default function Menu(){
  const canvas = useContext(CanvasContext);

  function showAbout(){
    const btnAbout = document.querySelector('#btn-about')
    if (btnAbout.textContent === 'About') {
      btnAbout.textContent = 'Home'
      canvas.updateContainer3dPosition(0, window.innerHeight, 0)
      canvas.moveContainer3d();
    } else {
      btnAbout.textContent = 'About'
      canvas.updateContainer3dPosition(0, 0, 0)
      canvas.moveContainer3d();
    }
  }

  return (
    <nav class="menu-main">
      <ul className={'menu-home'}
      >
        <li>
          <p>Web Developer</p>
          <p>Based in Barcelona, Spain</p>
        </li>
      </ul>

      <ul className="menu-items">
        <li className="menu-item" onClick={() => canvas.moveToSceneById('webDevelopment')}>
          WEB DEVELOPMENT
        </li>
        <li className="menu-item" onClick={() => canvas.moveToSceneById('codeHub')}>
          CODE HUB
        </li>
        <li className="menu-item" onClick={() => canvas.moveToSceneById('vizualization3d')}>
          3D VISUALIZATION
        </li>
        <li className="menu-item" onClick={() => canvas.moveToSceneById('architecture')}>
          ARCHITECTURE
        </li>
      </ul>

      <ul className={'menu-about'}>
        <li className="menu-item" onClick={showAbout} id={'btn-about'}>
          About
        </li>
      </ul>
    </nav>
  )
}
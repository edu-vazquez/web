import { SceneContext } from '../app';
import { useContext } from 'preact/hooks';
import { pagesData } from '../assets/pagesData';

export default function Menu(){
  const scene = useContext(SceneContext);

  function showAbout(){
    const btnAbout = document.querySelector('#btn-about')
    if (btnAbout.textContent === 'About') {
      btnAbout.textContent = 'Home'
      scene.container3dPosition.current.x = 0
      scene.container3dPosition.current.y = window.innerHeight
      scene.container3dPosition.current.z = 0
      scene.moveContainer3d();
    } else {
      btnAbout.textContent = 'About'
      scene.container3dPosition.current.x = 0
      scene.container3dPosition.current.y = 0
      scene.container3dPosition.current.z = 0
      scene.moveContainer3d();
    }
  }

  function moveToPage(page){
    scene.container3dPosition.current.x = window.innerWidth * page.x / 100 * -1
    scene.container3dPosition.current.y = window.innerHeight * page.y / 100 * -1
    scene.container3dPosition.current.z = page.z * -1
    scene.moveContainer3d()
  }
  function moveToHome(){
    scene.container3dPosition.current.x = 0
    scene.container3dPosition.current.y = 0
    scene.container3dPosition.current.z = 0
    scene.moveContainer3d()
  }

  return (
    <nav class="menu-main">
      <ul className={'menu-home'}
        onClick={moveToHome}
      >
        <li>
          <p>Web Developer</p>
          <p>Based in Barcelona, Spain</p>
        </li>
      </ul>

      <ul className="menu-items">
        <li className="menu-item" onClick={() => moveToPage(pagesData.webDevelopment)}>
          WEB DEVELOPMENT
        </li>
        <li className="menu-item" onClick={() => moveToPage(pagesData.codeHub)}>
          CODE HUB
        </li>
        <li className="menu-item" onClick={() => moveToPage(pagesData.vizualization3d)}>
          3D VISUALIZATION
        </li>
        <li className="menu-item" onClick={() => moveToPage(pagesData.architecture)}>
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
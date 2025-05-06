import About from "./About";
import { SceneContext } from '../app';
import { useContext } from 'preact/hooks';
import { pagesData } from '../assets/pagesData';

export default function Menu(){
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const scene = useContext(SceneContext);

  function showAbout(){
    document.querySelector('#about').style.transform = 'translateX(-20vw)';
  }

  function moveToPage(page){
    scene.container3dPosition.current.x = windowWidth * page.x / 100 * -1
    scene.container3dPosition.current.y = windowHeight * page.y / 100 * -1
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
        <li className="menu-item" onClick={showAbout}>
          About
        </li>
      </ul>
      <About />
    </nav>
  )
}
import './app.css'
import Scene from './components/Scene';

export function App() {

  function setAppHeight() {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  }
  window.addEventListener('resize', setAppHeight);
  window.addEventListener('orientationchange', setAppHeight);
  setAppHeight();
  document.body.style.backgroundColor = '#111';

  return (
      <Scene />
  )
}

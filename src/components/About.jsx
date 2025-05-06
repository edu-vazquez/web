export default function About(){
  function hideAbout(){
    document.querySelector('#about').style.transform = 'translateX(20dvw)'
  }
  
  return (
    <div
      className={'about'}
      id={'about'}
    >
      <button 
        class="close-btn"
        onClick={hideAbout}
      >
        <i class="fas fa-xmark"></i>
      </button>
      <p>Hello! I’m a web developer based in Spain, passionate about creating innovative web solutions. I have a strong background in [mention relevant skills/technologies], and I love to experiment with new technologies to solve real-world problems.</p>

      <ul>
        <li>
          <a href="https://github.com/edu-vazquez" target="_blank">
            GitHub
            <i class="fa-solid fa-up-right-from-square"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/eduvazquez/" target="_blank">
            LinkedIn
            <i class="fa-solid fa-up-right-from-square"></i>
          </a>
        </li>
        <li className={'email selectable'}>
            hola@eduardo-vazquez.com
            <i class="fa-regular fa-copy"></i>
        </li>
      </ul>
    </div>

  )
}
export default function About(){
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  function hideAbout(){
    document.querySelector('#about').style.transform = 'translateX(20dvw)'
  }
  
  function copyMail() {
    const btnCopy = document.querySelector('#btn-copy')
    navigator.clipboard.writeText('hola@eduardo-vazquez.com')
      .then(() => {
        const msg = document.getElementById('msg');
        btnCopy.classList.remove('fa-copy');
        btnCopy.classList.add('fa-check');
        setTimeout(() => {
          btnCopy.classList.remove('fa-check');
          btnCopy.classList.add('fa-copy');
        }, 2000);
      });
  }

  return (
    <div
      className={'page about'}
      id={'about'}
      style={{
        transform: `translate3d(0px, -${windowHeight}px, 0px)`,
        width: `${windowWidth}px`,
        height: `${windowHeight}px`,
      }}
    >
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
            <i class="fa-solid fa-copy" id="btn-copy" onClick={copyMail}></i>
        </li>
      </ul>
    </div>

  )
}
import "./About.css"
export default function About(){

  
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
      className={'about'}
      id={'about'}
    >
      <div className="about-container">
        <p>Hello!</p> 
        <p>I’m a web developer based in Spain, passionate about creating innovative web solutions. I have a strong background developing proyects  and I love to experiment with new technologies to solve problems.</p>

        <a href="https://github.com/edu-vazquez" target="_blank">
          GitHub
          <i class="fa-solid fa-up-right-from-square"></i>
        </a>
        <a href="https://www.linkedin.com/in/eduvazquez/" target="_blank">
          LinkedIn
          <i class="fa-solid fa-up-right-from-square"></i>
        </a>
        <p className={'email selectable'}>
            hola@eduardo-vazquez.com
            <i class="fa-solid fa-copy" id="btn-copy" onClick={copyMail}></i>
        </p>
      </div>
    </div>

  )
}

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

        <p className={'email selectable'} onClick={copyMail}>
            hola@eduardo-vazquez.com
            <i class="fa-solid fa-copy" id="btn-copy" ></i>
        </p>
        <div className="about-links">
          <a href="https://github.com/edu-vazquez" target="_blank">
            <i class="fa-brands fa-github"></i>
            <span>github</span>
          </a>
          <a href="https://www.linkedin.com/in/eduvazquez/" target="_blank">
            <i class="fa-brands fa-linkedin"></i>
            <span>linkedin</span>
          </a>
          <a href="https://codepen.io/edu-vazquez" target="_blank">
            <i class="fa-brands fa-codepen"></i>
            <span>codepen</span>
          </a>
          <a href="https://www.dv-it.eduardo-vazquez.com" target="_blank">
            <i class="fa-regular fa-file"></i>
            <span>cv</span>
          </a>
        </div>
      </div>
    </div>

  )
}

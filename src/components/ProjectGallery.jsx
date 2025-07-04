import "./ProjectGallery.css"
import { useRef } from "preact/hooks"

export default function ProjectGallery(props) {
  const maxY = window.innerHeight / 3 
  const maxZ = 50
  const image3dPos = useRef(generateImgPos(props.projectData.projectImages.length))
  let galleryClasses = ""

  function generateImgPos(n) {
    const arr = []

    for (let i = 0; i < n; i++) {
      arr.push({
        x: i * 25, 
        y: Math.random() * (2 * maxY) - maxY, 
        z: -Math.random() * maxZ
      })
    }
    return arr     
  }

  if (props.projectShowing === 'show-page' || props.projectShowing === "ini"){
    galleryClasses = 'project-gallery project-gallery-show-gallery'
  } else if (props.projectShowing === 'show-info') {
    document.querySelector('.gallery-img-container').scrollIntoView({
      behavior: 'smooth',
      block: 'start' 
    });
    galleryClasses = 'project-gallery project-gallery-show-info'
  }

  const handleClick = (e) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();

    const clone = img.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = 0;
    clone.style.transform = 'none';
    clone.style.zIndex = 9999;
    clone.style.filter = "none"
    clone.style.cursor = "zoom-out"
    clone.style.transition = 'top .5s ease, left .5s ease, transform .5s ease';
    document.querySelector(".project-gallery-show-gallery").style.overflow = "hidden"
    document.querySelector(".project-menu").style.marginTop = "-10dvh"

    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.top = '40dvh';
      clone.style.left = '40vw';
      clone.style.transform = 'scale(2)';

    });

    clone.addEventListener('click', () => {
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.transform = 'none';
      setTimeout(()=> {
        clone.remove()
        document.querySelector(".project-gallery-show-gallery").style.overflow = "auto"
        document.querySelector(".project-menu").style.marginTop = "0"

      }, 500);
    });
  };

  return (
    <div className={galleryClasses}>
      <div className="gallery-img-container">
        {
          props.projectData.projectImages.map( (item, index) => {
            return (
              <img 
                className="gallery-img"
                src={item} 
                alt="" 
                key={`p-i-${index}`} 
                id={`${props.projectData.id}-i-${index}`} 
                onLoad={() => {
                  document.querySelector(`#${props.projectData.id}-i-${index}`).classList.add("project-img-appear")
                }}
                onClick={handleClick}
                style={{transform : `translate3d(
                        ${image3dPos.current[index].x}vw,
                        ${image3dPos.current[index].y}px,
                        ${image3dPos.current[index].z}px)`
                }}
              />
            )
          })
        }
      </div>
    </div>
  )
}


import "./ProjectGallery.css"
import { useRef } from "preact/hooks"

export default function ProjectGallery(props) {
  const maxY = 300
  const maxZ = 50
  const image3dPos = useRef(generateImgPos(props.projectData.projectImages.length))
  let galleryClasses = ""

  function generateImgPos(n) {
    const arr = []

    for (let i = 0; i < n; i++) {
      arr.push({
        x: 0, 
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

  console.log(image3dPos.current)
  return (
    <div className={galleryClasses}>
      <div className="gallery-img-container">
        {
          props.projectData.projectImages.map( (item, index) => {
            return (
              <img 
                src={item} 
                alt="" 
                key={`p-i-${index}`} 
                id={`${props.projectData.id}-i-${index}`} 
                onLoad={() => {
                  document.querySelector(`#${props.projectData.id}-i-${index}`).classList.add("project-img-appear")
                }}
                style={{transform : `translate3d(
                        ${image3dPos.current[index].x},
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


export default function ModuleWeb(props){
  return (
    <div
      className="module-web"
    >

      <div className="module-web-img-container">
        <img src={props.projectData.imageUrl} alt="" />
      </div>

      <div className="module-web-info">
        <h2>{props.projectData.title}</h2>
        <p>Description: {props.projectData.description}</p>
        <ul>
          { props.projectData.technologies.map(item => {
            return <li>{item}</li>
          })}
        </ul>
        <a href={props.projectData.projectUrl}>LINK AL PROJECTO</a>
      </div>
    </div>
  )
}
import { useContext } from "preact/hooks";
import { CanvasContext } from "../app"

export default function Title() {
  const canvas = useContext(CanvasContext)

  function handleClick(){
    canvas.updateContainer3dPosition(0,0,0);
    canvas.moveContainer3d()
    canvas.activeScene.current = null;
  }

  return (
    <h1 
      className={'title'} 
      id={'title'}
      onClick={handleClick}
    >
      Eduardo Vazquez
    </h1>
  )
}
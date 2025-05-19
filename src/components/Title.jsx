import { useContext } from "preact/hooks";
import { CanvasContext } from "../app"

export default function Title() {
  const canvas = useContext(CanvasContext)

  function handleClick(){
    canvas.goHome()
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
import "./Headline.css"
import { useContext } from "preact/hooks";
import { CanvasContext } from "../app"

export default function Headline() {
  const canvas = useContext(CanvasContext)

  function handleClick(){
    canvas.goHome()
  }

  return (
    <h1 
      className={'headline'} 
      id={'headline'}
      onClick={handleClick}
    >
      Eduardo Vazquez
    </h1>
  )
}

import Container3d from "./Container3d";
import { CanvasContext } from '../app';
import { useContext, useRef } from 'preact/hooks';


export default function Canvas(){
  const canvas = useContext(CanvasContext);


  return (
      <div className="canvas" id='canvas'>  
        <Container3d ref={canvas.container3dRef}/>
      </div>
  )

}
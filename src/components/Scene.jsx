import Container3d from "./Container3d";
import { SceneContext } from '../app';
import { useContext, useRef } from 'preact/hooks';


export default function Scene(){
  const scene = useContext(SceneContext);


  return (
      <div className="scene">  
        <Container3d ref={scene.container3dRef}/>
      </div>
  )

}
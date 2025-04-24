import { createContext } from "preact";
import { useRef } from "preact/hooks";
import Container3d from "./Container3d";

export const SceneContext = createContext();

export default function Scene(){
  const container3dPosition = useRef({ x: 0, y: 0, z: 0 });

  return (
    <SceneContext.Provider value={{ container3dPosition }}>
      <div className="scene">  
        <Container3d />
      </div>
    </SceneContext.Provider>
  )

}
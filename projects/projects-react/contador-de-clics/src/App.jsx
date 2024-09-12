import './App.css';
import freecodecampLogo from './imagenes/freecodecamp-logo.png'
import Boton from './componentes/boton'
import Contador from './componentes/contador';
import { useState } from 'react';

function App() {
  // [variable donde se guardan el estado, nombre de la funcion que actualizara el estado seria un nombre para useState]
  const [numClics, setNumClics] = useState(0);

  const manejarClic = () => {
      setNumClics(numClics + 1);
  };

  const reiniciarContador = () => {
    setNumClics(0);
  };

  return (
    <div className="App">
      <div className="freecodecamp-logo-contenedor">
        <img 
          className='freecodecamp-logo'
          src={freecodecampLogo}
          alt="logo de freecodecamp"
        />
      </div>
      <div className="contenedor-principal">
        <Contador numeroDeClics={numClics} />
        <Boton 
          texto="clic"
          esBotonDeClic={true}
          manejarClic={manejarClic} />
        <Boton  
          texto="reiniciar"
          esBotonDeClic={false}
          manejarClic={reiniciarContador} />
      </div>
    </div>
  );
};

export default App;

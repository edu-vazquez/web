import './App.css';
import Boton from './componentes/boton';
import Pantalla from './componentes/pantalla';
import Clear from './componentes/clear'
import { useState } from 'react';
import { evaluate } from 'mathjs';


function App() {

  const [userInput, setUserInput] = useState('');
  
  const agregarInput = val => {
    setUserInput(userInput + val);
  };

  const calcular = () => {
    if (userInput) {
      setUserInput(evaluate(userInput));
    } else {
      alert("Ingrese un valor")
    }
  };

  return (
    <div className='App'>
      <div className='contenedor-calculadora'>
          <Pantalla input={userInput}/>
          <div className="fila">
            <Boton handleClick={agregarInput}>1</Boton>
            <Boton handleClick={agregarInput}>2</Boton>
            <Boton handleClick={agregarInput}>3</Boton>
            <Boton handleClick={agregarInput}>+</Boton>
          </div>
          <div className='fila'>
            <Boton handleClick={agregarInput}>4</Boton>
            <Boton handleClick={agregarInput}>5</Boton>
            <Boton handleClick={agregarInput}>6</Boton>
            <Boton handleClick={agregarInput}>-</Boton>
          </div>
          <div className='fila'>
            <Boton handleClick={agregarInput}>7</Boton>
            <Boton handleClick={agregarInput}>8</Boton>
            <Boton handleClick={agregarInput}>9</Boton>
            <Boton handleClick={agregarInput}>*</Boton>
          </div>
          <div className='fila'>
            <Boton handleClick={calcular}>=</Boton>
            <Boton handleClick={agregarInput}>0</Boton>
            <Boton handleClick={agregarInput}>.</Boton>
            <Boton handleClick={agregarInput}>/</Boton>
          </div>
          <div className='fila'>
            <Clear handleClear={() => setUserInput('')}>Clear</Clear>
          </div>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import Testimonio from './componentes/testimonio';
import testimonios from './json/testimonios.json';

function App() {
  return (
    <div className="App">
      <h1>Here is what our alumni say about freeCodeCamp:</h1>
      {testimonios.map( 
        testimonio => (
          <Testimonio 
            imagen={testimonio.imagen}
            nombre={testimonio.nombre}
            pais={testimonio.pais}
            cargo={testimonio.cargo}
            empresa={testimonio.empresa}
            testimonio={testimonio.testimonio}
          />
        )
      )}
    </div>
  );
}

export default App;

import React from "react"; // esta linea se puede eliminar si no se trabaja con hooks
import '../css/boton.css'

function Boton({ texto, esBotonDeClic, manejarClic }) {
    return (
        <button 
            className={ esBotonDeClic ? 'boton-clic' : 'boton-reiniciar' }
            onClick={manejarClic} >
                {texto}
        </button>
    )
}

export default Boton;
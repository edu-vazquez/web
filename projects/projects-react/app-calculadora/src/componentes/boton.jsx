import React from "react"; // esta linea se puede omitir si no se usa hooks
import '../css/boton.css'

function Boton (props) {

    const esOperador = valor => {
        return isNaN(valor) && valor !== '.' &&  valor !== '=';
    };

    return (
        <div
            className={`boton-contenedor ${esOperador(props.children) ? 'operador' : ''}`.trimEnd()}
            onClick={() => props.handleClick(props.children)}>
            {props.children}
        </div>
    )
};

export default Boton;
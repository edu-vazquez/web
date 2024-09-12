import React from "react"; // esta linea se puede eliminar si no se trabaja con hooks

import '../css/contador.css'

function Contador ({ numeroDeClics }) {
    return (
        <div className="contador">
            { numeroDeClics }
        </div>
    )
}

export default Contador;
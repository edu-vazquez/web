import React from "react";
import '../css/tarea.css';
import { AiOutlineCloseCircle } from "react-icons/ai";

function Tarea({ texto, isComplete, id, completarTarea, eliminarTarea }){
    return (
        <div className={ isComplete ? 'tarea-contenedor completada' : 'tarea-contenedor'}>
            <div 
                className='tarea-texto'
                onClick={() => completarTarea(id)}
            >
                { texto }
            </div>
            <div 
                className="tarea-icono-contenedor"
                onClick={() => eliminarTarea(id)}
            >
                <AiOutlineCloseCircle className="tarea-icono" />
            </div>
        </div>
    )
};

export default Tarea;
import React, { useState } from "react";

import Formulario from './Formulario';
import Tarea from './Tarea';

import '../css/lista-de-tareas.css'

function ListaDeTareas () {

    const [tareas, setTareas] = useState([]);

    const agregarTarea = tarea => {
        if (tarea.texto.trim()){
            tarea.texto = tarea.texto.trim();
            const tareasOrganizadas = [tarea, ...tareas];
            setTareas(tareasOrganizadas);
        } else {
            alert("Ingrese una tarea")
        }
    }
    
    const eliminarTarea = id => {
        const tareasFiltradas = tareas.filter( tarea => tarea.id !== id);
        setTareas(tareasFiltradas)
    }

    const completarTarea = id => {
        const tareasCompletadas = tareas.map( tarea => {
            if (tarea.id === id) {
                return {
                    ...tarea, 
                    isComplete : !tarea.isComplete 
                };
            }
            return tarea
        })
        setTareas(tareasCompletadas);
    }

    return (
        <>
            <Formulario onSubmit={agregarTarea}/>
            <div className="tarea-lista-contenedor">
                {
                    tareas.map( tarea => 
                        (
                            <Tarea 
                                id={tarea.id}
                                key={tarea.id}
                                texto={tarea.texto}
                                isComplete={tarea.isComplete}
                                eliminarTarea={eliminarTarea}
                                completarTarea={completarTarea} 
                            />
                        )
                    )
                }
            </div>
        </>
    )
};

export default ListaDeTareas;

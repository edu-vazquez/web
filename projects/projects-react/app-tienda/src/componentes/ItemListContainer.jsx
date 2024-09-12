import { useEffect, useState } from "react";
import { pedirDatos } from "../helpers/pedirDatos";
import ItemList from './ItemList'
import { useParams } from "react-router-dom";

// esta es una funcion propia en ../helpers y se importo para usarla aqui 
import { toCapital }  from '../helpers/toCapital'

const ItemListContainer = () => {
    
    const [productos, setProductos] = useState([]);
    
    const categoria = useParams().categoria;

    useEffect(()=>{
        pedirDatos()
            .then( data => {
                if (categoria){
                    setProductos( data.filter( item => item.categoria === categoria) );
                } else {
                    setProductos( data );
                }
            })
    }, [categoria])
    
    return (
        <>
            <ItemList productos={productos} titulo={categoria ? toCapital(categoria) : "Productos"}/>
        </>
    )
}

export default ItemListContainer;
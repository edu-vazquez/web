import { useEffect } from "react";
import { useState } from "react";
import { pedirItem } from "../helpers/pedirDatos";
import ItemDetail from "./ItemDetail";

{/* esto es un hook para poder recibir parametros dinamicos de rutas*/}
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ItemDetailContainer = () => {

    const [item, setItem] = useState({});

    const id = useParams().id; {/*IMPORTANTE ACA SE RECIVE EL PARAMETRO COMO STRING, pasarlo a numero */}

    useEffect(() => {
        pedirItem(Number(id))
        .then(resp =>  setItem(resp))
    }, [item])

    return (
        <div>
            { item && <ItemDetail item={item}/> }
        </div>
    )
}

export default ItemDetailContainer;
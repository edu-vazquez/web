import '../css/testimonio.css'

function Testimonio(props) {
    return (
        <div className='contenedor-testimonio-principal'>
            <img 
                src={require(`../imagenes/testimonio-${props.imagen}.png`)}
                alt={`imagen ${props.imagen}`}
            />
            <div className="contenedor-testimonio">
                <p className="testimonio-nombre"><strong>{props.nombre}</strong> de {props.pais}</p>
                <p className="testimonio-cargo">{props.cargo} en <strong>{props.empresa}</strong></p>
                <p className="testimonio">"{props.testimonio}"</p>
            </div>
        </div>
    );
}

export default Testimonio;
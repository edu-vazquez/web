import React from "react";
import '../css/clear.css'

const Clear = (props) => (
    <div 
        className="boton-clear" 
        onClick={() => props.handleClear()}>
            {props.children}
    </div>
);

export default Clear;
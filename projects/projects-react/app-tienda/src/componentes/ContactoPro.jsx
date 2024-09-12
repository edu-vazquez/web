import React, { useState } from 'react'

const Contacto = () => {

  const [inputs, setInputs] = useState({
    nombre: "",
    apellido: "",
    email: ""
    });

  const handleSubmit = e => {
    e.preventDefault();
    console.log("enviado", inputs);
  }

  const handleInputs = e => {
    setInputs({
      ...inputs,
      [e.target.name] : e.target.value 
    })
  }

  return (
    <div className='container'>
        <h1 className="main-title">Contacto</h1>

        <form action="" className='formulario' onSubmit={handleSubmit}>

          <input 
            type="text" 
            name="nombre"
            id="nombre"
            placeholder='Ingresa tu nombre...'
            value={inputs.nombre}
            onChange={handleInputs}
          />
          
          <input 
            type="text" 
            name="apellido"
            id="apellido"
            placeholder='Ingresa tu apellido...'
            value={inputs.apellido}
            onChange={handleInputs}
          />
          
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={inputs.email}
            onChange={handleInputs}
            placeholder='Ingresa tu email...'
          />

          <button 
            type="submit" 
            className='enviar'
          >
            Enviar
          </button>

        </form> 

    </div>
  )
}

export default Contacto

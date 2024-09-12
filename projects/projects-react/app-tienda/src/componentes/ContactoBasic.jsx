import React, { useState } from 'react'

const Contacto = () => {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log("enviado", nombre, email);
  }

  const handleNombre = e => {
    setNombre(e.target.value);
    console.log(e.target.value);
  }
  
  const handleEmail = e => {
    setEmail(e.target.value);
  }  

  return (
    <div className='container'>
        <h1 className="main-title">Contacto</h1>

        <form action="" className='formulario' onSubmit={handleSubmit}>

          <input 
            type="text" 
            placeholder='Ingresa tu nombre...'
            value={nombre}
            onChange={handleNombre}
          />
          
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email}
            onChange={handleEmail}
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

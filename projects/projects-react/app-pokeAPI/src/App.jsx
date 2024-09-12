import { useState } from 'react'
import './App.css'
import Pokemon from './componenetes/Pokemon'
import PokemonList from './componenetes/PokemonList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Pokemon</h1>
      <Pokemon /> 
      <hr />
      <br />
      <h1>Lista de Pokemones</h1>
      <PokemonList />
    </>
  )
}

export default App

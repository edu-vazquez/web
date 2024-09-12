import React, { useState,useEffect } from "react";

const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [id, setId] = useState(1);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(resJSON => setPokemon(resJSON))
            .catch(err => console.log(err.message))
    }, [id])

    const nextPokemon = () => {
        id < 898 && setId(id + 1);
    }
    const prevPokemon = () => {
        id > 1 && setId(id - 1);
    }
    
    return (
        <>
            {pokemon ? (
                <div>
                    <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                    <h2>{pokemon.name}</h2>
                </div>
                ) : (
                    <p>Loading...</p>)}
            <div>
                <button disabled={id === 1} onClick={prevPokemon}>previous</button>
                <button disabled={id === 898} onClick={nextPokemon}>next</button>
            </div>
        </>
    )
}

export default Pokemon;
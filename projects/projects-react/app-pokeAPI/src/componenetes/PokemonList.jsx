import React, {useEffect, useState} from "react";

function PokemonList() {

    const [data, setData] = useState({});
    const [listLink, setListLink] = useState("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0");

    useEffect( () => {
        fetch(listLink)
            .then(res => res.json())
            .then(json => {
                setData(json);
            })
    }, [listLink])

    const handleNext = () => {
        console.log(data.next);
        data.next && setListLink(data.next);
    }
    const handlePrevious = () => {
        data.previous && setListLink(data.previous);
    }

    return (
        <>
            {
                data.results && (
                    data.results.map( item => {
                        return <h3 key={item.name}>{item.name}</h3>
                    })
                )
            }
            <div>
                <button disabled={!data.previous} onClick={handlePrevious}>Previous</button>
                <button disabled={!data.next} onClick={handleNext}>Next</button>
            </div>
        </>
    )
}

export default PokemonList;
import { useEffect, useState } from "react"
import { obtener_pokemon_por_nombre } from "../js/fetchingData"
import { PokemonBox } from "./InfoPokemon"
import '../css/pokedex.css'
export const Pokedex = () => {

    const [pokemon, setPokemon] = useState({})
    console.log('el poke al renderizar es', pokemon);

    useEffect(() => {
        obtenerPokemon()
    },[])

    //Guardo el poke que recibo del fetch en el useState
    const obtenerPokemon = async (nombre_pokemon) => {
        const pokemonObtenido = await obtener_pokemon_por_nombre(nombre_pokemon)
        setPokemon(pokemonObtenido)
    }

    //Recojo el nombre de pokemon del input
    const recogerNombre = (e) => {
        e.preventDefault()
        const nombre_pokemon = e.target.elements[0].value
        console.log('el nombre pokemon es', nombre_pokemon);
        if (nombre_pokemon !== '') obtenerPokemon(nombre_pokemon)
    }

    return(
        <>
            <label style={{color:"white"}}>Introduce el nombre del pokemon</label><br />
            <form action="post" onSubmit={recogerNombre}>
                <input type="text" name="pokename" id="pokename" placeholder="mewtwo..."/>
            </form>
            {
                pokemon && (
                    <>
                        <PokemonBox
                        pokemon={pokemon}/>
                        
                    </>

                )
            }

            {
                !pokemon && (
                    <div className="notFound">
                        <h3 style={{color:"white"}}>Pokemon no encontrado</h3>
                    </div>
                )
            }
        </>
       
    )
}
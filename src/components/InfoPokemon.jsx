import { useState } from "react"

export const PokemonBox = ({ pokemon }) =>{

    const showInfo = {
        showAb1 : false,
        showAb2: false,
        showAb3: false,
        showAb4: false,
        showStats: false
    }
    
    //useState para los botones que muestran y ocultan información
    const [show, setShow] = useState(showInfo)

    //set de la info que se va a mostrar
    const showAb = (e) => {
        const habilidad = e.target.parentElement.className
        const newShow = {... show}
        if (habilidad.includes('1')) {
            newShow.showAb1 = !newShow.showAb1
        } else if (habilidad.includes('2')) {
            newShow.showAb2 = !newShow.showAb2
        } else if (habilidad.includes('3')) {
            newShow.showAb3 = !newShow.showAb3
        } else if (habilidad.includes('4')) {
            newShow.showAb4 = !newShow.showAb4
        } else {
            newShow.showStats = !newShow.showStats
        }
        setShow(newShow)
    }

    //Si se ha buscado un pokemon
    if (Object.keys(pokemon).length !== 0){
        const {abilities, estadisticas, id, types, url, nombre} = pokemon
        const typesList = transformTypes(types)
        return (
            <div className="poke_box">

                <img src={url} alt='pokeimg'/> 

                <h2>{id}. {nombre}</h2>

                <div className="types">
                    {
                        typesList[0] && (
                            <div className={`box ${typesList[0] ? typesList[0] : typesList[1]}`}>
                                <h3>{typesList[0] ? typesList[0] : typesList[1]}</h3>
                            </div>
                        )
                    }
                    {
                        typesList[2] && (
                        <>
                            <div className={`box ${typesList[0] ? typesList[0] : typesList[1]}`}>
                                <h3>{typesList[0] ? typesList[0] : typesList[1]}</h3>
                            </div>
                            <div className={`box ${typesList[2] ? typesList[2] : ''}`}>
                                <h3>{typesList[2] ? typesList[2] : ''}</h3>
                            </div>
                        </>
                            
                        )
                    }
                </div><br />
                
               <div className="abilities">
                    <div className="ab 1">
                        <button onClick={showAb}>{abilities.ab1.nombre}</button>
                        {
                            show.showAb1 && (
                                <p className="description">{abilities.ab1.descripcion}</p>
                            )
                        }  
                    </div>

                    {
                        abilities.ab2 && (
                            <div className="ab 2">
                                <button onClick={showAb}>{abilities.ab2.nombre}</button>
                        {
                                show.showAb2 && (
                                    <p className="description">{abilities.ab2.descripcion}</p>
                                )
                        }
                            </div >  
                        )
                    }

                    {
                        abilities.ab3 && (
                            <div className="ab 3">
                                <button onClick={showAb}>{abilities.ab3.nombre}</button>
                                {
                                    show.showAb3 && (
                                        <p className="description">{abilities.ab3.descripcion}</p>
                                    )
                                }
                            </div >  
                        )
                    }

                    {
                        abilities.ab4 && (
                            <div className="ab 4">
                                <button onClick={showAb}>{abilities.ab4.nombre}</button>
                                {
                                    show.showAb4 && (
                                        <p className="description">{abilities.ab4.descripcion}</p>
                                    )
                                }
                            </div >
                        )
                    }

                    
                </div> 
                
                <div className="stats">
                    <button onClick={showAb}>Ver estadísticas</button>
                    {
                        show.showStats && (
                            <div className="showStats">
                                <h3>Hp: </h3>
                                <p>{estadisticas.hp}</p>
                                <h3>Ataque: </h3>
                                <p>{estadisticas.attack}</p>
                                <h3>Defensa: </h3>
                                <p>{estadisticas.defense}</p>
                                <h3>Ataque Especial: </h3>
                                <p>{estadisticas.special_attack}</p>
                                <h3>Defensa Especial: </h3>
                                <p>{estadisticas.special_defense}</p>
                                <h3>Velocidad: </h3>
                                <p>{estadisticas.speed}</p>
                            </div>
                        )
                    }
                </div>
                
            </div>
        )
    } 
}

//transformamos los tipos en una lista para más fácil manejo de datos
function transformTypes(types) {
    const types_list = []
    try{
        types_list.push(types.type)
        types_list.push(types.type1)
        types_list.push(types.type2)
    } catch (err){
        console.log('error', err);
    }

    return types_list
}
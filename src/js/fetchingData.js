export const obtener_pokemon_por_nombre = async(pokemon) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    //Hacemos fecth del pokemon recibido
    const resp = await fetch(URL)
    if (!resp.ok) return false
    const data = await resp.json()

    const {sprites, id, types, name, stats, abilities} = data

    //Obtenemos la descripción de las habilidades mediante otro fecth
    const descripcion = {
        ab1: '',
        ab2: '',
        ab3: '',
        ab4: ''
    }
    for (let i = 0; i < abilities.length; i++) {
        const URL_ABILITY = abilities[i].ability.url
        const respu = await fetch(URL_ABILITY)
        const description = await respu.json()
        description.flavor_text_entries.forEach(entrie => {
            if (i === 0 && entrie.language.name == 'es') {
                descripcion.ab1 = entrie.flavor_text.replace('\n', ' ')
            } else if (i === 1 && entrie.language.name === 'es'){
                descripcion.ab2 = entrie.flavor_text.replace('\n', ' ')
            } else if (i === 2 && entrie.language.name === 'es'){
                descripcion.ab3 = entrie.flavor_text.replace('\n', ' ')
            } else if (i === 3 && entrie.language.name === 'es') {
                descripcion.ab4 = entrie.flavor_text.replace('\n', ' ')
            }
        });
        
    }
    
    //Montamos las estadísticas del pokemon
    const estadisticas = {
        hp: stats[0].base_stat,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        special_attack: stats[3].base_stat,
        special_defense: stats[4].base_stat,
        speed: stats[5].base_stat,
    }

    //Montamos el pokemon final, juntando todas las piezas hasta ahora
    const poke = {
        id: id,
        types: types.length === 1 ? 
        {
            type: types[0].type.name
        }  : 
        {
            type1:types[0].type.name,
            type2:types[1].type.name
        },
        nombre: name, 
        url: sprites.front_default,
        abilities: abilities.length === 1 ? {
            ab1: {
                nombre: abilities[0].ability.name,
                descripcion: descripcion.ab1
            }
        }  : 
        abilities.length === 2 ? {
            ab1: {
              nombre: abilities[0].ability.name,
              descripcion: descripcion.ab1
            },
            ab2: {
              nombre: abilities[1].ability.name,
              descripcion: descripcion.ab2
            }
          }
        : 
        abilities.length === 3 ? {
            ab1: {
              nombre: abilities[0].ability.name,
              descripcion: descripcion.ab1
            },
            ab2: {
              nombre: abilities[1].ability.name,
              descripcion: descripcion.ab2
            },
            ab3: {
              nombre: abilities[2].ability.name,
              descripcion: descripcion.ab3
            }
          }
        : {
            ab1: {
              nombre: abilities[0].ability.name,
              descripcion: descripcion.ab1
            },
            ab2: {
              nombre: abilities[1].ability.name,
              descripcion: descripcion.ab2
            },
            ab3: {
              nombre: abilities[2].ability.name,
              descripcion: descripcion.ab3
            },
            ab4: {
              nombre: abilities[3].ability.name,
              descripcion: descripcion.ab4
            }
          },
        estadisticas
    }

    return poke
      
}
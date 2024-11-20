window.addEventListener('load', () => {
    const URL = "https://pokeapi.co/api/v2/pokemon";

    async function obtenerNumero() {
        const response = await fetch(URL);
        const data = await response.json();
        return data.count;
    }

    async function obtenerPokemon(id) {
        const response = await fetch(`${URL}/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    }
    async function obtenerTodosLosPokemons() {
        const numeroPokemons = await obtenerNumero();
        for (let index = 1; index <= numeroPokemons; index++) {
            const pokemon = await obtenerPokemon(index);
            if (pokemon) {
                pokedex.innerHTML += `  <div class="pokemon">
                                        <div class="pokemon-img" style="background-image:url(${pokemon.sprites.front_default})">
                                        </div>
                                        <div class="pokemon-nombre">${pokemon.name}- ${pokemon.type}</div>
                                    </div>` 
            } else {
                break;
            }
        }
    }
    obtenerTodosLosPokemons();
});

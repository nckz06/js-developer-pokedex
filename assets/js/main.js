let pokemonNumber
const pokemonOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 20
let offset = 0

function convertPokemonToLi(pokemon) {
    if (pokemon.id < 10) {
        pokemonNumber = `000${pokemon.id}`
    } else if (pokemon.id >= 10 && pokemon.id < 100) {
        pokemonNumber = `00${pokemon.id}`
    } else if (pokemon.id >= 100 && pokemon.id < 1000) {
        pokemonNumber = `0${pokemon.id}`
    } else {
        pokemonNumber = pokemon.id
    }
    
    return `
        <li class="pokemon__item ${pokemon.type}">
            <div class="pokemon__info">
                <span class="pokemon__title">${pokemon.name}</span>
                <span class="pokemon__id">#${pokemonNumber}</span>
            </div>
            <div class="pokemon__detail">
                <ol>
                    ${pokemon.types.map((type) => `<li class="pokemon__type">${type}</li>`).join('')}
                </ol>
                <img class="pokemon__image" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonList(offset = 0, limit = 20) {
    
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonOl.innerHTML += newHtml
        })
        .finally(() => {
            const pokemonItems = document.querySelectorAll('.pokemon__item')
            
            pokemonItems.forEach(item => {
                item.addEventListener('click', () => {
                    const name = item.querySelector('.pokemon__title').textContent
                    window.location.assign(`info.html?pokemon=${encodeURIComponent(name)}`)
                })
            })
        })

}

loadPokemonList(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecords = offset + limit
    
    if (qtdRecords >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonList(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonList(offset, limit)
    }
});
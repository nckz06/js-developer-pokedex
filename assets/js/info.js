const urlParams = new URLSearchParams(window.location.search)

function setHeaderValues(pokemon) {
        
    const htmlId = document.querySelector('.pokemon__id')
    const htmlName = document.querySelector('.pokemon__name')
    const htmlTypes = document.querySelector('.pokemon__types')
    const htmlImg = document.querySelector('.pokemon__image')
    const htmlIcon = document.querySelector('#flavicon')

    document.body.classList.add(pokemon ? pokemon.type : '')
    document.title = pokemon ? `${pokemon.name}` : 'Sobre'
    htmlIcon.href = pokemon ? pokemon.image : './assets/img/pokeball-fill.svg'
    htmlId.textContent = pokemon ? pokemon.id : '-'
    htmlName.textContent = pokemon ? pokemon.name : '-'
    htmlTypes.innerHTML = pokemon.types.map((type) => `<li class="pokemon__type">${type}</li>`).join('')
    htmlImg.src = pokemon ? pokemon.image : 'https://via.placeholder.com/250x250'

    console.log(pokemon._sprites.front_default)

}

function setDetailsValues(pokemon) {

    const htmlPokemonDetail = document.querySelector('.pokemon__detail')
    const details = [ 
        pokemon.shape, 
        pokemon.height, 
        pokemon.weight, 
        pokemon.abilities, 
        pokemon.habitat, 
        pokemon.eggGroup 
    ]
    
    htmlPokemonDetail.querySelector('ul').innerHTML = details
    .map(detail => {
        const category = detail.category
        const element = detail.element
        
        return `
        <li>
            <span class="category">${category}</span>
            <span class="element">${element}</span>
        </li>`
    }).join('')
        
}
    
function setStatsValues(pokemon) {

    const htmlPokemonStats = document.querySelector('.pokemon__stats')
    const stats = pokemon.stats

    htmlPokemonStats.querySelector('ul').innerHTML = stats.map(stat => {
        const category = stat.category
        const value = stat.value

        return `
        <li>
            <span class="category">${category}</span>
            <span class="element">${value}</span>
            <span class="progressBar">
                <em class="progress__value ${value > 50 ? 'positive' : 'negative'}" style="width: ${value < 100 ? value : 100}%"></em>    
            </span>
        </li>
        `
    }) 
    .join('')

}

function setValues(pokemon) {
    
    setHeaderValues(pokemon)
    setDetailsValues(pokemon)
    setStatsValues(pokemon)
    
}   

function loadPokemonInfo() {

    const pokemonName = urlParams.get('pokemon')
    const service = new PokemonService()

    service.getItem(pokemonName)
        .then(response => {
            const { id, name, types, abilities, stats, height, weight, species, base_experience, sprites } = response
            const pokemon = new PokemonInfo(id, name, types, abilities, stats, height, weight, species, base_experience, sprites)

            return pokemon
        })
        .then(pokemon => {
            service.getItemSpecies(pokemon._species.url).then(response => {
                const { egg_groups, habitat, shape, capture_rate } = response
                const pokemonSpecies = new PokemonSpecies(egg_groups, habitat, shape, capture_rate)
                
                pokemon._loadItemSpecies(pokemonSpecies)
                setValues(pokemon)
            })
        })

}
 
loadPokemonInfo()
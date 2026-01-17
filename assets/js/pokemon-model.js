class Pokemon {

    id;
    name;
    type;
    types = [];
    photo;

}

class PokemonService {

    constructor() {
        this.baseUrl = 'https://pokeapi.co/api/v2'
    }

    getItem(name) {
        return fetch(`${this.baseUrl}/pokemon/${name}`)
            .then(response => response.json())
            .then(data => data)
    }

    getItemSpecies(url) {
        return fetch(url)
            .then(response => response.json())
            .then(data => data)
    }
}

class PokemonSpecies {

    constructor(eggGroups, habitat, shape, capture_rate) {
        this._eggGroups = eggGroups
        this._habitat = habitat
        this._shape = shape
        this._captureRate = capture_rate
    }

    get eggGroups() {
        return this._eggGroups.map(item => item.name)
    }

    get habitat() {
        return this._habitat.name
    }

    get shape() {
        return this._shape.name
    }

}

class PokemonInfo {

    constructor(id, name, types, abilities, stats, height, weight, species, baseExperience, sprites) {
        this._id = id
        this._name = name
        this._types = types
        this._abilities = abilities
        this._height = height
        this._weight = weight
        this._species = species
        this._stats = stats
        this._baseExperience = baseExperience
        this._sprites = sprites
    }

    get id() {
        let id
        
        if (this._id < 10) {
            id = `#000${this._id}`
        } else if (this._id >= 10 && this._id < 100) {
            id = `#00${this._id}`
        } else if (this._id >= 100 && this._id < 1000) {
            id = `#0${this._id}`
        } else {
            id = `#${this._id}`
        }

        return id
    }
    
    get name() {
        return `${this._name.toUpperCase()}`
    }

    get types() {
        return this._types.map((typeSlot) => typeSlot.type.name)
    }

    get type() {
        const types = this._types.map((typeSlot) => typeSlot.type.name)
        const [ type ] = types

        return type
    }

    get abilities() {
        return {
            category: 'abilities',
            element: this._abilitiesFilter(this._abilities)
        }
    }
    
    get height() {
        return {
            category: 'height',
            element: `${this._height / 10} m`
        }
    }

    get weight() {
        return {
            category: 'weight',
            element: `${this._weight / 10} kg`
        }
    }

    get eggGroup() {
        return {
            category: 'egg group',
            element: this._eggGroup.map(item => this._capitalize(item.split('-').join(' '))).join(', ')
        }
    }

    get habitat() {
        return {
            category: 'habitat',
            element: this._capitalize(this._habitat.split('-').join(' '))
        }
    }

    get stats() {
        return this._stats.map(item => {
            const category = item.stat.name.split('-').join(' ') 
            const value = item.base_stat
        
            return {
                category,
                value
            }
        })
    }

    get shape() {
        return {
            category: 'shape',
            element: this._capitalize(this._shape)
        }
    }

    get captureRate() {
        return {
            category: 'capture rate',
            element: `${this._captureRate}%`
        }
    }
    
    get baseExperience() {
        return `${this._baseExperience} / 100`
    }
    
    get image() {
        return this._sprites.other.dream_world.front_default
    }
    
    _capitalize(value) {
        return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
      }

    _abilitiesFilter(abilities) {
        return abilities.map(item => this._capitalize(item.ability.name.split('-').join(' '))).join(', ')
    }

    _loadItemSpecies(pokemon) {
        
        this._eggGroup = pokemon.eggGroups
        this._habitat = pokemon.habitat
        this._shape = pokemon.shape
        this._captureRate = pokemon._captureRate

    }
}
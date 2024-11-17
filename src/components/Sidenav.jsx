import '../utils'
import { first151Pokemon, getFullPokedexNumber } from '../utils'
import { useState } from 'react'

export default function Sidenav(props) {

    const [inputValue, setInputValue] = useState('')
    const {setSelectedPokemon, selectedPokemon} = props

    const filteredPokemon = first151Pokemon.filter(val => {
        if (val.toLowerCase().includes(inputValue.toLowerCase())) { return true }
        return false
    })

    return (
      <nav className="sidenav">
            <h1>Pokedex</h1>
            <input value={inputValue} onChange={(e) => {
                setInputValue(e.target.value)
            }}/>
            <div> {filteredPokemon.map((pokemon, pokemonIndex) => {
                return (
                <button key={pokemonIndex} onClick={() => {
                    setSelectedPokemon(first151Pokemon[first151Pokemon.indexOf(pokemon)].toLowerCase())
                }}>
                    <p>{pokemon}</p>
                    <p>{getFullPokedexNumber(first151Pokemon.indexOf(pokemon))}</p>
                </button>
            )})} </div>
      </nav>
    )
  }
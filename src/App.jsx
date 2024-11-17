import Header from './components/Header'
import Modal from './components/Modal'
import Sidenav from './components/Sidenav'
import TypeCard from './components/TypeCard'
import Pokecard from './components/Pokecard'
import './Fanta.css'
import {useState} from 'react'

function App() {

  const [selectedPokemon, setSelectedPokemon] = useState('bulbasaur')

  return (
    <>
      <Header />
      <Pokecard selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}/>
      <Sidenav selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}/>
    </>
  )
}

export default App


//hit the api and get the data and list it
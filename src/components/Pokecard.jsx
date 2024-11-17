import { useState, useEffect } from 'react'
import { first151Pokemon, getFullPokedexNumber } from '../utils'
import TypeCard from './TypeCard'
import Modal from './Modal'

export default function Pokecard(props) {

    const [data, setData] = useState(null)
    const [moveLoading, setMoveLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [skill, setSkill] = useState(false)
    const [moveData, setMoveData] = useState({})

    const {setSelectedPokemon, selectedPokemon} = props

    const {name, height, abilities, stats, types, moves, sprites} = data || {}

    const filteredImages = Object.keys(sprites || {}).filter(key => {
        if(!sprites[key]) { return false }
        if(['versions', 'other'].includes(key)) { return false}
        return true
    })

    useEffect(() => {
        if(!localStorage || loading || moveLoading) { return }

        let cache = {}

        if(localStorage.getItem('pokedex'))
        {
            cache = JSON.parse(localStorage.getItem('pokedex'))
            
        }

        if(selectedPokemon in cache)
        {
            setData(cache[selectedPokemon])
            console.log("poke in cache")
            return
        }

        async function getPokeData() 
        {
            setLoading(true)
            try 
            {
                const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
                const finalUrl = baseUrl + selectedPokemon
                const response = await fetch(finalUrl)
                const pokeData = await response.json()
                setData(pokeData)

                cache[selectedPokemon] = pokeData
                localStorage.setItem('pokedex', JSON.stringify(cache))
            }
            catch (err)
            {
                console.log(err.message)
            }
            finally
            {
                setLoading(false)
            }
        }

        getPokeData()


    },[selectedPokemon, moveData])

    if(loading || !data)
    {
        return (
            <div> 
                <p> loading... </p>
            </div>
        )
    }

    async function getMoveDescription(moveObj)
    {
        if(loading || moveLoading) { return }

        setMoveLoading(true)
        let c = {}

        if(localStorage.getItem('moves'))
        {
            c = JSON.parse(localStorage.getItem('moves'))
        }

        const moveName = moveObj?.move?.name
        if(moveName in c)
        {
            setMoveData(c[moveName])
            console.log("move in cache")
            setMoveLoading(false)
            return
        }
        try 
        {
            const moveUrl = moveObj?.move?.url
            const response = await fetch(moveUrl)
            const moveDesc = await response.json()
            console.log(moveDesc)
            const moveList = moveDesc?.flavor_text_entries?.filter(val => {
                if(val?.language?.name == 'en') { return true }
                return false
            })

            const skillData = {
                name: moveName,
                description: moveList[0]
            }

            setMoveData(skillData)

            c[moveName] = skillData
            localStorage.setItem('moves', JSON.stringify(c))
        }
        catch (err)
        {
            console.log(err.message)
        }
        finally
        {
            setMoveLoading(false)
        }
    }

    return (
      <div>
        {(skill && <Modal handleCloseModal={() => {setSkill(false)}}>
            <h1>Name</h1>
            <h2>{(moveData?.name)?.replace('-',' ')}</h2>
            <h1>Description</h1>
            <p>{moveData.description?.flavor_text}</p>

        </Modal>)}
        <div>
            <h4> #{getFullPokedexNumber(
                first151Pokemon.indexOf(selectedPokemon.charAt(0).toUpperCase() + selectedPokemon.slice(1)))} </h4>
            <h2> {name} </h2>
        </div>
        <div className="type-container">
            {types.map((typeObj, typeIndex) => {
                return (
                    <TypeCard key={typeIndex} type={typeObj?.type?.name}/>
                )})}
        </div>
       <img src={"./pokemon/" + getFullPokedexNumber(first151Pokemon.indexOf(selectedPokemon.charAt(0).toUpperCase() + selectedPokemon.slice(1))) + '.png'}/>
       <div>
        {
            filteredImages.map((sprite,spriteIndex) => {
                const spriteUrl = sprites?.[sprite]
                return (
                <img src={spriteUrl} key={spriteIndex}/>
            )})
        }
       </div>
        <div>
            {stats.map((statObj, statIndex) => {
                return(
                <div key={statIndex}>
                    <h5>{statObj?.base_stat}</h5>
                    <p>{statObj?.stat?.name}</p>
                </div>
            )})}
        </div>
        <div>
            {moves.map((moveObj, moveIndex) => {
                const move = moveObj?.move?.name
                return (
                    <button key={moveIndex}
                    onClick={() => {
                        setMoveData(moveObj)
                        getMoveDescription(moveObj)
                        setSkill(true) }}>

                        {move.replace('-',' ')}
                    </button>
            )})}
        </div>
      </div>
    )
  }



//sprites, and modal click + data
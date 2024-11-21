# Internal Code Documentation: Pokémon Data

## Table of Contents

* [1. Overview](#1-overview)
* [2. Data Structures](#2-data-structures)
    * [2.1 `first151Pokemon` Array](#21-first151pokemon-array)
    * [2.2 `pokemonTypeColors` Object](#22-pokemontypecolors-object)
* [3. Functions](#3-functions)
    * [3.1 `getFullPokedexNumber(index)`](#31-getfullpokedexnumberindex)


## 1. Overview

This document details the structure and functionality of the JavaScript code providing data for the first 151 Pokémon.  The code exports two main elements: an array containing the names of the first 151 Pokémon and an object mapping Pokémon types to their corresponding colors for display.  A function is included to format Pokémon index numbers for display as three-digit Pokedex numbers.

## 2. Data Structures

### 2.1 `first151Pokemon` Array

This array contains strings representing the names of the first 151 Pokémon in the Pokédex.  The array is zero-indexed; therefore, `first151Pokemon[0]` is "Bulbasaur", `first151Pokemon[1]` is "Ivysaur", and so on.

| Index | Pokémon Name      |
|-------|-------------------|
| 0     | Bulbasaur         |
| 1     | Ivysaur           |
| 2     | Venusaur          |
| ...   | ...               |
| 150   | Mew               |


### 2.2 `pokemonTypeColors` Object

This object maps Pokémon types (keys) to color objects (values). Each color object contains `color` and `background` properties specifying hex color codes for text and background respectively.

| Type       | Color   | Background |
|------------|---------|------------|
| normal     | #6C6C6C | #A8A77A    |
| fire       | #FFFFFF | #EE8130    |
| water      | #FFFFFF | #6390F0    |
| electric   | #000000 | #F7D02C    |
| grass      | #FFFFFF | #7AC74C    |
| ice        | #000000 | #96D9D6    |
| fighting   | #FFFFFF | #C22E28    |
| poison     | #FFFFFF | #A33EA1    |
| ground     | #FFFFFF | #E2BF65    |
| flying     | #000000 | #A98FF3    |
| psychic    | #FFFFFF | #F95587    |
| bug        | #000000 | #A6B91A    |
| rock       | #FFFFFF | #B6A136    |
| ghost      | #FFFFFF | #735797    |
| dragon     | #FFFFFF | #6F35FC    |
| dark       | #FFFFFF | #705746    |
| steel      | #000000 | #B7B7CE    |
| fairy      | #000000 | #D685AD    |


## 3. Functions

### 3.1 `getFullPokedexNumber(index)`

This function takes a Pokémon's index (starting from 0) as input and returns a three-digit string representing its Pokédex number.  The function handles the cases where the index is less than 10 and less than 100 by adding leading zeros as needed.

**Algorithm:**

1. **Increment Index:** Add 1 to the input `index` to convert from zero-based indexing to the actual Pokédex number.
2. **Conditional Formatting:**
    * If the resulting number is greater than 99, return it as a string.
    * If the resulting number is greater than 9 but less than 100, prepend a "0" and return the resulting string.
    * If the resulting number is less than or equal to 9, prepend "00" and return the resulting string.

This ensures that all Pokédex numbers are consistently formatted as three digits (e.g., 001, 010, 151).

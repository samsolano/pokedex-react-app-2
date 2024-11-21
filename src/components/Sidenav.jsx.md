# Sidenav Component Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. State Variables](#3-state-variables)
* [4. Props](#4-props)
* [5. `filteredPokemon` Array](#5-filteredpokemon-array)
* [6. Event Handling](#6-event-handling)
* [7. JSX Structure](#7-jsx-structure)


## 1. Overview

The `Sidenav` component renders a navigation sidebar for a Pokedex application. It allows users to search for Pokémon by name (case-insensitive) from the first 151 Pokémon and select a Pokémon, which updates the selected Pokémon in the parent component.  The component utilizes data and helper functions imported from the `../utils` module.

## 2. Component Structure

The `Sidenav` component is a functional React component exported as the default export.  It utilizes React's `useState` hook for managing its internal state and receives props from its parent component to manage the globally selected Pokémon.

## 3. State Variables

| Variable Name      | Data Type | Description                                                                |
|----------------------|-------------|----------------------------------------------------------------------------|
| `inputValue`        | String      | Stores the current value of the search input field.                         |


## 4. Props

| Prop Name           | Data Type                               | Description                                                                         |
|-----------------------|-------------------------------------------|-------------------------------------------------------------------------------------|
| `setSelectedPokemon` | Function (string => void)                 | Function to update the selected Pokémon in the parent component.                    |
| `selectedPokemon`    | String                                    | The currently selected Pokémon (passed from the parent component for synchronization). |


## 5. `filteredPokemon` Array

The `filteredPokemon` array is created using the `filter` method on the `first151Pokemon` array (imported from `../utils`).  The filter function performs a case-insensitive search:

1. **Input:**  The `inputValue` from the search bar.
2. **Process:** It iterates through each Pokémon name (`val`) in `first151Pokemon`.  For each name, it converts both `val` and `inputValue` to lowercase using `.toLowerCase()` to ensure case-insensitive matching. Then, it uses the `.includes()` method to check if the lowercase `val` contains the lowercase `inputValue`. If it does, the Pokémon is included in the `filteredPokemon` array; otherwise, it's excluded.
3. **Output:** An array containing only the Pokémon names that match the search term.  If the search input is empty, it returns the entire `first151Pokemon` array.

## 6. Event Handling

* **Search Input Change:** The `onChange` event handler of the search input field calls `setInputValue` to update the component's state with the new input value, triggering a re-render and updating the `filteredPokemon` array.
* **Pokémon Button Click:** Each button representing a Pokémon triggers the `setSelectedPokemon` prop function. This function receives the selected Pokémon name (converted to lowercase) as an argument. The index of the selected pokemon within `first151Pokemon` is used to retrieve its Pokedex number with `getFullPokedexNumber`.

## 7. JSX Structure

The JSX renders a navigation sidebar with the following elements:

* A heading (`<h1>`) displaying "Pokedex".
* A search input field (`<input>`) bound to the `inputValue` state.
* A `<div>` containing buttons for each Pokémon in the `filteredPokemon` array. Each button:
    * Displays the Pokémon's name using `<p>`.
    * Displays the Pokémon's Pokedex number (obtained using `getFullPokedexNumber`) using `<p>`.
    * Has a `key` prop set to the Pokémon's index for React's efficient rendering.
    * Uses `onClick` to update the selected Pokémon using the `setSelectedPokemon` prop.

The structure is designed for a clean and user-friendly interface for selecting and searching Pokémon.

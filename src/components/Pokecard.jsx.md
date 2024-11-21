# Pokecard Component Documentation

## Table of Contents

1. [Overview](#overview)
2. [Component State](#component-state)
3. [Data Fetching and Caching (`useEffect`, `getPokeData`, `getMoveDescription`)](#data-fetching-and-caching)
4. [Image Filtering (`filteredImages`)](#image-filtering)
5. [Move Description Modal](#move-description-modal)
6. [Component Rendering](#component-rendering)


## <a name="overview"></a> Overview

The `Pokecard` component displays detailed information about a selected Pokémon, including its name, image, types, stats, and moves.  It fetches data from the PokéAPI, utilizes local storage for caching, and includes a modal for displaying detailed move descriptions.


## <a name="component-state"></a> Component State

The component utilizes several state variables managed by React's `useState` hook:

| State Variable     | Type             | Description                                                                     |
|---------------------|------------------|---------------------------------------------------------------------------------|
| `data`             | Object           | Stores the Pokémon data fetched from the PokéAPI.                             |
| `moveLoading`      | Boolean          | Indicates whether a move description is currently being fetched.                |
| `loading`          | Boolean          | Indicates whether Pokémon data is currently being fetched.                       |
| `skill`            | Boolean          | Controls the visibility of the move description modal.                         |
| `moveData`         | Object           | Stores the data for the selected move, including its name and description.     |


## <a name="data-fetching-and-caching"></a> Data Fetching and Caching

The component utilizes `useEffect` to fetch Pokémon data and move descriptions only when the `selectedPokemon` prop changes or `moveData` is updated.  Both Pokémon data and move descriptions are cached in `localStorage` to improve performance on subsequent requests.

**`useEffect` Hook:** This hook triggers the `getPokeData` function whenever `selectedPokemon` changes or `moveData` changes, ensuring that the component updates its data accordingly.  It checks for existing local storage and cached data before making a network request.

**`getPokeData` Function:** This asynchronous function fetches Pokémon data from `https://pokeapi.co/api/v2/pokemon/` + `selectedPokemon`. It first checks the local storage for cached data. If the data is found, it sets the state with the cached data. Otherwise it makes a network request, updates the local storage cache, and updates the component state with the newly fetched data.  Error handling and loading states are implemented using `try...catch...finally`.


**`getMoveDescription` Function:** This asynchronous function fetches the description of a given Pokémon move from the PokéAPI. Similar to `getPokeData`, it checks local storage for cached move data first, using `moveName` as the key.  If the data isn't cached, it fetches it, filters the flavor text to get the English version, and updates the `moveData` state and local storage. Error handling and a loading state are included.  The algorithm filters the `flavor_text_entries` array to select only the entry with `language.name` equal to 'en'.


## <a name="image-filtering"></a> Image Filtering

The `filteredImages` function filters the `sprites` object to include only relevant image keys, excluding keys like 'versions' and 'other', as well as keys with null values.


## <a name="move-description-modal"></a> Move Description Modal

A modal, controlled by the `skill` state variable, displays the detailed description of a selected Pokémon move.  The modal is opened when a move button is clicked and closed by calling `handleCloseModal`.  The move name and description are extracted from `moveData`.


## <a name="component-rendering"></a> Component Rendering

The component renders the Pokémon's information conditionally, displaying a "loading..." message while data is being fetched.  Once data is available, it renders:

* Pokémon's Pokédex number.
* Pokémon's name.
* Type cards representing the Pokémon's types.
* Pokémon's image.
* An array of images from the `sprites` object.
* Pokémon's stats.
* Buttons for each of the Pokémon's moves, each triggering a call to `getMoveDescription` and opening the modal to display the move's description.

The component leverages several helper functions:

* `getFullPokedexNumber`:  Converts a Pokémon's name to its Pokédex number.
* `first151Pokemon`: An array containing names of the first 151 Pokémon.

The component uses standard HTML elements such as `div`, `h1-h5`, `p`, `img`, and `button` for rendering.  Custom components `TypeCard` and `Modal` are also used.

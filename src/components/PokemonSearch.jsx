import React, { useState } from 'react';
import axios from 'axios';

const PokemonSearch = ({ onSearch }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (pokemonName.trim() === '') {
      setError('Please enter a Pokémon name.');
      return;
    }

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      const pokemonData = {
        name: response.data.name,
        image: response.data.sprites.front_default,
      };
      onSearch(pokemonData);
      setError('');
    } catch (err) {
      setError('Pokémon not found. Please try a different name.');
      onSearch(null);
    }
  };

  return (
    <div className='searchBar'>
      <h2>Search for a Pokémon</h2>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PokemonSearch;

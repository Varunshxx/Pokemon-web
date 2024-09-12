import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=18');
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image: pokemonDetails.data.sprites.front_default,
            };
          })
        );
        setPokemons(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the Pokémon data!', error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  if (loading) {
    return <p>Loading Pokemon...</p>;
  }

  return (
    <div className='listBox'>
      <h1>Pokémon List</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;

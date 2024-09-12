// src/App.js
import React, { useState } from 'react';
import PokemonList from './components/PokemonList';
import PokemonSearch from './components/PokemonSearch';

function App() {
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (pokemon) => {
    setSearchResult(pokemon); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1><a href="home">My Pokémon App</a></h1>

        <PokemonSearch onSearch={handleSearch} />

        {searchResult ? (
          <div className='search-box'>
            <img src={searchResult.image} alt={searchResult.name} />
            <h3>{searchResult.name}</h3>
          </div>
        ) : (
          <PokemonList />
        )}
      </header>
    </div>
  );
}

export default App;

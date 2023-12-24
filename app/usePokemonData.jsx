// usePokemonData.js
import { useState, useEffect } from 'react';

const usePokemonData = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, []);

  return pokemons;
};

export default usePokemonData;

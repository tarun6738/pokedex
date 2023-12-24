'use client';
import React, { useState, useEffect, useRef } from 'react';
import PokemonCard from './cards/PokemonCard';
import PokemonStatsModal from './PokestatsModal';

const Page = () => {
  const mainUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1400';
  const [allPokemons, setAllPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const types = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Steel', 'Bug', 'Grass', 'Electric', 'Ice', 'Fairy', 'Shadow', 'Dark', 'Psychic', 'Dragon', 'Fire', 'Water', 'Ghost'];
  const [visiblePokemons, setVisiblePokemons] = useState(20);
  const targetRef = useRef(null);
  const isLoading = useRef(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const fetchAllPokemons = async () => {
    try {
      isLoading.current = true;
      const response = await fetch(mainUrl);
      const data = await response.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon, index) => {
          const details = await fetchPokemonDetails(pokemon.url);
          return {
            ...pokemon,
            types: details.types.map((type) => type.type.name),
            index: index + 1,
            stats: details.stats, // Include stats here
          };
        })
      );
      setAllPokemons(detailedPokemons);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.current = false;
    }
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleModalClose = () => {
    setSelectedPokemon(null);
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading.current) {
      isLoading.current = true;
      setTimeout(() => {
        setVisiblePokemons((prevVisiblePokemons) => prevVisiblePokemons + 20);
        isLoading.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef]);

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  return (
    <>
      <div className='flex justify-center mt-6 space-x-12'>
        <input
          className="border-2 border-black rounded-md px-4 py-2 w-2/5"
          type="text"
          placeholder='Search for a Pokemon...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border-2 border-black rounded-md px-4 py-2"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-center">
        {allPokemons
          .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, visiblePokemons)
          .map((pokemon) => (
            <div
              key={pokemon.index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4"
              onClick={() => handlePokemonClick(pokemon)}
            >
              <PokemonCard
                name={pokemon.name}
                id={pokemon.index}
                imageUrl={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.index}.svg`}
                types={pokemon.types}
              />
            </div>
          ))}
        <div ref={targetRef}></div>
      </div>
      {selectedPokemon && (
        <PokemonStatsModal
          pokemon={selectedPokemon}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default Page;
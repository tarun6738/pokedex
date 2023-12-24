// PokemonStatsModal.jsx
import React from 'react';

const PokemonStatsModal = ({ pokemon, onClose }) => {
  const getProgressBarColor = (value) => {
    if (value >= 90) {
      return 'bg-green-500'; // Green for high values
    } else if (value >= 60) {
      return 'bg-yellow-500'; // Yellow for medium values
    } else {
      return 'bg-red-500'; // Red for low values
    }
  };

  return (
    <div className="modal">
      <div className="modal-content p-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">
          {pokemon && pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} Stats
        </h2>
        <div className="flex space-x-28">
          <div className="pr-2">
            <img
              className="mt-6 h-72 object-cover"
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon && pokemon.index}.svg`}
              alt={pokemon && pokemon.name}
            />
          </div>
          <div>
            {pokemon &&
              pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="mb-4">
                  <p className="text-sm mb-2">
                    {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
                  </p>
                  <div className="w-64 h-4 relative max-w-xl bg-gray-200 rounded overflow-hidden">
                    <div
                      className={`h-full ${getProgressBarColor(
                        stat.base_stat
                      )}`}
                      style={{
                        width: `${(stat.base_stat / 120) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PokemonStatsModal;

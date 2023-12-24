// 'use client'
import React from 'react';

const page = ({ name, id, types, imageUrl }) => {
  return (
    <div className="max-w-xs mx-auto bg-white border border-gray-300 rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105">
      <img className="w-full h-40 object-cover" src={imageUrl} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="text-gray-600 text-sm mb-2">ID: {id}</div>
        <div className="flex mb-2">
          {types.map((type) => (
            <span
              key={type}
              className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

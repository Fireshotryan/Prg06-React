import React from "react";
import { Link } from "react-router-dom";

export function FavoriteAuto({ favorites, autos, autosRefreshHandler }) {
    const favoriteAutos = autos.filter((auto) => favorites.has(auto.id));
  
    return (
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4">Favorite Autos</h2>
        {favoriteAutos.length === 0 ? (
          <p>No favorite autos yet. Add some to your favorites!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteAutos.map((auto) => (
              <div key={auto.id} className="bg-gray-200 p-4 rounded-md shadow-md">
                <h3 className="text-xl font-bold mb-2">{auto.brand}</h3>
                <p>Model: {auto.model}</p>
                <p>Year: {auto.year}</p>
                <p>Color: {auto.color}</p>
                <p>Price: {auto.price}</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 transition duration-300 hover:bg-red-600"
                  onClick={() => autosRefreshHandler(auto.id)}
                >
                  Remove from Favorites
                </button>
                <Link to="/" className="block mt-2 text-blue-500 hover:underline">
                  Return to Index
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

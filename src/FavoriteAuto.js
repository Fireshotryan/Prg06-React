import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./FavoriteAuto.css"; // Import your CSS file

export function FavoriteAuto({ favorites, autos, autosRefreshHandler }) {
  const [removedFromFavorites, setRemovedFromFavorites] = useState(null);

  const handleRemoveFromFavorites = async (autoId) => {
    try {
      // Perform removal logic, update backend, etc.
      // For now, let's assume you have a function to handle removal
      // Replace this with your actual logic
      await autosRefreshHandler(autoId);

      setRemovedFromFavorites(autoId);

      // Clear the alert message after a delay
      setTimeout(() => {
        setRemovedFromFavorites(null);
      }, 5000);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const favoriteAutos = autos.filter((auto) => favorites.has(auto.id));

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Favorite Autos</h2>
      <div className={`alert-message ${removedFromFavorites ? "show" : ""}`}>
        Removed from favorites: {removedFromFavorites}
      </div>
      <TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteAutos.map((auto) => (
          <CSSTransition
            key={auto.id}
            timeout={300}
            classNames="fade"
          >
            <div className="bg-gray-200 p-4 rounded-md shadow-md">
              <h3 className="text-xl font-bold mb-2">{auto.brand}</h3>
              <p>Model: {auto.model}</p>
              <p>Year: {auto.year}</p>
              <p>Color: {auto.color}</p>
              <p>Price: {auto.price}</p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 transition duration-300 hover:bg-red-600"
                onClick={() => handleRemoveFromFavorites(auto.id)}
              >
                Remove from Favorites
              </button>
              <Link to="/" className="block mt-2 text-blue-500 hover:underline">
                Return to Index
              </Link>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

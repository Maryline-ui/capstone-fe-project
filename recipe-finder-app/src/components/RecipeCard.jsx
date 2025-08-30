import React from 'react';
import useFavoritesStore from '../store/favoritesStore';

const RecipeCard = ({ recipe, onClick }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const isCurrentlyFavorite = isFavorite(recipe.idMeal);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isCurrentlyFavorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer relative"
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{recipe.strMeal}</h3>
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-70 text-gray-800 hover:text-red-500 transition-colors"
          aria-label="Toggle favorite status"
        >
          {isCurrentlyFavorite ? (
            <span className="text-red-500">❤️</span>
          ) : (
            <span className="text-gray-400">🤍</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
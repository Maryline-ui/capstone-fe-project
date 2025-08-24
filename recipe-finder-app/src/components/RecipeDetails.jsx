import React from 'react';
import useFavoritesStore from '../store/favoritesStore';

const RecipeDetails = ({ recipe, onBack }) => {
  // Use the Zustand store to access favorites data and functions
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  // Check if the current recipe is a favorite
  const isCurrentlyFavorite = isFavorite(recipe.idMeal);

  // A function to toggle the favorite status
  const toggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto my-8">
      <button
        onClick={onBack}
        className="mb-4 text-blue-500 hover:text-blue-700 transition-colors duration-200"
      >
        &larr; Back to all recipes
      </button>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{recipe.strMeal}</h1>
        
        {/* The new favorite button */}
        <button
          onClick={toggleFavorite}
          className={`py-2 px-4 rounded-full font-semibold transition-colors duration-200 ${
            isCurrentlyFavorite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {isCurrentlyFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Ingredients</h2>
        <ul className="list-disc pl-5">
          {Object.keys(recipe).filter(key => key.startsWith('strIngredient') && recipe[key]).map((key, index) => (
            <li key={index} className="text-gray-700">{recipe[key]} - {recipe[`strMeasure${key.slice(13)}`]}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Instructions</h2>
        <p className="text-gray-700">{recipe.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;

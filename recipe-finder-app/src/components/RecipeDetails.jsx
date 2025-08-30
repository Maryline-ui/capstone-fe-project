import React from 'react';
import useFavoritesStore from '../store/favoritesStore';

const RecipeDetails = ({ recipe, onBack }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const isCurrentlyFavorite = isFavorite(recipe.idMeal);

  const handleFavoriteClick = () => {
    if (isCurrentlyFavorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  // Helper function to get ingredients and measures
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  const ingredientsList = getIngredients();

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-10 mb-8 mx-auto max-w-4xl">
      <button onClick={onBack} className="flex items-center text-blue-500 hover:text-blue-700 transition-colors mb-6">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to recipes
      </button>

      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-auto rounded-lg"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={handleFavoriteClick}
            className="p-3 rounded-full bg-white bg-opacity-70 text-gray-800 hover:text-red-500 transition-colors"
            aria-label="Toggle favorite status"
          >
            {isCurrentlyFavorite ? (
              <span className="text-3xl">❤️</span>
            ) : (
              <span className="text-3xl">🤍</span>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-3xl font-bold mb-2">{recipe.strMeal}</h2>
        <p className="text-sm text-gray-600 mb-4">{recipe.strCategory} | {recipe.strArea}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 border-b-2 border-gray-200 pb-1">Ingredients</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {ingredientsList.map((item, index) => (
              <li key={index}>
                <span className="font-semibold">{item.measure}</span> - {item.ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3 border-b-2 border-gray-200 pb-1">Instructions</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{recipe.strInstructions}</p>
        </div>
      </div>
      
      {recipe.strYoutube && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Video Instructions</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title="YouTube video player"
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-auto rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;

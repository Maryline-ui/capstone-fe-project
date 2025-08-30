import React from 'react';
import useFavoritesStore from '../store/favoritesStore';
import RecipeCard from './RecipeCard';

const FavoritesList = ({ onRecipeSelect }) => {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <span className="text-4xl mb-4">🤍</span>
        <p className="text-xl font-medium">You don't have any favorite recipes yet.</p>
        <p>Click the heart icon on a recipe to add it here!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map(recipe => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onClick={() => onRecipeSelect(recipe)}
        />
      ))}
    </div>
  );
};

export default FavoritesList;

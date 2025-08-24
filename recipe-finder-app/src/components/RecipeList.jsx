import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center py-12 text-red-500">
    <p className="text-lg font-medium">{message}</p>
  </div>
);

const RecipeList = ({ category, searchQuery, onRecipeSelect }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // The API endpoint now changes based on category or search query
        let url;
        if (searchQuery) {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
        } else if (category) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        } else {
          url = 'https://www.themealdb.com/api/json/v1/1/random.php'; // Get a random recipe if nothing is selected
        }

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipes. Please try again later.');
        }

        const data = await response.json();
        
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category, searchQuery]); // This hook now runs when category or search query changes

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (recipes.length === 0) {
    return <ErrorMessage message="No recipes found. Try a different search or category." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onClick={() => onRecipeSelect(recipe)}
        />
      ))}
    </div>
  );
};

export default RecipeList;

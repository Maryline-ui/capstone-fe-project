import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import CategoryFilter from './components/CategoryFilter';
import FavoritesList from './components/FavoritesList';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

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

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [detailedRecipe, setDetailedRecipe] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!selectedRecipe) return;

    const fetchRecipeDetails = async () => {
      setLoadingDetails(true);
      setDetailsError(null);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedRecipe.idMeal}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details.');
        }
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setDetailedRecipe(data.meals[0]);
        }
      } catch (err) {
        setDetailsError(err.message);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchRecipeDetails();
  }, [selectedRecipe]);

  if (loadingDetails) {
    return <Loader />;
  }

  if (detailsError) {
    return <ErrorMessage message={detailsError} />;
  }
  
  if (detailedRecipe) {
    return <RecipeDetails recipe={detailedRecipe} onBack={() => {
        setSelectedRecipe(null);
        setDetailedRecipe(null);
    }} />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col p-4 sm:p-8">
      <header className="py-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Recipe Finder</h1>
        <SearchBar onSearch={setSearchQuery} />
      </header>
      
      <main className="flex-grow">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setShowFavorites(false);
              setSearchQuery('');
            }}
            className={`py-2 px-4 rounded-l-full font-semibold transition-colors duration-200 ${
              !showFavorites ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            All Recipes
          </button>
          <button
            onClick={() => {
              setShowFavorites(true);
              setSearchQuery('');
            }}
            className={`py-2 px-4 rounded-r-full font-semibold transition-colors duration-200 ${
              showFavorites ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            My Favorites
          </button>
        </div>

        {showFavorites ? (
          <FavoritesList onRecipeSelect={(recipe) => setSelectedRecipe(recipe)} />
        ) : (
          <>
            <CategoryFilter onSelectCategory={setSelectedCategory} />
            <RecipeList onRecipeSelect={(recipe) => setSelectedRecipe(recipe)} category={selectedCategory} searchQuery={searchQuery} />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

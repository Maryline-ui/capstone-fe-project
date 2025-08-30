import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setCategories(data.meals);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mb-4">
        <div className="animate-pulse flex space-x-4">
          <div className="bg-gray-300 h-8 w-16 rounded-md"></div>
          <div className="bg-gray-300 h-8 w-16 rounded-md"></div>
          <div className="bg-gray-300 h-8 w-16 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className="py-2 px-4 rounded-md font-medium text-sm bg-gray-200 hover:bg-gray-300 transition-colors"
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category.strCategory}
          onClick={() => onSelectCategory(category.strCategory)}
          className="py-2 px-4 rounded-md font-medium text-sm bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

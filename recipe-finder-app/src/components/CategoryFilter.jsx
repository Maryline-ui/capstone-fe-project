import React from 'react';

const categories = [
  'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian'
];

const CategoryFilter = ({ onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className="bg-gray-200 hover:bg-gray-300 transition-colors duration-200 text-gray-800 font-semibold py-2 px-4 rounded-full text-sm"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

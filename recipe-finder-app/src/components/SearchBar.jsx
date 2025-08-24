import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Search for a recipe..."
        onChange={handleInputChange}
        className="w-full max-w-xl py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;

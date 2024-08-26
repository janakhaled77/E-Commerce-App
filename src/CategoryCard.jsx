import React from 'react';

function CategoryCard({ category, onClick }) {
  return (
    <div
      className="relative p-4 border rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-green-500/50 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={category.image || 'https://via.placeholder.com/300x200'} // Fallback image
        alt={category.name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{category.name}</h3>
    </div>
  );
}

export default CategoryCard;

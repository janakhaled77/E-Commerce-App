import React from 'react';

function CategoryItem({ category, items }) {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-green-700 mb-4">{category.name}</h3>
      <p className="mb-4">{category.description}</p>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className="p-4 border rounded-lg shadow-lg">
              <img
                src={item.image} 
                alt={item.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No items available in this category</p>
      )}
    </div>
  );
}

export default CategoryItem;

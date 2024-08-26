import React from 'react';

function SubcategoryCard({ subcategory }) {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <div className="text-lg font-semibold">{subcategory.name}</div>
    </div>
  );
}

export default SubcategoryCard;

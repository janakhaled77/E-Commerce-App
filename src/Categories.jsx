import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import CategoryCard from './CategoryCard';
import SubcategoryCard from './SUBcategoryCard';

const BaseUrl = "https://ecommerce.routemisr.com";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get(`${BaseUrl}/api/v1/categories`),
    select: (response) => response?.data?.data,
  });

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    try {
      const response = await axios.get(`${BaseUrl}/api/v1/categories/${category._id}/subcategories`);
      setSubcategories(response.data.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h3>An error occurred: {error.message}</h3>;
  }

  if (!data || !Array.isArray(data)) {
    return <h3>No categories data available</h3>;
  }

  return (
    <div className="p-4 pt-24">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 object-cover w-full lg:grid-cols-3 gap-4 mb-6">
        {data.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-green-700 mb-4">{selectedCategory.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subcategories.length > 0 ? (
              subcategories.map((subcategory) => (
                <SubcategoryCard
                  key={subcategory._id}
                  subcategory={subcategory}
                  onClick={() => console.log('Subcategory clicked:', subcategory)}
                />
              ))
            ) : (
              <p>No subcategories found in this category</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;

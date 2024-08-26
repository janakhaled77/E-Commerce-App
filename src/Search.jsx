import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    const results = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(results);
  }, [searchTerm, categories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
    
      <input
        type="text"
        placeholder="Search categories..."
        className="border p-2 w-full rounded-lg mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.length === 0 ? (
          <p className="text-center text-gray-500">No results found</p>
        ) : (
          filteredCategories.map((c) => (
            <div key={c._id} className="relative">
              <img className="w-full h-48 object-cover rounded-lg" src={c.image} alt={c.name} />
              <h3 className="absolute bottom-0 left-0 bg-gray-800 text-white p-2 w-full text-center rounded-b-lg">{c.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
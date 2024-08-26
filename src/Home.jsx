import React, { useState } from 'react';
import MainSlider from './MainSlider';
import RecentProducts from './RecentProducts';
import CategorySlider from './CategorySlider';
function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-4 pt-24">
      <MainSlider />
      <CategorySlider/>
      
      <RecentProducts searchTerm={searchTerm} />
    </div>
  );
}

export default Home;

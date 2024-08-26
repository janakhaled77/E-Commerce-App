import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Products from './Products';
import Loading from './Loading';

function RecentProducts({ searchTerm = '' }) {
  // Fetch products from the API
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/products'),
    select: (response) => response?.data?.data, // Select the data from the response
  });

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (isError) {
    return <h3 className="text-red-500 text-center mt-4">An error occurred: {error.message}</h3>;
  }

 
  return (
    <div className="p-4">
      
                 <Products />
         
      
    </div>
  );
}

export default RecentProducts;

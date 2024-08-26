import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';

function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['brands'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/brands'),
    select: (response) => response?.data?.data,
  });

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h3>An error occurred: {error.message}</h3>;
  }

  if (!data || !Array.isArray(data)) {
    return <h3>No brands data available</h3>;
  }

  return (
    <div className="p-4 pt-24">
      <h2 className="text-2xl font-bold mb-4">Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((brand) => (
          <div
            key={brand._id}
            className="p-4 border rounded-lg shadow-lg cursor-pointer hover:shadow-green-500/50 transition-shadow"
            onClick={() => handleBrandClick(brand)}
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{brand.name}</h3>
          </div>
        ))}
      </div>

      {isModalOpen && selectedBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-4 transform transition-transform duration-300 ease-in-out">
            <div className="modal-header flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold">{selectedBrand.name}</h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="modal-body flex items-center">
              <div className="w-1/2 flex items-center justify-center">
                <img
                  src={selectedBrand.image}
                  alt={selectedBrand.name}
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="w-1/2 pl-4">
                <p className="text-green-600 text-4xl font-semibold">{selectedBrand.name}</p>
                <p>{selectedBrand.description}</p>
              </div>
            </div>
            <div className="modal-footer mt-4 text-right">
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Brands;
